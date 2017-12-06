package reversi

import (
	"net/http"
	"encoding/json"
	"app/game/reversi"
  "github.com/labstack/echo"
	"app/models"
)

func Play(c echo.Context) error{
	b := c.Param("bots")
	g := c.Param("config")
	var bots []models.Bot
	var game *Reversi.GameConfig
	json.Unmarshal([]byte(b), bots)
	json.Unmarshal([]byte(g), game)
	return c.JSON(http.StatusOK, play(game, bots))
}

func play(config *Reversi.GameConfig, bots []models.Bot) *Reversi.Response{
	response, _ := Reversi.GameMaster(config, bots)
	return response
}
