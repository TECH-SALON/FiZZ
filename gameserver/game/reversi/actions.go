package Reversi

func move(point Point) bool {
  if point.x < 1 || point.x > BOARD_SIZE { return false }
  if point.y < 1 || point.y > BOARD_SIZE { return false }
  if movableDir[turns][point.x][point.y] == NONE {
    return false
   }

  flipDiscs(point)
  turns++
  currentColor = -currentColor
  initMovable()
  return true
}

func pass() bool{
  currentColor = -currentColor
  // var point []Point
  updateLog = append(updateLog, nil)
  initMovable()
  return true
}

func flipDiscs(point Point) {
  var x, y, dir, diff int
  // 操作対象の石
  operation := Point{point.x, point.y, currentColor}
  dir = movableDir[turns][point.x][point.y]
  var updateSlice []Point
  // まずは石を現在のプレイヤーの色で置く
  board[point.x][point.y] = currentColor
  //movablePosにappendするようのsliceを作る
  updateSlice = append(updateSlice, operation)

  //上にひっくり返せる場合
  if dir & UPPER != NONE {
    y = point.y-1
    operation.x = point.x
    for board[point.x][y] != currentColor {
      board[point.x][y] = currentColor
      operation.y = y
      //次のループのためにyを変更
      y--
      updateSlice = append(updateSlice, operation)
    }
  }
  //下にひっくり返せる場合
  if dir & LOWER != NONE {
    y = point.y+1
    operation.x = point.x
    for board[point.x][y] != currentColor {
      board[point.x][y] = currentColor
      operation.y = y
      y++
      updateSlice = append(updateSlice, operation)
    }
  }
  //左にひっくり返せる場合
  if dir & LEFT != NONE{
    x = point.x-1
    operation.y = point.y
    for board[x][point.y] != currentColor {
      board[x][point.y] = currentColor
      operation.x = x
      x--
      updateSlice = append(updateSlice, operation)
    }
  }
  //右にひっくり返せる場合
  if dir & RIGHT != NONE{
    x = point.x+1
    operation.y = point.y
    for board[x][point.y] != currentColor {
      board[x][point.y] = currentColor
      operation.x = x
      x++
      updateSlice = append(updateSlice, operation)
    }
  }
  //右上にひっくり返せる場合
  if dir & UPPER_RIGHT != NONE{
    x = point.x+1
    y = point.y-1
    for board[x][y] != currentColor {
      board[x][y] = currentColor
      operation.x = x
      operation.y = y
      x++
      y--
      updateSlice = append(updateSlice, operation)
    }
  }
  //左上にひっくり返せる場合
  if dir & UPPER_LEFT  != NONE{
    x = point.x-1
    y = point.y-1
    for board[x][y] != currentColor {
      board[x][y] = currentColor
      operation.x = x
      operation.y = y
      x--
      y--
      updateSlice = append(updateSlice, operation)
    }
  }
  //左下にひっくり返せる場合
  if dir & LOWER_LEFT != NONE{
    x = point.x-1
    y = point.y+1
    for board[x][y] != currentColor {
      board[x][y] = currentColor
      operation.x = x
      operation.y = y
      x--
      y++
    }
  }
  //右下にひっくり返せる場合
  if dir & LOWER_RIGHT != NONE{
    x = point.x+1
    y = point.y+1
    for board[x][y] != currentColor {
      board[x][y] = currentColor
      operation.x = x
      operation.y = y
      x++
      y++
    }
  }
  diff = len(updateSlice)
  colorStorage[currentColor+1] += diff
  colorStorage[-currentColor+1] -= diff-1
  colorStorage[EMPTY+1]--
  updateLog = append(updateLog, updateSlice)
}
