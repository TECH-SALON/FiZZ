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

type Response struct {
	Bots: []models.Bot `json:"bots"`
}

func Play(c echo.Context) error{
	bots := c.Param("bots")
	return c.JSON(http.StatusOK, play(bots))
}

func play(bots []models.Bot) *Response{
	result, err := Reversi.GameMaster()
	response := &Response{
		Bots: bots
	}
	return response
}



type ImageName struct {
	ImageName string
}

func runGM(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	switch r.Method {
		case "GET":
			log.Println(r)
			fmt.Fprintf(w, "Please use POST method")
		case "POST":
			decoder := json.NewDecoder(r.Body)
			var input ImageName
			err := decoder.Decode(&input)
			if err != nil {
				log.Println(err)
			}
			defer r.Body.Close()
			log.Println(input.ImageName)
			var imageName = input.ImageName
			countWin, err := ReversiGame.GameMaster(imageName)
			log.Println(countWin)
			if err != nil {
				log.Println(err)
			}
			json.NewEncoder(w).Encode(countWin)
			// w.Write([]byte(countWin))
	}
}
