package reversi

//情報を取得する関数群
//現在の番で石を打てるPoint型のスライスが入ったスライスを返す
func getMovablePos() []Point {
  return movablePos[turns]
}
//現在の手番を返す
func whoseTurn(turns int) bool{
  if turns%2 == 0 {
    return true
  }
  return false
}
//色の数を返す
func countColor(color int) int {
  return colorStorage[color+1]
}

func isGameOver() bool {
  var point Point
  if turns == MAX_TURNS {
    return true
  }
  if len(movablePos[turns]) != 0 {
    return false
  }
  point.color = -currentColor
  for x:=1; x<=BOARD_SIZE; x++ {
    point.x = x
    for y:=1; y<=BOARD_SIZE; y++ {
      point.y = y
      if checkMobility(point) != NONE {
        return false
      }
    }
  }
  return true
}
