package Reversi

import (
	"log"
	ai "app/game"
)

type GameResult struct {
	Win  int `json:"Black"`
	Lose int `json:"White"`
	Draw int `json:"Draw"`
}

func GameMaster(url string) (gameResult GameResult, err error)  {
	gameResult = initializeGameResult()
	containerName, err := ai.StartAIServer(url)
	err = printErr(err)
	var result int
	for countGame := 0; countGame < 5; countGame++ {
		log.Println(countGame)
		result = Game()
    gameResult = updateGameResult(result, gameResult)
	}
	err = ai.CloseAIServer(containerName)
	err = printErr(err)
	return gameResult, err
}


func initializeGameResult() GameResult {
	gameResult := GameResult{
		Win:  0,
		Lose: 0,
		Draw: 0,
	}
	return gameResult
}

func updateGameResult(result int, gameResult GameResult) GameResult {
  switch result {
  case 1:
    gameResult.Win++
  case 2:
    gameResult.Lose++
  case 3:
    gameResult.Draw++
  }
  return gameResult
}

func printErr(err error) (_ error) {
	if err != nil {
		log.Println(err)
	}
	err = nil
	return err
}
