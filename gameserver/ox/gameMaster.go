package main

import (
	"log"
	"github.com/TECH-SALON/OxPracticeServer/OxGame"
	"time"
)

func gameMaster(imageName string) (countWin OxGame.CountWin, err error)  {
	countWin = OxGame.InitializeCountWin()
	containerName, err := startAIServer(imageName)
	err = printErr(err)
	var status int
	time.Sleep(2 * time.Second)
	for countGame := 0; countGame < 100; countGame++ {
		log.Println(countGame)
		status, err = OxGame.Game()
		err = printErr(err)
		countWin, err = OxGame.CheckStatus(status, countWin)
		err = printErr(err)
	}
	err = closeAIServer(containerName)
	err = printErr(err)
	return countWin, err
}


func printErr(err error) (_ error) {
	if err != nil {
		log.Println(err)
	}
	err = nil
	return err
}
