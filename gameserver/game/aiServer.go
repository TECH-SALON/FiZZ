package game

import (
	"log"
	"strconv"
	"time"

	"app/models"
)

var dockerManager = new(DockerManager)

func StartAIServer(bots []models.Bot) (containers []Container, errs []error) {
	log.Println("aiServer> Start.")

	err := dockerManager.Init()
	if err != nil{
		errs = append(errs, err)
		return
	}

	port := 8280
	for i:=0; i<len(bots); i++{
		bot := bots[i]
		c := &Container{}
		errs = append(errs, c.up(strconv.Itoa(port), &bot))
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

	e := dockerManager.Deinit()
	errs = append(errs, e...)
	log.Println("aiServer> Close.")
	return
}

func WaitReady(containers []Container) {
	time.Sleep(3*time.Second)
}
