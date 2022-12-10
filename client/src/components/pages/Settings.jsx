import React from 'react';
import classes from './../../styles/Settings.module.css';

const Set = () => {
    return (
        <main>
            <div className={classes.settings_container}>
                <h1 className={classes.settings_title}>
                    Настройки
                </h1>
                <div className={classes.renew}>
                    <div className={`${classes.container} ${classes.profile}`}>
                        <h2 className={classes.settings_profile}>
                            Обновить профиль
                        </h2>
                        <div className={classes.separate}>
                            <div className={classes.profile_photo}>
                            <img className={classes.person} src={require("./../../assets/SettingsImg/person_girl_set.png")} alt="girl"></img>
                            </div>
                            <div className={classes.profile_set}>
                                <h5 className={classes.nick}>Ник</h5> <input className={classes.prof} type="text" name="new_nick" /> <br />
                                <h5 className={classes.age}>Возраст</h5> <input className={classes.prof} type="text" name="new_age" /><br />
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.container} ${classes.password}`}>
                        <div className={classes.update}>
                            <h2 className={classes.settings_password}>
                                Пароль
                            </h2>
                            <h5 className={classes.redo}>Старый пароль</h5> <input className={classes.pass} type="password" name="old_pass" />
                            <br />
                            <h5 className={classes.redo}>Новый пароль</h5> <input className={classes.pass} type="password" name="new_pass" /><br />
                            <h5 className={classes.redo}>Еще раз</h5> <input className={classes.pass} type="password" name="again_pass" /><br />
                            <button className={classes.redoing_password}> Обновить </button>
                        </div>
                    </div>
                </div>
                <button className={classes.out_button}> Выйти </button>
            </div>
        </main>



    );
}

export default Set;