package main

type Context struct {
  board [8][8]int `json:"board"`
  turn string `json:"turn"`
  history map[string]string `json:"history"`
}

func (context *Context) mayPlayLocs() [][2]int{
  return {{0, 0}}
}

type Action struct {
  code string `json:"code"`
  x int `json:"x"`
  y int `json:"y"`
}

func newAction() &Action{
  action = new(Action)
  action.code = "NONE"
  action.x = -1
  action.y = -1
}

func (action *Action) putDisk(disk [2]int) {
  action.code = "PUT_DISK"
  action.x = disk[0]
  action.y = disk[1]
}
