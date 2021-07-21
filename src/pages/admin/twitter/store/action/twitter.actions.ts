import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {ITwitter} from "../../../../../shared/models/twitter.model";
import {ADD_TWEET} from "../state";
import {Socket} from "socket.io";


export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function connectTweets(dispatch: any, socket: Socket) {
    socket.on('connect', () => {
        console.log('connect');
    });
    socket.on('error', () => {
        console.log('error')
        socket.disconnect();
    });
    socket.on('disconnect', () => {
        console.log('disconnect');
        socket.disconnect();
    });
    socket.on("messageToClient", (data:ITwitter) => {
        dispatch({
            type: ADD_TWEET,
            payload: data
        });
    });
}

export function loadTwitters(dispatch: any) {
    const request = axios.get(Endpoints.twitters.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadTwitters",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadTwittersFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadTwittersFailed'
            });
        });
}

export function setRelationships(dispatch: any, relationships: Array<ITwitter>, action = '') {
    dispatch({
        type: "loadTwitters",
        payload: relationships
    });
    if (action === UPDATE) {
        setUpdateAlertOpen(dispatch, true);
    } else if (action === DELETE) {
        setDeleteAlertOpen(dispatch, true);
    }
}

export function setUpdateAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: 'setUpdateAlertOpen',
        payload: param
    });
}

export function setDeleteAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: 'setDeleteAlertOpen',
        payload: param
    });
}

