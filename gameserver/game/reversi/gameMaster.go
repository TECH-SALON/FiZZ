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
  MayPlayLocs [][2]int `json:"mayPlayLocs"`
}

// errorはただ表示するだけでなく、勝敗に影響するものをhandlingすること
func GameMaster(config *models.GameConfig, bots []models.Bot) (response *models.Response, err error)  {

	log.Println("Duel! Reversi")
	response = initialzeResponse(config, bots)
	containers, errs := ai.StartAIServer(bots)
	utils.PrintErrs(errs)

	log.Println(config)
	log.Println(bots)

	if config == nil || len(bots) == 0 {
		return
	}

	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Println(countGame)

		fight := Game(countGame+1, config, containers, countGame%2)
		log.Println("%+v\n", fight)
		response.Fights = append(response.Fights, *fight)
	}
	utils.PrintErrs(ai.CloseAIServer(containers))
	return
}

func initialzeResponse(config *models.GameConfig, bots []models.Bot) (*models.Response){
	return &models.Response{
		Bots: bots,
		Config: config,
	}
}
