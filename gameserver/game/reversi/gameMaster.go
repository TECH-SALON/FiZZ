package Reversi

import (
	"log"
	"app/models"
	ai "app/game"
)

// game response
type Response struct {
	Bots []models.Bot `json:"bots"`
	GameName string `json:"gameName"`
	Rule string `json:"rule"`
	Filter string `json:"filter"`
	Fights []Fight `json:"fights"`
	StartContext Context `json:"startContext"`
	EndContext Context `json:"endContext"`
	Error string `json:"error"`
}

type Fight struct {
	Round int `json:round`
	Winner string `json:"winner"`
	Summaries []FightSummary `json:"summary"`
	Logs []ActionLog `json:"logs"`
	Messages string `json:"messages"`
	totalSpan int `json:"totalSpan"`
}

type FightSummary struct {
	BotCode string `json:"botCode"`
	Team string `json:"team"`
	PointPercentage float32 `json:"pointPercentage"`
}

type ActionLog struct {
	Team string `json:"team"`
	BotCode string `json:"botCode"`
	ActionCode string `json:"actionCode"`
	Params map[string]string `json:"params"`
	Span int `json:"span"`
}

// game configuration
type GameConfig struct {
	Name string `json:"name"`
	Rule string `json:"rule"`
	Filter string `json:"filter"`
	NumOfFights int `json:"numOfFights,string"`
}

type Context struct {
  Board [8][8]int `json:"board"`
	Team string `json:"team"`
  History [][8][8]int `json:"history"`
}


// errorはただ表示するだけでなく、勝敗に影響するものをhandlingすること
func GameMaster(config *GameConfig, bots []models.Bot) (response *Response, err error)  {
	var containers []ai.Container
	response = initialzeResponse(config, bots)
	containers, _ = ai.StartAIServer(bots)
	// err = printErr(err)

	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Println(countGame)

		fight := Game(countGame+1, config, containers, countGame%2)
		log.Println("%+v\n", fight)
		response.Fights = append(response.Fights, *fight)
	}

	_ = ai.CloseAIServer(containers)
	// err = printErr(err)
	return
}

func initialzeResponse(config *GameConfig, bots []models.Bot) (response *Response){
	response = &Response{
		Bots: bots,
		GameName: config.Name,
		Rule: config.Rule,
		Filter: config.Filter,
	}
	return
}

func printErr(err error) (_ error) {
	if err != nil {
		log.Println(err)
	}
	err = nil
	return err
}
