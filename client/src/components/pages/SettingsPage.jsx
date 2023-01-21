import React, {useRef, useState} from "react"
import classes from "../../styles/pages/SettingsPage.module.css"
import useErrorMessage from "../../hooks/useErrorMessage"
import GenericInput from "../inputs/GenericInput"
import useCompletedRequest from "../../hooks/useCompletedRequest"
import {useDispatch} from "react-redux"
import {makeRequest, setError} from "../../reducers/requestReducer"
import {logout, updateAuthUser} from "../../reducers/authReducer"
import {filterObject} from "../../utils"
import Swal from "sweetalert2"

export default function SettingsPage() {
  const dispatch = useDispatch()
  const fileInputRef = useRef()
  const emptyUserData = {
    nickname: "",
    age: "",
    picture: null,
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  }
  const [userData, setUserData] = useState(emptyUserData)

  useErrorMessage()
  useCompletedRequest("UpdateUserData", () => {
    setUserData(emptyUserData)
    Swal.fire({
      icon: "success",
      title: "User data updated successfully",
    })
  })

  function updateUserData() {
    if (userData.newPassword !== userData.newPasswordAgain) {
      dispatch(setError("New passwords do not match"))
      return
    }

    const requestData = filterObject(
      {
        nickname: userData.nickname,
        age: userData.age,
        picture: userData.picture,
        password: userData.newPassword,
        old_password: userData.oldPassword,
      },
      ([key, value]) => value
    )
    if (Object.keys(requestData).length === 0) {
      alert("All fields are empty!")
      return
    }

    console.log(requestData)

    dispatch(makeRequest(() => updateAuthUser(requestData), "UpdateUserData"))
  }

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
                <button
                  className={classes.redoingPhoto}
                  onClick={() => fileInputRef.current.click()}
                >
                  Выбрать фото
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      picture: event.target.files[0],
                    })
                  }}
                  style={{display: "none"}}
                  ref={fileInputRef}
                />
              </div>
              <div className={classes.profileSet}>
                {[
                  {label: "Ник", field: "nickname", h5Class: classes.nick},
                  {label: "Возраст", field: "age", h5Class: classes.age},
                ].map(({label, field, h5Class}) => (
                  <React.Fragment key={field}>
                    <h5 className={h5Class}>{label}</h5>
                    <GenericInput
                      {...{
                        className: classes.prof,
                        field,
                        data: userData,
                        setData: setUserData,
                        hasPlaceholder: false,
                      }}
                    />
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className={`${classes.container} ${classes.password}`}>
            <div className={classes.update}>
              <h2 className={classes.settingsPassword}>Пароль</h2>
              {[
                {
                  label: "Старый пароль",
                  field: "oldPassword",
                  type: "password",
                },
                {label: "Новый пароль", field: "newPassword", type: "password"},
                {label: "Еще раз", field: "newPasswordAgain", type: "password"},
              ].map(({label, field, type}) => (
                <React.Fragment key={field}>
                  <h5 className={classes.redo}>{label}</h5>
                  <GenericInput
                    {...{
                      className: classes.pass,
                      field,
                      type,
                      data: userData,
                      setData: setUserData,
                      hasPlaceholder: false,
                    }}
                  />
                  <br />
                </React.Fragment>
              ))}
              <button
                className={classes.redoingPassword}
                onClick={updateUserData}
              >
                Обновить
              </button>
            </div>
          </div>
        </div>
        <button
          className={classes.outButton}
          onClick={() => dispatch(logout())}
        >
          Выйти
        </button>
      </div>
    </main>
  )
}