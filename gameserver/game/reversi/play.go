package reversi

import (
  "math/rand"
	"time"
  "encoding/json"
  "net/http"
  "net/url"
  "github.com/pkg/errors"
  "log"
  "io/ioutil"
)

func userPlay() [2]int {
  userMovable := getUserMovable()
  var gameState = GameState{
    BoardState: board,
    Movable: userMovable,
    TurnsNow: turns,
    YourColor: currentColor,
  }
  input, err := json.Marshal(gameState)
  checkErr(err, "usersPlay(): cannnot marshal json")
  resp, err := http.PostForm("http://localhost:8483", url.Values{"GameState": {string(input)}})
  checkErr(err, "usersPlay(): cannot post form")
  defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err, "usersPlay(): cannot read resp")
  var play struct { Point [2]int }
  err = json.Unmarshal([]byte(body), &play)
	checkErr(err, "usersPlay(): Unmarshaling is failed")
	return play.Point
}

func ramdomPlay(movablePos []Point) Point{
  rand.Seed(time.Now().UnixNano())
	return movablePos[rand.Intn(len(movablePos))]
}

func checkErr(err error, msg string) {
	if err != nil {
		err = errors.Wrap(err, msg)
		log.Fatal(err)
	}
}

func getUserMovable() [10][10]int {
  var userMovable [10][10]int
  points := movablePos[turns]
  for i:=0; i < len(points); i++ {
    userMovable[points[i].x][points[i].y] = 1
  }
  return userMovable
}
