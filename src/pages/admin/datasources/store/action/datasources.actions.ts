import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {SET_DELETEALERT, SET_UPDATEALERT, SET_DATASOURCES, SET_DATASOURCES_FAILED} from "../state";

export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function setDataSources(dispatch: any) {
    const request = axios.get(Endpoints.datasource.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: SET_DATASOURCES,
                payload: response.data
            });
        } else {
            dispatch({
                type: SET_DATASOURCES_FAILED
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: SET_DATASOURCES_FAILED
            });
        });
}


export function setUpdateAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: SET_UPDATEALERT,
        payload: param
    });
}

export function setDeleteAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: SET_DELETEALERT,
        payload: param
    });
}
