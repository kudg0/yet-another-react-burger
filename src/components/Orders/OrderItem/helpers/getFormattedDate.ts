import { IOrderType } from './../../../../services/types/';


type TGetFormattedDateProps = (props: {
    createdAt: string;
}) => string;

const getFormattedDate: TGetFormattedDateProps = ({ createdAt }) => {

    const dateNow = new Date();

    const userGMTOffset__minutes = dateNow.getTimezoneOffset() * -1;
    const userGMTOffset__hours = userGMTOffset__minutes / 60;

    
    const tsWithTimezone = +(new Date(createdAt)) + userGMTOffset__minutes;
    const orderDate = new Date(tsWithTimezone);

    const diffTime = Math.abs(+dateNow - +orderDate);
    const diffDays = Math.trunc(diffTime / (1000 * 60 * 60 * 24)); 

    const dateObj = {
        diff: diffDays < 1 ?
            'Сегодня' : diffDays < 2 ?
                'Вчера' : `${diffDays} дня назад`,
        hours: ('0' + orderDate.getHours()).slice(-2),
        minutes: ('0' + orderDate.getMinutes()).slice(-2),
        userGMT: userGMTOffset__hours > 0 ? `+${userGMTOffset__hours}` : `${userGMTOffset__hours}`,
    };

    return `${dateObj.diff}, ${dateObj.hours}:${dateObj.minutes} i-GMT${dateObj.userGMT}`;
}

export default getFormattedDate;