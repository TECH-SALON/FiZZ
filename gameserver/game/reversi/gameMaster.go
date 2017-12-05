package Reversi

import (
	"log"
	"app.models"
	ai "app/game"
)

// game response
type Response struct {
	Bots []models.Bot `json:"bots"`,
	GameName string `json:"gameName"`,
	Rule string `json:"rule"`,
	Filter string `json:"filter"`,
	Fights []Fight `json:"fights"`,
	StartContext Context `json:"startContext"`,
	EndContext Context `json:"endContext"`,
	Error string `json:"error"`
}

type Fight struct {
	Winner string `json:"winner"`,
	Summaries []FightSummary `json:"summary"`,
	ActionHistory []ActionLog `json:"actionHistory"`
}

type FightSummary struct {
	BotCode string `json:"botCode"`,
	PointPercentage float32 `json:"pointPercentage"`
}

type EventLog struct {
	Team string `json:"team"`
	BotCode string `json:"botCode"`
	ActionCode string `json:"actionCode"`
	Params map[string]string `json:"params"`
}

// game configuration
type GameConfig struct {
	Name string `json:"name"`,
	Rule string `json:"rule"`,
	Filter string `json:"filter"`,
	NumOfFights int `json:"numOfFights"`
}

var response *Response

func GameMaster(config GameConfig, bots []models.Bot) (Response, err error)  {
	initialzeResponse(config, bots)
	containers, err := ai.StartAIServer(bots)
	err = printErr(err)

	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Println(countGame)

		fight := Game(config, bots) //contextとか
		append(response.Fights, fight)
	}

	err = ai.CloseAIServer(containers)
	err = printErr(err)
}

func initialzeResponse(config GameConfig, bots []models.Bot){
	response = &Response{
		Bots: bots,
		GameName: config.Name,
		Rule: config.Rule,
		Filter: config.Filter
	}
}

func printErr(err error) (_ error) {
	if err != nil {
		log.Println(err)
	}
	err = nil
	return err
}
