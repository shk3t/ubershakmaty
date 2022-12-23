import React from "react"
import classes from "../../styles/pages/LoginPage.module.css"

export default function LoginPage() {
  return (
    <main>
      <div className={classes.registerFormContainer}>
        <h1 className={classes.formTitle}>Вход</h1>

        <div className={classes.formFields}>
          <div className={classes.formField}>
            <input type="text" placeholder="Логин" />
          </div>
          <div className={classes.formField}>
            <input type="password" placeholder="Пароль" />
          </div>
        </div>
        <h2 className={classes.question}>
          <a href="#" className={classes.badMemory}>
            Забыли пароль?
          </a>
        </h2>

        <button className={classes.button}> Войти </button>
        <div className={classes.divider}>или</div>
        <div className={classes.another}>
          <i class="bx bxl-google"></i>{" "}
          <a href="#" className={classes.register}>
            Войти с помощью Google{" "}
          </a>
        </div>
        <div className={classes.another}>
          <i class="bx bxl-apple"></i>{" "}
          <a href="#" className={classes.register}>
            Войти с помощью Apple{" "}
          </a>
        </div>
        <div className={classes.another}>
          <i class="bx bxl-facebook"></i>{" "}
          <a href="#" className={classes.register}>
            Войти с помощью Facebook{" "}
          </a>
        </div>
        <h2 className={classes.question}>
          <a href="#" className={classes.createOne}>
            Еще нет аккаунта?
          </a>
        </h2>
        <button className={classes.enterButton}>Зарегистрироваться</button>
      </div>
    </main>
  )
}