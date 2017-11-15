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

//GET /api/v1/bots/:id
func GetBot(c echo.Context) error {
  t := big.NewInt(-1)
  id, ok := t.SetString(c.Param("id"), 10)
  if ok {
    return c.JSON(http.StatusOK, getBot(id))
  }else {
    //error
    return c.JSON(http.StatusOK, getBot(id))
  }
}

//POST /api/v1/bots/:gameName
// func RegisterBots(c echo.Context) error {
//   return c.JSON(http.StatusCreated, registerBot())
// }

//PUT /api/v1/bots/:id
// func StandBot(c echo.Context) error {
//   return c.JSON(http.StatusOK, standBot())
// }

func getBots() map[string]Bot{
  bots := map[string]Bot{
    "1": Bot {
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
    "2": Bot {
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

func registerBots(
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
