import React from "react"
import classes from "../../styles/pages/StatisticsPage.module.css"

export default function StatisticsPage() {
    return (
        <div className={classes.menuStat}>
            <div className={classes.previousGamesInfo}>
                <h2 className={classes.statisticMsg}>Последние партии</h2>
                <table className={classes.previousGamesTable}>
                    <tr>
                        <th>Оппонент</th>
                        <th>Результат</th>
                        <th>Ходы</th>
                        <th>Дата</th>
                    </tr>
                    <tr>
                        <td>Steatch</td>
                        <td className={classes.winner}>Победа</td>
                        <td>7</td>
                        <td>05.08.2022</td>
                    </tr>
                    <tr>
                        <td>Likarurus</td>
                        <td className={classes.winner}>Победа</td>
                        <td>43</td>
                        <td>03.06.2022</td>
                    </tr>
                    <tr>
                        <td>Minerik</td>
                        <td className={classes.loser}>Поражение</td>
                        <td>35</td>
                        <td>21.03.2022</td>
                    </tr>
                    <tr>
                        <td>Magnus</td>
                        <td className={classes.winner}>Победа</td>
                        <td>50</td>
                        <td>30.09.2021</td>
                    </tr>
                    <tr>
                        <td>Hikaru</td>
                        <td className={classes.loser}>Поражение</td>
                        <td>4</td>
                        <td>23.08.2021</td>
                    </tr>
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
                        <td>937</td>
                    </tr>
                    <tr>
                        <td>Блиц</td>
                        <td>228</td>
                    </tr>
                    <tr>
                        <td>Рапид</td>
                        <td>420</td>
                    </tr>
                    <tr>
                        <td>Пуля</td>
                        <td>289</td>
                    </tr>
                </table>
                <div className={classes.panel}>
                    <h2 className={classes.statisticGameMsg}><p>В / П / Н </p></h2>
                    <h2 className={classes.statisticGameMsg}>
                        <span className={classes.winner}>200В </span>
                        <span className={classes.loser}>20П </span>
                         8Н
                    </h2>
                </div>
            </div>
        </div>
    )
}
