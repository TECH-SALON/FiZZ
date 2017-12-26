package reversi

import (
  "log"
  "strconv"

  ai "app/game"
  "app/models"
  "app/utils"
)

/*
	status
	-1 : error
	0: game is not finished
	1: Win
	2: Lose
	3: draw
*/

func Game(round int, config *models.GameConfig, containers []ai.Container, firstMover int) *models.Fight{

  initBoard()
  fight := initFight(round, containers, firstMover)

  //fightにログを追加する
  //勝ち負け判定
  context := &Context{}
  for {
    movablePos := getMovablePos()

    if len(movablePos) == 0 {
      if isGameOver() {
        break
      }
      pass()
      continue
    }

    bot := containers[(turns + firstMover)%2]

    //contextの更新
    b := adaptBoard()
    context.Board = b
    context.History = append(context.History, b)
    context.Team = getTeam((turns + firstMover)%2, firstMover)
    context.MayPlayLocs = getMayPlayLocs(context.Team)

    var response = &GameResponse{}

    if err := bot.Play(utils.EncodeJson(context), response); err != nil {
      log.Printf("Game> ERROR %s\n", err)
      configureFight(fight, firstMover, "ERROR occurred with "+bot.BotCode)
      fight.Winner = containers[(turns + firstMover + 1)%2].BotCode
      return fight
    }

    action := response.Action

    actionLog := &models.ActionLog{
      BotCode: bot.BotCode,
      Team: context.Team,
      Params: map[string]string{
                        "turn": strconv.Itoa(turns),
                        "x": strconv.Itoa(action.X),
                        "y": strconv.Itoa(action.Y),
                      },
      ActionCode: action.Code,
    }
    fight.Logs = append(fight.Logs, *actionLog)

    var point Point
    point.x = action.X
    point.y = action.Y
    point.color = context.Team

    //gameが1始まりっぽいのでインクリメントしてる
    point.x++
    point.y++

    if !move(point) {
      break
    }
  }
  //fightの設定をおこなって返却
  configureFight(fight, firstMover, "The game was finished successfully.")
  return fight
}

func initFight(round int, containers []ai.Container, firstMover int) *models.Fight{
  //initialize fight and fightsummary
  fight := &models.Fight{
    Round: round,
  }
  for i:=0; i<len(containers); i++ {
    f := &models.FightSummary{
        BotCode: containers[i].BotCode,
        Team: getTeam(i, firstMover),
    }
    fight.Summaries = append(fight.Summaries, *f)
  }
  return fight
}

func configureFight(fight *models.Fight, firstMover int, msg string){
  var winner string
  var max float32 = 0.0
  for i:=0; i<len(fight.Summaries); i++{
    s := fight.Summaries[i]
    s.PointPercentage = float32(countColor(s.Team)/(BOARD_SIZE*BOARD_SIZE))
    if max < s.PointPercentage {
      winner = s.BotCode
      max = s.PointPercentage
    }
  }
  fight.Message = msg
  fight.Winner = winner
}

func getTeam(index, firstMover int) int{
  if index%2 == firstMover%2{
    return BLACK
  }else{
    return WHITE
  }
}

func adaptBoard() [8][8]int{
  var ret [8][8]int
  for x:=1;x<=BOARD_SIZE;x++{
    for y:=1;y<=BOARD_SIZE;y++{
      ret[x-1][y-1] = board[x][y]
    }
  }
  return ret
}

func getMayPlayLocs(team int) [][2]int{
  var ret [][2]int
  points := movablePos[turns]
  for i:=0; i < len(points); i++ {
    value := [2]int{points[i].x - 1, points[i].y - 1}
    ret = append(ret, value)
  }
  return ret
}
