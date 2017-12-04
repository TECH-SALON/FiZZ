package Reversi

//ボードに関しての関数群


func initBoard() {
  //全マスを空きマスに設定
  for x:=1; x<=BOARD_SIZE; x++ {
    for y:=1; y<=BOARD_SIZE; y++ {
      board[x][y] = EMPTY
    }
  }
  //壁の設定
  for x:=0; x<BOARD_SIZE+2; x++ {
    board[x][0] = WALL
    board[x][BOARD_SIZE+1] = WALL
  }
  for y:=0; y<BOARD_SIZE+2; y++ {
    board[0][y] = WALL
    board[BOARD_SIZE+1][y] = WALL
  }
  //初期配置
  board[4][4] = WHITE
	board[5][5] = WHITE
	board[4][5] = BLACK
	board[5][4] = BLACK

  //石数の初期設定
  colorStorage[BLACK+1] = 2;
  colorStorage[WHITE+1] = 2; //WHITEは"-1"のため配列のindexとして使うために"+1"する
  colorStorage[EMPTY+1] = BOARD_SIZE*BOARD_SIZE-4

  //手数は0からで先手は黒
  turns = 0
  currentColor = BLACK
  //更新履歴を全て削除
  updateLog = updateLog[:0]
  movablePos = movablePos[:0]
  for turns := 0; turns < MAX_TURNS; turns++ {
    for x:=1; x<=BOARD_SIZE; x++ {
      for y:=1; y<=BOARD_SIZE; y++ {
        movableDir[turns][x][y] = 0
      }
    }
  }
}

func initMovable() {
  p := Point{0, 0, currentColor}
  var dir int
  var slice []Point
  for x:=1; x<=BOARD_SIZE; x++ { //xが0からではなく1から始まるのは、GUIでするときに盤面の位置を直感的に把握しやすくするため
    p.x = x
    for y:=1; y<=BOARD_SIZE; y++ {
      p.y = y
      dir = checkMobility(p)
      if dir != NONE {
        slice = append(slice, p)
      }
      movableDir[turns][x][y] = dir
    }
  }
  movablePos = append(movablePos, slice)
}

func checkMobility(point Point) int {
  if board[point.x][point.y] != EMPTY {
    return NONE
  }

  var x, y int
  var dir int = NONE

  //上方向にひっくり返すことができる
  if board[point.x][point.y-1] == -point.color {
    x = point.x
    y = point.y-2
    for board[x][y] == -point.color { y-- }
    if board[x][y] == point.color { dir |= UPPER }
  }

  //下方向にひっくり返すことができる
  if board[point.x][point.y+1] == -point.color {
    x = point.x
    y = point.y+2
    for board[x][y] == -point.color { y++ }
    if board[x][y] == point.color { dir |= LOWER }
  }

  //左方向にひっくり返すことができる
  if board[point.x-1][point.y] == -point.color {
    x = point.x-2
    y = point.y
    for board[x][y] == -point.color { x-- }
    if board[x][y] == point.color { dir |= LEFT }
  }

  //右方向にひっくり返すことができる
  if board[point.x+1][point.y] == -point.color {
    x = point.x+2
    y = point.y
    for board[x][y] == -point.color { x++ }
    if board[x][y] == point.color { dir |= RIGHT }
  }

  //右上方向にひっくり返すことができる
  if board[point.x+1][point.y-1] == -point.color {
    x = point.x+2
    y = point.y-2
    for board[x][y] == -point.color {
      x++
      y--
    }
    if board[x][y] == point.color { dir |= UPPER_RIGHT }
  }

  //左上方向にひっくり返すことができる
  if board[point.x-1][point.y-1] == -point.color {
    x = point.x-2
    y = point.y-2
    for board[x][y] == -point.color {
      x--
      y--
    }
    if board[x][y] == point.color { dir |= UPPER_LEFT }
  }

  //左下方向にひっくり返すことができる
  if board[point.x-1][point.y+1] == -point.color {
    x = point.x-2
    y = point.y+2
    for board[x][y] == -point.color {
      x--
      y++
    }
    if board[x][y] == point.color { dir |= LOWER_LEFT }
  }

  //右下方向にひっくり返すことができる
  if board[point.x+1][point.y+1] == -point.color {
    x = point.x+2
    y = point.y+2
    for board[x][y] == -point.color {
      x++
      y++
    }
    if board[x][y] == point.color { dir |= LOWER_RIGHT }
  }

  return dir
}
