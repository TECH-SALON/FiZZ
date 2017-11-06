package main

import (
	"os/exec"
	"github.com/pkg/errors"
	"log"
)

func startAIServer(imageName string) (containerName string, err error) {
	cmd := exec.Command("sh", "-c", "docker run -d -p 8184:8080 " + imageName)
	b, err := cmd.Output()
	containerName = string(b)
	if err != nil {
		log.Println("ai server is not runnning", err)
	} else {
		log.Println(containerName + " is running")
	}
	return containerName, err
}

func closeAIServer(containerName string) (err error) {
	log.Println(containerName, " is closing")
	cmd := exec.Command("bash", "-c", "docker rm -f " + containerName)
	err = cmd.Run()
	if err != nil {
		errors.Wrap(err, "closeAIServer(): cannot close server")
	}
	return err
}
