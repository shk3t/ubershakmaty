import classes from "../../styles/pages/TablePage.module.css"
import Navbar from "../Navbar"
import Table from "../Table"

export default function TablePage() {
  return (
    <div className={classes.Table}>
      {/* <Navbar/> */}
      <Table />
    </div>
  )
}
