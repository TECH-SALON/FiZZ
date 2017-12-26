package game

import (
	"log"
	"net/http"
	"net/url"
	"io/ioutil"
	"encoding/json"

	"app/models"
	"app/utils"
)

type Container struct {
	BotCode string
	id string
	name string
	port string
	store map[string]interface{}
	runtime string
	resUrl string
  startAt string
  endAt string
}

type GameResponse interface {
	GetStore() map[string]interface{}
}

func (c *Container)up(port string, bot *models.Bot) (err error){
	c.port = port
	c.BotCode = bot.Username+":"+bot.Name
	c.name = bot.Username+"."+bot.Name
	c.resUrl = bot.ResourceUrl
	c.runtime = bot.Runtime

	log.Println(c.BotCode + " is starting up")
	err = dockerManager.Invoke(c)
	return
}

func (c *Container)down() (err error){
	log.Println(c.BotCode + " is being closed")

	err = dockerManager.Destroy(c)

	if err != nil {
		log.Fatal(err)
	}
	return
}

func (c *Container)Play(context string, response GameResponse) (err error) {
	defer func ()  {
		log.Println("Play> Finished.")
		err := recover()
		if err != nil {
			log.Println("Play> ERROR occurred. Recover;", err)
		}
	}()

	log.Printf("Play> %s will play. context: %s\n", c.BotCode, context)
	v := url.Values{}
	v.Set("context", context)
	v.Add("store", utils.EncodeJson(c.store))

	resp, err := http.PostForm("http://docker.for.mac.localhost:"+c.port, v)
	log.Printf("Play> Response: %s\n", resp)
	if err != nil {
		log.Printf("Play> ERROR: %s\n", err) //負け
		return err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Play> ERROR: %s\n", err) //負け
		return err
	}

	if err := json.Unmarshal(body, response); err != nil {
		log.Printf("Play> ERROR: %s\n", err) //負け
		return err
	}

	c.store = response.GetStore()

	log.Printf("Play> %s played.\n", c.BotCode)
	return nil
}