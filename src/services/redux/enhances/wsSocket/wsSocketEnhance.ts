import type { Dispatch } from 'redux';

import type { IReduxStore } from '../../../types';

import { 
    ordersRequestSuccess,
    ordersRequestError,
    ordersRequestMessage,
    ordersRequestClosed,
    feedRequestSuccess,
    feedRequestError,
    feedRequestMessage,
    feedRequestClosed,
} from './../../slicers/appSlice';

import { getLocalStorageWithExpiry } from './../../../utils/helpers/workWithLocalStorage';


const APP_ACTIONS = {
    "WS_CONNECTION_SUCCESS": feedRequestSuccess,
    "WS_CONNECTION_ERROR": feedRequestError,
    "WS_GET_MESSAGE": feedRequestMessage,
    "WS_CONNECTION_CLOSED": feedRequestClosed,
};
const USER_ACTIONS = {
    "WS_CONNECTION_SUCCESS": ordersRequestSuccess,
    "WS_CONNECTION_ERROR": ordersRequestError,
    "WS_GET_MESSAGE": ordersRequestMessage,
    "WS_CONNECTION_CLOSED": ordersRequestClosed,
};

const WS_ROUTES = {
    all: "wss://norma.nomoreparties.space/orders/all",
    user: "wss://norma.nomoreparties.space/orders",
}

const WS_SOCKETS = {
    all: null,
    user: null,
} as {
    all: WebSocket | null,
    user: WebSocket | null,
}

type TWsSocketEnhanceProps = (props: {
    isUserWs: boolean,
    type: 'WS_CONNECTION_START' | 'WS_CONNECTION_CLOSE' | 'WS_SEND_MESSAGE',
    payload?: {},
}) => (dispatch: Dispatch) => void;

export const wsSocketEnhance: TWsSocketEnhanceProps = ({ isUserWs, type, payload }) => {
    return ((dispatch) => {
        let socket = WS_SOCKETS[ isUserWs ? "user" : "all" ];

        if (type === 'WS_CONNECTION_CLOSE') {
            if (!socket) return;

            socket.close();
        }

        const accessToken = getLocalStorageWithExpiry('accessToken');

        const wsUrl = isUserWs ? WS_ROUTES.user + `?token=${accessToken}` : WS_ROUTES.all;


        if (type === 'WS_CONNECTION_START') {
            if (socket) return;
            // объект класса WebSocket
            socket = new WebSocket(wsUrl);
            WS_SOCKETS[isUserWs ? "user" : "all"] = socket;

            // функция, которая вызывается при открытии сокета
            socket.onopen = event => {

                dispatch(
                    isUserWs ?
                        USER_ACTIONS['WS_CONNECTION_SUCCESS'](event?.returnValue) :
                        APP_ACTIONS['WS_CONNECTION_SUCCESS'](event?.returnValue)
                );
            };

            // функция, которая вызывается при ошибке соединения
            socket.onerror = event => {
                console.error(event);

                dispatch(
                    isUserWs ?
                        USER_ACTIONS['WS_CONNECTION_ERROR'](event) :
                        APP_ACTIONS['WS_CONNECTION_ERROR'](event)
                );
            };

            // функция, которая вызывается при получения события от сервера
            socket.onmessage = event => {
                const { data } = event;
                const json = JSON.parse(data);

                if (!json || !json?.success) return;

                const result = {
                    ...json,
                };

                dispatch(
                    isUserWs ?
                        USER_ACTIONS['WS_GET_MESSAGE']({ ...result }) :
                        APP_ACTIONS['WS_GET_MESSAGE']({ ...result })
                );
            };
            // функция, которая вызывается при закрытии соединения
            socket.onclose = event => {

                dispatch(
                    isUserWs ?
                        USER_ACTIONS['WS_CONNECTION_CLOSED'](event) :
                        APP_ACTIONS['WS_CONNECTION_CLOSED'](event)
                );
            };
        }
        
        if (type === 'WS_SEND_MESSAGE') {
            if (!socket) return;


            const message = JSON.stringify(payload);
            // функция для отправки сообщения на сервер
            return socket.send( message );
        }
    });
};