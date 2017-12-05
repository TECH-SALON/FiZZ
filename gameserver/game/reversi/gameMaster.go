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
	EventHistory []EventLog `json:"eventHistory"`
}

type FightSummary struct {
	BotCode string `json:"botCode"`,
	PointPercentage float32 `json:"pointPercentage"`
}

type EventLog struct {
	Team string `json:"team"`
	BotCode string `json:"botCode"`
	EventCode string `json:"event"`
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
	container, err := ai.StartAIServer(url)
	err = printErr(err)
	initialzeResponse(config, bots)

	var fight *Fight
	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Println(countGame)

		fight = Game() //contextとか
		response.Fights =
	}

	err = ai.CloseAIServer(container)
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
