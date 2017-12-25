package models

type Response struct {
	Success bool `json:"success,string"`
	Bots []Bot `json:"bots"`
	Config *GameConfig `json:"config"`
	Fights []Fight `json:"fights"`
	Error *Err `json:"error"`
}

type Fight struct {
	Round int `json:round`
	Winner string `json:"winner"`
	Summaries []FightSummary `json:"summary"`
	Logs []ActionLog `json:"logs"`
	Message string `json:"message"`
	TotalSpan int `json:"totalSpan"`
}

type FightSummary struct {
	BotCode string `json:"botCode"`
	Team string `json:"team"`
	PointPercentage float32 `json:"pointPercentage"`
}

type ActionLog struct {
	Team string `json:"team"`
	BotCode string `json:"botCode"`
	ActionCode string `json:"actionCode"`
	Params map[string]string `json:"params"`
	Span int `json:"span"`
}

type Err struct {
	At string `json:"at"`
	Message string `json:message`
}
