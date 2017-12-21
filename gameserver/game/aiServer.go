package Game

import (
	"log"
	"os/exec"
	"net/http"
	"net/url"
	"io/ioutil"
	"encoding/json"

	"app/models"
	"app/utils"
)

var dockerManager := new(DockerManager)

func StartAIServer(bots []models.Bot) (containers []Container, errs []error) {
	log.Println("start AI server.")

	dockerManager.Init()

	port := 8280
	for i:=0; i<len(bots); i++{
		bot := bots[i]
		c := &Container{}
		errs = append(errs, c.up(string(port), &bot))
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
	
	dockerManager.Deinit()
	log.Println("close AI server.")
	return
}
