import React from 'react';
import classes from './../../styles/pages/Register.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';
const Registering = () => {
    return (
    <body><main>
       <div className={classes.register_form_container}>
        <h1 className={classes.form_title}>
            Присоединяйся
        </h1>
        <h2 className={classes.form_title}>
            И начинай играть в шахматы!
        </h2>
        <div className={classes.form_fields}>
            <div className={classes.form_field}>
                <input type="text" placeholder="Имя"/>
            </div>
            <div className={classes.form_field}>
                <input type="text" placeholder="Электронная почта"/>
            </div>
            <div className={classes.form_field}>
                <input type="password" placeholder="Пароль"/>
            </div>
            <div className={classes.form_field}>
                <input type="password" placeholder="Подтвердить пароль"/>
            </div>
        </div>
        <h2 className={classes.question}>
            Для всех уровней!
        </h2>
        <div className={classes.icon}>
            <div className={classes.level}>
                {/* <FontAwesomeIcon icon={solid('user-secret')} /> */}
            </div>
            <div className={classes.level}>
                <i class="fa-regular fa-chess-knight"></i>
            </div>
            <div className={classes.level}>
                <i class="fa-regular fa-chess-queen"></i>
            </div>
            <div className={classes.level}>
                <i class="fa-regular fa-chess-king"></i>
            </div>
        </div> 
        <div className={`${classes.icon} ${classes.icon_words}`}>
            <div className={classes.words}>
                Новичок
            </div>
            <div className={classes.words}>
                Начальный
            </div>
            <div className={classes.words}>
                Средний
            </div>
            <div className={classes.words}>
                PRO
            </div>
        </div>
        <button className={classes.button}>Зарегистрироваться</button>
        <div className={classes.divider}>или</div>
        <div className={classes.another}>
            <i class='bx bxl-google'></i> <a href="#" className={classes.register}>Зарегистрироваться с помощью  Google </a>
        </div>
        <div className={classes.another}>
            <i class='bx bxl-apple'></i> <a href="#" className={classes.register}>Зарегистрироваться с помощью Apple  </a>
        </div>
        <div className={classes.another}>
            <i class='bx bxl-facebook'></i> <a href="#" className={classes.register}>Зарегистрироваться с помощью Facebook  </a>
        </div>
        <h2 className={classes.question}>
            <a href="#" className={classes.create_one}>Уже есть аккаунт?</a>
        </h2>
        <button className={classes.enter_button}>Войти</button>
       </div>
    </main>
    </body>
    );
}

export default Registering;