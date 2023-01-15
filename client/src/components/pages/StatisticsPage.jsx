import React, {useEffect, useState} from "react"
import classes from "../../styles/pages/StatisticsPage.module.css"
import GameService from "../../services/GameService";
import {useSelector} from "react-redux";

export default function StatisticsPage() {
  const [gamesData, setGamesData] = useState(['No data about previous games'])
  const authUser = useSelector((state) => state.authReducer.authUser)
  const accessToken = useSelector((state) => state.authReducer.accessToken)
  const credentials = {'user': authUser, 'token': accessToken}
  useEffect(() => {
    GameService.getGamesData(credentials).then((data) => {
      setGamesData(data)
    });
  }, [])
  return (
    <div className={classes.menuStat}>
      <div className={classes.previousGamesInfo}>
        <h2 className={classes.statisticMsg}>Последние партии</h2>
        <table className={classes.previousGamesTable}>
          <thead>
          <tr>
            <th>Оппонент</th>
            <th>Результат</th>
            <th>Ходы</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
            {gamesData['last_games']===undefined ?
              null :
              gamesData['last_games'].map((val, key) => {
              const is_winner = val.white_player__id__nickname===authUser.nickname & val.result===1 |
                val.black_player__id__nickname===authUser.nickname & val.result===-1
              const lmt = new Date(Date.parse(val.last_move_time))
            return (
              <tr key={key}>
                <td>{val.white_player__id__nickname===authUser.nickname ? val.black_player__id__nickname : val.white_player__id__nickname}</td>
                <td className={is_winner ? classes.winner : (val.result === 0 ? classes.draw : classes.loser)}>
                  {is_winner ? "Случайная победа" : (val.result === 0 ? "Никчёмная ничья" : "Сокрушительное поражение")}
                </td>
                <td>{val.moves_made}</td>
                <td>{lmt.getDate() + "-" + (lmt.getMonth() + 1) + "-" + lmt.getFullYear()}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      <div className={classes.statisticPanel}>
        <h2 className={classes.statisticMsg}>Статистика</h2>
        <table className={classes.gamesStatistic}>
          <tr>
            <th>Тип игры</th>
            <th>Количество</th>
          </tr>
          <tr>
            <td>Партий</td>
            <td>{gamesData['games_count']}</td>
          </tr>
          <tr>
            <td>Пуля</td>
            <td>{gamesData['bullet_count']}</td>
          </tr>
          <tr>
            <td>Блиц</td>
            <td>{gamesData['blitz_count']}</td>
          </tr>
          <tr>
            <td>Рапид</td>
            <td>{gamesData['rapid_count']}</td>
          </tr>
        </table>
        <div className={classes.panel}>
          <h2 className={classes.statisticGameMsg}>
            <p>В / П / Н </p>
          </h2>
          <h2 className={classes.statisticGameMsg}>
            <span className={classes.winner}>{gamesData['won_games']}В </span>
            <span className={classes.draw}>{gamesData['drawn_games']}Н </span>
            <span className={classes.loser}>{gamesData['lost_games']}П </span>
          </h2>
        </div>
      </div>
    </div>
  )
}
