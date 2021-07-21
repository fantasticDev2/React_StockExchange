import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {IDefinition} from "../../../../../shared/models/definition.model";
import {ICreateDefinition} from "../../../../../shared/models/create-definition.model";
import {SET_POPOVER_ANCHOR, SET_POPOVER_CONTENT, SET_POPOVER_OPEN} from "../../../nodes/store/state";
import {SET_DEFINITION_EDITOR_ANCHOR, SET_DEFINITION_EDITOR_OPEN, SET_DEFINITION_TEMP} from "../state";


export const ADD: string = 'add';
export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function addDefinition(dispatch: any, nodeOrRelation: ICreateDefinition) {
    const request = axios.post(Endpoints.definitions.POST, nodeOrRelation);
    request.then((response) => {
        loadDefinitions(dispatch);
    })
        .catch((error) => {
            dispatch({
                type: 'addDefinitionFailed'
            });
            console.log(error)
        });
}

export function deleteDefinition(dispatch: any, oldData: IDefinition) {
    const request = axios.delete(Endpoints.definitions.DELETE, {data: {definitionIds: [oldData.id]}});
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "deleteDefinition",
            });
        } else {
            dispatch({
                type: 'deleteDefinitionFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'deleteDefinitionFailed'
            });
        });
}

export function loadDefinitions(dispatch: any) {
    const request = axios.get(Endpoints.definitions.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadDefinitions",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadDefinitionsFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadDefinitionsFailed'
            });
        });
}

export function setDefinitions(dispatch: any, definitions: Array<IDefinition>, action = '') {
    dispatch({
        type: "loadDefinitions",
        payload: definitions
    });
    if (action === ADD) {
        setAddAlertOpen(dispatch, true);
    } else if (action === UPDATE) {
        setUpdateAlertOpen(dispatch, true);
    } else if (action === DELETE) {
        setDeleteAlertOpen(dispatch, true);
    }
}

export function setAddAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: 'setAddAlertOpen',
        payload: param
    });
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

export function setDefinitionTemp(dispatch: any, content: object) {
    dispatch({
        type: SET_DEFINITION_TEMP,
        payload: content
    });
}

export function setDefinitionEditorAnchor(dispatch: any, anchor: HTMLDivElement | null) {
    dispatch({
        type: SET_DEFINITION_EDITOR_ANCHOR,
        payload: anchor
    });
}

export function setDefinitionEditorOpen(dispatch: any, open: boolean) {
    dispatch({
        type: SET_DEFINITION_EDITOR_OPEN,
        payload: open
    });
}
