import classes from "../styles/Table.module.css";
import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';

const API_URL = 'http://localhost:8000';


function Table() {
  const [data, setData] = useState([]);

	useEffect(() => {
		axios.get(`${API_URL}/game/get_rating`).then(response => {
		  setData(response.data.data);
    });
  }, []);
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
                {data.map((val, key) => {
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
    );
}
export default Table;
