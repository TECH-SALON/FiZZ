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


var badrequest = map[string]string{"messages":"Bad Request."}

//TODO require authentication

//GET /api/v1/bots
func GetBots(c echo.Context) error {
  return c.JSON(http.StatusOK, getBots())
}

//GET /api/v1/bots/:id
func GetBot(c echo.Context) error {
  t := big.NewInt(-1)
  id, ok := t.SetString(c.Param("id"), 10)
  if ok {
    return c.JSON(http.StatusOK, getBot(id))
  }else {
    //error
    return c.JSON(http.StatusBadRequest, badrequest)
  }
}

//POST /api/v1/bots/:gameName
func RegisterBot(c echo.Context) error {
  var gameName string = "reversi"
  var botName string = "rev"
  var description string = "This is reversi bot"
  var repoUrl string = "https://github.com/yyy/zzz"

  return c.JSON(http.StatusCreated,
     registerBot(gameName, botName, description, repoUrl))
}

//PUT /api/v1/bots/:id
func StandBot(c echo.Context) error {
  t := big.NewInt(-1)
  id, ok := t.SetString(c.Param("id"), 10)
  if ok {
    return c.JSON(http.StatusOK, standBot(id))
  }else {
    //error
    return c.JSON(http.StatusBadRequest, badrequest)
  }
}

func getBots() []Bot{
  bots := []Bot{
     Bot {
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
    },
    Bot {
      Id: big.NewInt(101),
      Name: "reversi_bot2",
      Description: "リバーシのbot2",
      AuthorId: big.NewInt(1),
      GameId: big.NewInt(1),
      IsPrivate: false,
      Qualified: false,
      StandBy: false,
      RepoUrl: "https://github.com/xxx/zzz",
      ResultSummaries: nil,
    },
  }
  return bots
}

func getBot(id bigint) *Bot{
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

func registerBot(
    gameName string,
    botName string,
    description string,
    repoUrl string,
  ) *Bot{
  b := &Bot{
    Id: big.NewInt(100),
    Name: botName,
    Description: description,
    AuthorId: big.NewInt(1),
    GameId: big.NewInt(1),
    IsPrivate: false,
    Qualified: false,
    StandBy: false,
    RepoUrl: repoUrl,
    ResultSummaries: nil,
  }
  return b
}

func standBot(id bigint) *Bot{
  b := &Bot{
    Id: big.NewInt(101),
    Name: "reversi_bot",
    Description: "リバーシのbot",
    AuthorId: big.NewInt(1),
    GameId: big.NewInt(1),
    IsPrivate: false,
    Qualified: true,
    StandBy: true,
    RepoUrl: "https://github.com/xxx/yyy",
    ResultSummaries: nil,
  }
  return b
}
