import classes from "../styles/Table.module.css"
import React from "react";
const data = [
    { rang: 1, rating: 19, name: "Semen Orex", year: "10-2000", country:"Russia" },
    { rang: 2, rating: 29, name: "Danya Dudov", year: "01-2001", country:"Russia" },
    { rang: 3, rating: 1, name: "Polina Shpineva", year: "07-2002", country:"Germany" },
    { rang: 4, rating: 3, name: "Maria Murkl", year: "11-2002", country:"Spain" },
    { rang: 5, rating: 4, name: "Taya Klimakova", year: "04-2002", country:"Turkey" },
]
function Table() {
    return (
        <div className={classes.NameClass}>
            <table>
                <tr>
                    <th>Rang</th>
                    <th>Rating</th>
                    <th>Gender</th>
                    <th>Month-Year</th>
                    <th>Country</th>

                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.rang}</td>
                            <td>{val.rating}</td>
                            <td>{val.name}</td>
                            <td>{val.year}</td>
                            <td>{val.country}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}
export default Table;