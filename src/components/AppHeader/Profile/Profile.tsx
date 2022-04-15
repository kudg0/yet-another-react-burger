import React from 'react';

import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import Styles from './profile.module.scss';



class Profile extends React.Component {
  render() {
    return (
      <div className={Styles.profileContainer}>
        <div className={Styles.profileContainer__icon}>
          <ProfileIcon type="primary"/>
        </div>
        <span className={Styles.profileContainer__text}>
          Личный кабинет
        </span>
      </div>
    )
  }
}

export default Profile;