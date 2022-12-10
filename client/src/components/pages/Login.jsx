import React from 'react';
import classes from './../../styles/pages/Login.module.css'

const Logging = () => {
    return (
        <main>
            <div className={classes.register_form_container}>
                <h1 className={classes.form_title}>
                    Вход
                </h1>

                <div className={classes.form_fields}>
                    <div className={classes.form_field}>
                        <input type="text" placeholder="Логин"/>
                    </div>
                    <div className={classes.form_field}>
                        <input type="password" placeholder="Пароль"/>
                    </div>
                </div>
                <h2 className={classes.question}>
                    <a href="#" className={classes.bad_memory}>Забыли пароль?</a>
                </h2>

                <button className={classes.button}> Войти </button>
                <div className={classes.divider}>или</div>
                <div className={classes.another}>
                    <i class='bx bxl-google'></i> <a href="#" className={classes.register}>Войти с помощью  Google </a>
                </div>
                <div className={classes.another}>
                    <i class='bx bxl-apple'></i> <a href="#" className={classes.register}>Войти с помощью Apple  </a>
                </div>
                <div className={classes.another}>
                    <i class='bx bxl-facebook'></i> <a href="#" className={classes.register}>Войти с помощью Facebook  </a>
                </div>
                <h2 className={classes.question}>
                    <a href="#" className={classes.create_one}>Еще нет аккаунта?</a>
                </h2>
                <button className={classes.enter_button}>Зарегистрироваться</button>
            </div>
        </main>
    );
}

export default Logging;