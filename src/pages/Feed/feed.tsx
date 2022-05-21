import React from 'react';
import { Link, useLocation } from 'react-router-dom';


import { LocationType } from './../../services/types/'


import Styles from './feed.module.scss';



const Feed = React.memo( () => {

  const location = useLocation() as LocationType;
  const from = location.state?.from?.pathname || '/';


  return (
    <section className={Styles.feedContainer}>
      <span className={Styles.feedContainer__text}>
        Скоро здесь будет лента заказов, но пока есть только кнопка
      </span>
      <Link to={from} className={Styles.feedContainer__link}> 
        Назад
      </Link>
    </section>
  );
});

export default Feed;