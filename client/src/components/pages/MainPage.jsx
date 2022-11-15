import React from "react"
import ExampleButton from "../buttons/ExampleButton"
import classes from "../../styles/pages/MainPage.module.css"

export default function MainPage() {
  return (
    <main>
      <div className={classes.example}>This is MainPage</div>
      <ExampleButton />
    </main>
  )
}
