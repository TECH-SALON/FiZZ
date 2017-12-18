package Reversi

import (
	"log"
	"app/models"
	"app/utils"
	ai "app/game"
)

type Context struct {
  Board [8][8]int `json:"board"`
	Team string `json:"team"`
  History [][8][8]int `json:"history"`
}

// errorはただ表示するだけでなく、勝敗に影響するものをhandlingすること
func GameMaster(config *models.GameConfig, bots []models.Bot) (response *models.Response, err error)  {
	var containers []ai.Container
	response = initialzeResponse(config, bots)
	containers, errs = ai.StartAIServer(bots)
	utils.printErrs(errs)

	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Println(countGame)

		fight := Game(countGame+1, config, containers, countGame%2)
		log.Println("%+v\n", fight)
		response.Fights = append(response.Fights, *fight)
	}
	utils.printErrs(ai.CloseAIServer(containers))
	return
}

func initialzeResponse(config *models.GameConfig, bots []models.Bot) (response *models.Response){
	response = &models.Response{
		Bots: bots,
		GameName: config.Name,
		Rule: config.Rule,
		Filter: config.Filter,
	}
	return
}
