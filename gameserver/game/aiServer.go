package game

import (
	"os/exec"
	"github.com/pkg/errors"
	"log"
)

func StartAIServer(imageName string) (containerName string, err error) {
	cmd := exec.Command("sh", "-c", "docker run -d -p 8282:8080 " + imageName)
	b, err := cmd.Output()
	containerName = string(b)
	log.Println(containerName)
	if err != nil {
		errors.Wrap(err, "startAIServer(): cannot start server")
	} else {
		log.Println(containerName + " is running")
	}
	return containerName, err
}

func CloseAIServer(containerName string) (err error) {
	log.Println(containerName, " will be close")
	cmd := exec.Command("bash", "-c", "docker rm -f " + containerName)
	err = cmd.Run()
	if err != nil {
		errors.Wrap(err, "closeAIServer(): cannot close server")
	}
	return err
}
