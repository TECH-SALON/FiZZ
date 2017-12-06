
package models

type Bot struct {
  Id bigint `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  Username string `json:"username"`
  GameName string `json:"gameName"`
  IsPrivate bool  `json:"isPrivate"`
  IsQualified bool `json:"isQualified"`
  IsStandBy bool `json:"isStandBy"`
  IsValid bool `json:"isValid"`
  ResourceUrl string `json:"resourceUrl"`
}
