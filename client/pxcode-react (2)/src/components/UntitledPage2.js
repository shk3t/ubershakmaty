import React from 'react';
import cn from 'classnames';

import styles from './UntitledPage2.module.scss';

export default function UntitledPage2(props) {
  return (
    <div className={cn(styles.root, 'untitled-page2')}>
      <div className={styles.box}>
        /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
        <div className={styles.rect} />
        <div className={styles.wrapper}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <h1 className={styles.title}>Ранг</h1>
          <h1 className={styles.title1}>Рейтинг</h1>
          <h1 className={styles.title2}>Игрок</h1>
          <h1 className={styles.title3}>Месяц - Год</h1>
          <h1 className={styles.title4}>Страна</h1>
        </div>
        <div className={styles.wrapper1}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <h1 className={styles.title5}>1</h1>
          <h1 className={styles.title6}>2900</h1>
          <h1 className={styles.title7}>Семен Орехов</h1>
          <h1 className={styles.title8}>10 - 2000</h1>
          <h1 className={styles.title4}>Грузия</h1>
        </div>
        <div className={styles.wrapper11}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <h1 className={styles.title5}>5</h1>
          <h1 className={styles.title6}>1364</h1>
          <h1 className={styles.title9}>Климакова таисия</h1>
          <h1 className={styles.title8}>04 - 2002</h1>
          <h1 className={styles.title4}>Россия</h1>
        </div>
        <div className={styles.wrapper2}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <h1 className={styles.title5}>2</h1>
          <h1 className={styles.title6}>2854</h1>
          <h1 className={styles.title10}>Даниил Дудов</h1>
          <h1 className={styles.title11}>01 - 2001</h1>
          <h1 className={styles.title4}>Россия</h1>
        </div>
        <div className={styles.wrapper3}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <h1 className={styles.title5}>3</h1>
          <h1 className={styles.title6}>2399</h1>
          <h1 className={styles.title7}>Полина Шпинева</h1>
          <h1 className={styles.title8}>07 - 2002</h1>
          <h1 className={styles.title4}>Германия</h1>
        </div>
        <div className={styles.wrapper21}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <h1 className={styles.title5}>4</h1>
          <h1 className={styles.title6}>1789</h1>
          <h1 className={styles.title12}>Мария Маркелова</h1>
          <h1 className={styles.title13}>11 - 2002</h1>
          <h1 className={styles.title4}>Испания</h1>
        </div>
        <div className={styles.wrapper4}>
          /*This group structure is not ready for flow layout, please resolve the ❗alone items in pxCode editor.*/
          <img className={styles.icon} src={require('assets/029579fe9ba5624a45cd7b6cda878725.png')} alt="alt text" />
          <h3 className={styles.subtitle}>Ирина А</h3>
          <h1 className={styles.big_title}>Таблица лидеров</h1>
          <h5 className={styles.highlights}>online</h5>
          <img className={styles.icon1} src={require('assets/8e72ac0af79387d268d910c0f2754691.png')} alt="alt text" />
          <img className={styles.image} src={require('assets/d6605c114b2822ea8ebb772ec0bb9538.png')} alt="alt text" />
          <img className={styles.image1} src={require('assets/e00936f301798653f64c77a680387e47.png')} alt="alt text" />
          <img className={styles.image2} src={require('assets/2ae703dd796209ee9a8ff80875ab1f76.png')} alt="alt text" />
          <img className={styles.icon2} src={require('assets/37f52adabe74b5489bb958349ff9bb9e.png')} alt="alt text" />
          <img className={styles.image21} src={require('assets/d7b67a5f9f0b372ad4e8bef6a7155767.png')} alt="alt text" />
          <img className={styles.icon21} src={require('assets/116d194495d0670d218d78b7a3902854.png')} alt="alt text" />
          <img className={styles.image3} src={require('assets/bfdcc406b362003e12b1fb0ac9d69f94.png')} alt="alt text" />
          <img className={styles.image4} src={require('assets/62dbfe95c9bf032b13e6ecea7da1e7cc.png')} alt="alt text" />
          <img className={styles.icon3} src={require('assets/571f2f965ec259e55e76a5f51d0f5b83.png')} alt="alt text" />
          <img className={styles.image5} src={require('assets/61bba6138d7bc2de8011092870b29dae.png')} alt="alt text" />
          <img className={styles.image6} src={require('assets/b1c28c2d19113ceba6ede8d9d0dd1198.png')} alt="alt text" />
        </div>
      </div>
    </div>
  );
}

UntitledPage2.inStorybook = true;
