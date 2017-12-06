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
	Logs []ActionLog `json:"logs"`,
	Messages string `json:"messages"`
}

type FightSummary struct {
	BotCode string `json:"botCode"`,
	Team string `json:"team"`,
	PointPercentage float32 `json:"pointPercentage"`
}

type ActionLog struct {
	Team string `json:"team"`,
	BotCode string `json:"botCode"`,
	ActionCode string `json:"actionCode"`,
	Params map[string]string `json:"params"`
}

// game configuration
type GameConfig struct {
	Name string `json:"name"`,
	Rule string `json:"rule"`,
	Filter string `json:"filter"`,
	NumOfFights int `json:"numOfFights"`
}

type Context struct {
  board [8][8]int `json:"board"`,
	team int `json:"team"`,
  history []map[string]string `json:"history"`
}


// errorはただ表示するだけでなく、勝敗に影響するものをhandlingすること
func GameMaster(config GameConfig, bots []models.Bot) (response &Response, err error)  {
	response := initialzeResponse(config, bots)
	containers, err := ai.StartAIServer(bots)
	err = printErr(err)

	for countGame := 0; countGame < config.NumOfFights; countGame++ { //num of fightsがnilだったら0にする
		log.Println(countGame)

		fight := Game(config, containers)
		append(response.Fights, fight)
	}

	err = ai.CloseAIServer(containers)
	err = printErr(err)
	return response, err
}

func initialzeResponse(config GameConfig, bots []models.Bot) (response *Response){
	response := &Response{
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
