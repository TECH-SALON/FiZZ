package Game

import (
	"os/exec"
	"net/http"
	"net/url"
	"io/ioutil"
	"encoding/json"
	"app/models"
	"log"
)

func StartAIServer(bots []models.Bot) (containers []Container, errs []error) {
	port := 8280
	for i:=0; i<len(bots); i++{
		bot := bots[i]
		runtime := bot.Runtime
		c := &Container{}
		errs = append(errs, c.up(runtime, string(port), bot.Username+":"+bot.Name))
		containers = append(containers, *c)
		port++
	}
	return
}

func CloseAIServer(containers []Container) (errs []error) {
	for i:=0; i < len(containers); i++ {
		c := containers[i]
		errs = append(errs, c.down())
	}
	return
}

type Container struct {
	name string
	port string
	BotCode string
	store map[string]string
	runtime string
}

func (c *Container)up(runtime, port, botCode string) (err error){
	c.port = port
	c.BotCode = botCode
	//dockerfileを参照しに行かないといけない
	cmd := exec.Command("bash", "-c", "docker run -d -p "+c.port+":8080") //fileをrepoからとってきて埋め込む
	b, err := cmd.Output()
	c.name = string(b)
	log.Println(c.name)
	return
}

func (c *Container)down() (err error){
	log.Println(c.BotCode, " will be closed")
	cmd := exec.Command("bash", "-c", "docker rm -f " + c.name)
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
	return
}

func (c *Container)Play(context string) (response map[string]interface{}, err error) {
	v := url.Values{}
	v.Set("context", context)
	v.Add("store", encodeJson(c.store))
	resp, err := http.PostForm("http://localhost:"+c.port, v)
	if err != nil {
		log.Fatal(err) //負け
	}
	defer resp.Body.Close()
	var body []byte
	body, err = ioutil.ReadAll(resp.Body)
	response = decodeJson(body)
	c.store = response["store"].(map[string]string)
	return
}

func encodeJson(a interface{}) string {
	ret, err := json.Marshal(a)
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return string(ret)
}

func decodeJson(j []byte)map[string]interface{}{
	var response map[string]interface{}
	json.Unmarshal(j, &response)
	return response
}
