package Reversi

/*
	status
	-1 : error
	0: game is not finished
	1: Win
	2: Lose
	3: draw
*/

func Game() int{
  initBoard()
  initMovable()
  var point Point
  var userPoint [2]int
  for {
    isUserTurn := whoseTurn(turns)
    movablePos := getMovablePos()
    if len(movablePos) == 0 {
      if isGameOver() {
        break
      }
      pass()
      continue
    }
    if isUserTurn {
      userPoint = userPlay()
      point.x = userPoint[0]
      point.y = userPoint[1]
      point.color = currentColor
    } else {
      point = ramdomPlay(movablePos)
    }
    if !move(point) {
      break
    }
  }
  result := checkResult()
  return result
}

func checkResult() int {
  blackCount := countColor(BLACK)
  whiteCount := countColor(WHITE)
  if blackCount > whiteCount {
    return 1
  } else if blackCount < whiteCount {
    return 2
  } else {
    return 3
  }
}
