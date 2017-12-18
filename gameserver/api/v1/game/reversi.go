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
	var game *models.GameConfig
	json.Unmarshal([]byte(b), bots)
	json.Unmarshal([]byte(g), game)
	return c.JSON(http.StatusOK, play(game, bots))
}

func play(config *models.GameConfig, bots []models.Bot) *models.Response{
	response, _ := models.GameMaster(config, bots)
	return response
}
