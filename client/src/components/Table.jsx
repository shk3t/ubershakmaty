import classes from "../styles/Table.module.css"
import React from "react"
import {useEffect, useState} from "react"
import GameService from "../services/GameService"

function Table() {
  const [ratingData, setRatingData] = useState([])

  useEffect(() => {
    GameService.getRating().then((data) => setRatingData(data))
  }, [])

  return (
    <div className={classes.NameClass}>
      <table className={classes.rateTable}>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Rating</th>
            <th>Name</th>
            <th>Date joined</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{val.rating}</td>
                <td>{val.username}</td>
                <td>{Date(val.date_joined).toLocaleString()}</td>
                <td>{val.country}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Table