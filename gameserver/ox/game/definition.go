package OxGame

type Board [9]int

/*
	Board
	0: not marked
	1: marked by user
	-1: marked by opponent
*/
func initializeBoard() Board {
	var b Board
	for i := range b {
		b[i] = 0
	}
	return b
}

type Lines [8][3]int

func InitializeLines() Lines {
	l := Lines{
		[3]int{0, 1, 2},
		[3]int{3, 4, 5},
		[3]int{6, 7, 8},
		[3]int{0, 3, 6},
		[3]int{1, 4, 7},
		[3]int{2, 5, 8},
		[3]int{0, 4, 8},
		[3]int{2, 4, 6},
	}
	return l
}

type CountWin struct {
	Win  int `json:"win"`
	Draw int `json:"draw"`
	Lose int `json:"lose"`
}

func InitializeCountWin() CountWin {
	countWin := CountWin{
		Win:  0,
		Draw: 0,
		Lose: 0,
	}
	return countWin
}
