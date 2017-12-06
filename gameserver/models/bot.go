
package models

type Bot struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  Username string `json:"username"`
  GameName string `json:"gameName"`
  IsPrivate bool  `json:"isPrivate,string"`
  IsQualified bool `json:"isQualified,string"`
  IsStandBy bool `json:"isStandBy,string"`
  IsValid bool `json:"isValid,string"`
  Runtime string `json:"runtime"`
  ResourceUrl string `json:"resourceUrl"`
}
