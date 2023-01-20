import React from "react"
import classes from "../../styles/pages/SettingsPage.module.css"

export default function SettingsPage() {
  return (
    <main>
      <div className={classes.settingsContainer}>
        <h1 className={classes.settingsTitle}>Настройки</h1>
        <div className={classes.renew}>
          <div className={`${classes.container} ${classes.profile}`}>
            <h2 className={classes.settingsProfile}>Обновить профиль</h2>
            <div className={classes.separate}>
              <div className={classes.profilePhoto}>
                <img
                  className={classes.person}
                  src={require("./../../assets/SettingsImg/personGirlSet.png")}
                  alt="girl"
                ></img>
                <button className={classes.redoingPhoto}> Обновить </button>
              </div>
              <div className={classes.profileSet}>
                <h5 className={classes.nick}>Ник</h5>{" "}
                <input className={classes.prof} type="text" name="newNick" />{" "}
                <br />
                <h5 className={classes.age}>Возраст</h5>{" "}
                <input className={classes.prof} type="text" name="newAge" />
                <br />
              </div>
            </div>
          </div>
          <div className={`${classes.container} ${classes.password}`}>
            <div className={classes.update}>
              <h2 className={classes.settingsPassword}>Пароль</h2>
              <h5 className={classes.redo}>Старый пароль</h5>{" "}
              <input className={classes.pass} type="password" name="oldPass" />
              <br />
              <h5 className={classes.redo}>Новый пароль</h5>{" "}
              <input className={classes.pass} type="password" name="newPass" />
              <br />
              <h5 className={classes.redo}>Еще раз</h5>{" "}
              <input
                className={classes.pass}
                type="password"
                name="againPass"
              />
              <br />
              <button className={classes.redoingPassword}> Обновить </button>
            </div>
          </div>
        </div>
        <button className={classes.outButton}> Выйти </button>
      </div>
    </main>
  )
}