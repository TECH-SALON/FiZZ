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
    append(fight.Summaries, FightSummary{BotCode: containers[i].botCode})
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
    context.team = getTeam()
    append(context.history, b)

    resp, err := bot.play(context)

    if err != nil {
      break
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
  result := checkResult()
  return result
}

func checkResult() int {
  blackCount := countColor(BLACK)
  whiteCount := countColor(WHITE)
  if blackCount > whiteCount {
    return 1
  } else if blackCount < whiteCount {
    return 2
  } else {
    return 3
  }
}

func getTeam(firstMover) string{
  if (turns+firstMover)%2 == 0{
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
