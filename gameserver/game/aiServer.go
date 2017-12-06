package Game

import (
	"os/exec"
	"net/http"
	"net/url"
	"encoding/json"
	"log"
)

func StartAIServer(bots string, runtime string) (containers []Container, errs []error) {
	var containers []Container
	var port = 8280
	var errs []error
	for i:=0; i<len(bots); i++{
		bot := bots[i]
		c := &Container{}
		append(errs, c.up(port, bot.Username+":"+bot.Name))
		append(containers, c)
		port++
	}
}

func CloseAIServer(containers []Container) (errs []error) {
	var errs []error
	for i:=0; i < len(containers); i++ {
		c := containers[i]
		append(err, c.down())
	}
}

type Container struct {
	name string
	port string
	botCode string
	store map[string]string
}

func (c *Container)up(port, botCode string) (err error){
	c.port = port
	c.botCode = botCode
	//dockerfileを参照しに行かないといけない
	cmd := exec.Command("bash", "-c", "docker run -d -p "+c.port+":8080") //fileをrepoからとってきて埋め込む
	b, err := cmd.Output()
	c.name = string(b)
	log.Println(c.name)
}

func (c *Container)down() (err error){
	log.Println(c.botCode, " will be closed")
	cmd := exec.Command("bash", "-c", "docker rm -f " + c.name)
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
}

func (c *Container)play(context string) (response map[string]interface{}, err error) {
	v := url.Values{}
	v.Set("context": context)
	v.Add("store": encodeJson(c.store))
	resp, err := http.PostForm("http://localhost:"+c.port, v)
	if err != nil {
		log.Fatal(err) //負け
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	response := decodeJson(body)
	c.store = response["store"].(map[string]interface{})
}

func encodeJson(a map[string]interface{}) string {
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
