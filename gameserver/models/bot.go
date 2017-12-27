
package models

type Bot struct {
  Name string `json:"name"`
  Username string `json:"username"`
  Runtime string `json:"runtime"`
  ResourceUrl string `json:"resourceUrl"`
  GameName string `json:"gameName"`
  IsPrivate bool  `json:"isPrivate"`
  IsQualified bool `json:"isQualified"`
  IsStandBy bool `json:"isStandBy"`
  IsValid bool `json:"isValid"`
  Rank string `json:"rank"`
}
