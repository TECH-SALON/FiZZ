package models

type Response struct {
	Bots []models.Bot `json:"bots"`
	GameName string `json:"gameName"`
	Config GameConfig `json:"config"`
	Fights []Fight `json:"fights"`
	StartContext Context `json:"startContext"`
	EndContext Context `json:"endContext"`
	Error string `json:"error"`
}

type Fight struct {
	Round int `json:round`
	Winner string `json:"winner"`
	Summaries []FightSummary `json:"summary"`
	Logs []ActionLog `json:"logs"`
	Messages string `json:"messages"`
	totalSpan int `json:"totalSpan"`
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

type Context interface {}
