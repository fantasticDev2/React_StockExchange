import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {INode} from "../../../../../shared/models/node.model";
import {SET_POPOVER_ANCHOR, SET_POPOVER_CONTENT, SET_POPOVER_OPEN} from "../state";

export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function deleteNode(dispatch: any, oldData: INode) {
    const request = axios.delete(Endpoints.nodes.DELETE, {data: {nodeIds: [oldData.id]}});
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "deleteNode",
            });
        } else {
            dispatch({
                type: 'deleteNodeFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'deleteNodeFailed'
            });
        });
}

export function loadNodes(dispatch: any) {
    const request = axios.get(Endpoints.nodes.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadNodes",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadNodesFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadNodesFailed'
            });
        });
}


export function setNodes(dispatch: any, nodes: Array<INode>, action = '') {
    dispatch({
        type: "loadNodes",
        payload: nodes
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
