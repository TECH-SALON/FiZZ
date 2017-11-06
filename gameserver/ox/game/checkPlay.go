package OxGame

func checkPlay(b Board, play int, isUsersTurn bool) (bool, Board) {
	if b[play] != 0 {
		return false, b
	}
	if isUsersTurn {
		b[play] = 1
	} else {
		b[play] = -1
	}
	return true, b
}
