import React from 'react';

import styles from './statsContainer.module.scss';


const StatsContainer: React.FC = () => {
    return ( 
        <section className={ styles.StatsContainer }>
            Статистика
        </section>
    )
};

export default React.memo(StatsContainer);