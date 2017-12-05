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

func play(game Reversi.Game, bots []models.Bot) *Response{
	result, err := Reversi.GameMaster(game, bots)
	return result
}
