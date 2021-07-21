import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {SET_DELETEALERT, SET_UPDATEALERT, SET_WORKSPACES, SET_WORKSPACES_FAILED} from "../state";

export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function setWorkspaces(dispatch: any) {
    const request = axios.get(Endpoints.workspaces.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: SET_WORKSPACES,
                payload: response.data
            });
        } else {
            dispatch({
                type: SET_WORKSPACES_FAILED
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: SET_WORKSPACES_FAILED
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
