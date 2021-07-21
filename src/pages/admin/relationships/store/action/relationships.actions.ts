import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {IRelationship} from "../../../../../shared/models/relationship.model";
import {SET_POPOVER_ANCHOR, SET_POPOVER_CONTENT, SET_POPOVER_OPEN} from "../state";


export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function deleteRelationship(dispatch: any, oldData: IRelationship) {
    const request = axios.delete(Endpoints.relationships.DELETE, {data: {relationshipsIds: [oldData.id]}});
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "deleteRelationship",
            });
        } else {
            dispatch({
                type: 'deleteRelationshipFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'deleteRelationshipFailed'
            });
        });
}

export function loadRelationships(dispatch: any) {
    const request = axios.get(Endpoints.relationships.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadRelationships",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadRelationshipsFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadRelationshipsFailed'
            });
        });
}

export function setRelationships(dispatch: any, relationships: Array<IRelationship>, action = '') {
    dispatch({
        type: "loadRelationships",
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

export function setPopOverOpen(dispatch: any, open: boolean) {
    dispatch({
        type: SET_POPOVER_OPEN,
        payload: open
    });
}

export function setPopoverContent(dispatch: any, content: object) {
    dispatch({
        type: SET_POPOVER_CONTENT,
        payload: content
    });
}

export function setPopoverAnchor(dispatch: any, anchor: HTMLButtonElement | null) {
    dispatch({
        type: SET_POPOVER_ANCHOR,
        payload: anchor
    });
}
