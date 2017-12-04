
package models

type Bot struct {
  Id bigint `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  AccountId bigint `json:"accountId"`
  GameId bigint `json:"gameId"`
  IsPrivate bool  `json:"isPrivate"`
  IsQualified bool `json:"isQualified"`
  IsStandBy bool `json:"isStandBy"`
  RepoUrl string `json:"repoUrl"`
}
