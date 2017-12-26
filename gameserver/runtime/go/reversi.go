package main

type Context struct {
  Board [][]int `json:"board"`
  Team int `json:"team"`
  History [][][]int `json:"history"`
  MayPlayLocs [][2]int `json:"mayPlayLocs"`
}

type Action struct {
  Code string `json:"code"`
  X int `json:"x"`
  Y int `json:"y"`
}

func newAction() *Action{
  action := new(Action)
  action.Code = "NONE"
  action.X = -1
  action.Y = -1
  return action
}

func (action *Action) PutDisk(disk [2]int) {
  action.Code = "PUT_DISK"
  action.X = disk[0]
  action.Y = disk[1]
}
