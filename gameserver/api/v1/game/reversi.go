package reversi

import (
	"net/http"
	"fmt"
	"log"
	"encoding/json"
	"app/game/reversi"
  "github.com/labstack/echo"
	"app/models"
)

func Play(c echo.Context) error{
	b := c.Param("bots")
	g := c.Param("config")
	var bots []models.Bot
	var game Reversi.GameConfig
	json.Unmarshal(b, &bots)
	json.Unmarshal(g, &game)
	return c.JSON(http.StatusOK, play(game, bots))
}

func play(config Reversi.GameConfig, bots []models.Bot) *Response{
	response, err := Reversi.GameMaster(config, bots)
	return response
}
