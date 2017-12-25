package reversi

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
	log.Println(config)

	response = initialzeResponse(config, bots)
	containers, errs := ai.StartAIServer(bots)
	defer ai.CloseAIServer(containers)

	if utils.CheckErrs(errs) {
		log.Println("GameMaster> Exit with start ai server errors.")
		response.Error.At = "START_AI_SERVER"
		return
	}

	if config == nil || len(bots) == 0 {
		log.Fatal("Invalid parameters")
		response.Error.At = "REQUEST"
		response.Error.Message = "INVALID_PARAMS"
		return
	}

	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Printf("GameMaster> Fight! Count %d\n", countGame+1)

		fight := Game(countGame+1, config, containers, countGame%2)
		log.Printf("%+v\n", fight)
		log.Printf("GameMaster> Fight %d done. The winner is %s\n", countGame+1, fight.Winner)
		log.Printf("GameMaster> Fight %d total span %d\n", countGame+1, fight.TotalSpan)
		log.Printf("GameMaster> Fight %d message %s\n", countGame+1, fight.Message)
		response.Fights = append(response.Fights, *fight)
	}

	response.Success = true
	return
}

func initialzeResponse(config *models.GameConfig, bots []models.Bot) (*models.Response){
	return &models.Response{
		Success: false,
		Bots: bots,
		Config: config,
		Error: &models.Err{},
	}
}
