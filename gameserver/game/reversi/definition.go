package reversi

const EMPTY int = 0
const WHITE int = -1
const BLACK int = 1
const WALL int = 2

const BOARD_SIZE int = 8
const MAX_TURNS = 60
const NONE = 0
const UPPER = 1
const UPPER_LEFT = 2
const LEFT = 4
const LOWER_LEFT = 8
const LOWER = 16
const LOWER_RIGHT = 32
const RIGHT = 64
const UPPER_RIGHT = 128

var turns int
var currentColor int
var movableDir [MAX_TURNS+1][BOARD_SIZE+2][BOARD_SIZE+2]int
var movablePos [][]Point
var updateLog [][]Point
var colorStorage [3]int

type Point struct {
  x int
  y int
  color int
}

var board [BOARD_SIZE+2][BOARD_SIZE+2]int

type GameState struct {
  BoardState [10][10]int
  Movable [10][10]int
  TurnsNow int
  YourColor int
}
