package OxGame

import "github.com/pkg/errors"

/*
	status
	-1 : error
	0: game is not finished
	1: user won
	2: draw
	3: user lost
*/
func checkWin(b Board, lines Lines, turn int) int {
	for _, line := range lines {
		linePoint := b[line[0]] + b[line[1]] + b[line[2]]
		if linePoint == 3 {
			return 1
		} else if linePoint == -3 {
			return 3
		}
	}
	if turn == 8 {
		return 2
	}
	return 0
}

/*
	status
	-1 : error
	0: game is not finished
	1: user won
	2: draw
	3: user lost
*/
func CheckStatus(status int, countWin CountWin) (_ CountWin, err error) {
	switch status {
	case 0:
		err = errors.New("checkStatus(): status is 0(Game is not Finished)")
		return countWin, err
	case 1:
		countWin.Win++
	case 2:
		countWin.Draw++
	case 3:
		countWin.Lose++
	default:
		err = errors.New("checkStatus(): status is illegal")
	}
	return countWin, nil
}
