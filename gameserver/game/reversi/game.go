package Reversi

import (
  ai "app/game"
)

/*
	status
	-1 : error
	0: game is not finished
	1: Win
	2: Lose
	3: draw
*/

func Game(config *GameConfig, containers []ai.Container, firstMover int) *Fight{
  initBoard(firstMover)

  fight := &new(Fight)
  for i:=0; i<len(containers); i++ {
    append(fight.Summaries, FightSummary{
      BotCode: containers[i].botCode,
      Team: getTeam(i, firstMover)
    })
  }

  //fightにログを追加する
  //勝ち負け判定
  context := &new(Context)
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
    context.board = b
    context.team = getTeam((turns + firstMover)%2, firstMover)
    append(context.history, b)

    resp, err := bot.play(context)

    if err != nil {
      log.Fatal(err)
      configureFight(fight, firstMover, "ERROR occurred with "+bot.BotCode)
      return fight
    }

    actionLog := &ActionLog{
      BotCode: bot.botCode,
      Team: resp["context"]["team"],
      Params: map[string]string {
                        "turn": turns
                        "x":resp["action"]["x"],
                        "y":resp["action"]["y"]
                      },
      ActionCode: resp["action"]["code"]
    }
    append(fight.Logs, actionLog)

    var point Point
    point.x = resp["action"]["x"]
    point.y = resp["action"]["y"]
    point.color = resp["context"]["team"]

    if !move(point) {
      break
    }
  }
  //fightの設定をおこなって返却
  configureFight(fight, firstMover, "The game was finished successfully.")
  return fight
}

func configureFight(fight *Fight, firstMover int, msg string){
  var winner string
  var max float32 = 0.0
  for i:=0; i<len(fight.Summaries); i++{
    s := fight.Summaries[i]
    s.PointPercentage = countColor(int(s.Team))/(BOARD_SIZE*BOARD_SIZE)
    if max < s.PointPercentage {
      winner = s.BotCode
      max = s.PointPercentage
    }
  }
  fight.Messages = msg
  fight.Winner = winner
}

func getTeam(index, firstMover) string {
  if index%2 == firstMover%2{
    return string(BLACK)
  }else{
    return string(WHITE)
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
