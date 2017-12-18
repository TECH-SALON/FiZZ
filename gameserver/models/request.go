package models

// game configuration
type GameConfig struct {
	Name string `json:"name"`
	Rule string `json:"rule"`
	Filter string `json:"filter"`
	NumOfFights int `json:"numOfFights,string"`
}
