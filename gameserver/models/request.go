package models

// game configuration
type GameConfig struct {
	GameName string `json:"name"`
	Rule string `json:"rule"`
	Filter string `json:"filter"`
	NumOfFights int `json:"numOfFights"`
}
