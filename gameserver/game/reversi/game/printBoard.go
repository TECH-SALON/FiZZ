package ReversiGame

import (
  "fmt"
)
func printBoard() {
  fmt.Println(" a b c d e f g h")
  for y:=1; y<=8; y++ {
    fmt.Print(y)
    for x:=1; x<=8; x++ {
      switch getColor(x,y) {
        case BLACK:
          fmt.Print("B ")
        case WHITE:
          fmt.Print("W ")
        default:
          fmt.Print("　")
      }
    }
    fmt.Print("\n")
  }
}

func getColor(x, y int) int {
  return board[x][y]
}
