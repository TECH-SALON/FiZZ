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
	bots := c.Param("bots")
	game := c.Param("game")
	return c.JSON(http.StatusOK, play(game, bots))
}

func play(config Reversi.GameConfig, bots []models.Bot) &Response{
	response, err := Reversi.GameMaster(config, bots)
	return response
}
