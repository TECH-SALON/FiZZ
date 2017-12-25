package game

import (
	"log"
	"net/http"
	"net/url"
	"io/ioutil"

	"app/models"
	"app/utils"
)

type Container struct {
	BotCode string
	id string
	name string
	port string
	store map[string]string
	runtime string
	resUrl string
  startAt string
  endAt string
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

func (c *Container)Play(context string) (response map[string]interface{}, err error) {
	log.Printf("Play> %s will play.\n", c.BotCode)
	v := url.Values{}
	v.Set("context", context)
	v.Add("store", utils.EncodeJson(c.store))
	resp, err := http.PostForm("http://localhost:"+c.port, v)
	if err != nil {
		log.Fatal(err) //負け
	}
	defer resp.Body.Close()
	var body []byte
	body, err = ioutil.ReadAll(resp.Body)
	response = utils.DecodeJson(body)
	c.store = response["store"].(map[string]string)
	log.Printf("Play> %s played.\n", c.BotCode)
	return
}
