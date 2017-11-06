package OxGame

import (
	"github.com/pkg/errors"
	"log"
	"math/rand"
	"time"
)

/*
	status
	-1 : error
	0: game is not finished
	1: user won
	2: draw
	3: user lost
*/
func Game() (_ int, err error) {
	lines := InitializeLines()
	b := initializeBoard()
	var status = -2
	for turn := 0; turn < 9; turn++ {
		isUsersTurn := whoseTurn(turn)
		var play int
		if isUsersTurn {
			play = usersPlay(b)
			if err != nil {
				log.Fatal(err)
			}
		} else {
			play = randomPlay(b)
		}
		playIsLegal, updatedBoard := checkPlay(b, play, isUsersTurn)
		for i := 0; i < 9; i++ {
			b[i] = updatedBoard[i]
		}
		if !playIsLegal {
			err = errors.New("game(): play is illegal")
			return 3, nil
		}
		status = checkWin(b, lines, turn)
		if status != 0 {
			return status, nil
		}
	}
	err = errors.New("game(): game is not finished")
	return -1, err
}

// if you want to make second player mode rewrite this.
func whoseTurn(turn int) bool {
	if turn%2 == 0 {
		return true
	}
	return false
}

func randomPlay(b Board) int {
	rand.Seed(time.Now().UnixNano())
	remainBoxes := make([]int, 0, 9)
	for i, v := range b {
		if v == 0 {
			remainBoxes = append(remainBoxes, i)
		}
	}
	return remainBoxes[rand.Intn(len(remainBoxes))]
}
