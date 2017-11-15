package bots

import (
  "net/http"
  "github.com/labstack/echo"
  "math/big"
)

type bigint *big.Int
type Bot struct {
  Id bigint `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  AuthorId bigint `json:"authorId"`
  GameId bigint `json:"gameId"`
  IsPrivate bool  `json:"isPrivate"`
  Qualified bool `json:"qualified"`
  StandBy bool `json:"standBy"`
  RepoUrl string `json:"repoUrl"`
  ResultSummaries []string `json:"resultSummaries"`
}

//TODO require authentication

//GET /api/v1/bots
func GetBots(c echo.Context) error {
  return c.JSON(http.StatusOK, getBots())
}

func getBots() *Bot {
  b := &Bot{
    Id: big.NewInt(100),
    Name: "reversi_bot",
    Description: "リバーシのbot",
    AuthorId: big.NewInt(1),
    GameId: big.NewInt(1),
    IsPrivate: false,
    Qualified: false,
    StandBy: false,
    RepoUrl: "https://github.com/xxx/yyy",
    ResultSummaries: nil,
  }
  return b
}

//GET /api/v1/bots/:id
func GetBot(id bigint){

}

//POST /api/v1/bots/:gameName
func RegisterBots(
    gameName string,
    botName string,
    description string,
    repoUrl string,
  ){

}

//PUT /api/v1/bots/:id
func StandBot(id bigint){

}
