import {
    SET_ACTIVE, SET_ATTACHMENT_ERROR,
    SET_ATTACHMENT_ID,
    SET_DATASOURCE, SET_DATASOURCE_ERROR, SET_FAILED,
    SET_KEY, SET_KEY_ERROR,
    SET_NAME,
    SET_NAME_ERROR,
    SET_SUCCESS,
    WorkspaceState
} from "../state";
import * as Actions from '../action'



export type WorkspaceAction = { type: 'setName', payload: string }
    | { type: "setKey", payload: string }
    | { type: "setAttachmentId", payload: number }
    | { type: "setDataSource", payload: string }
    | { type: "setActive", payload: boolean }
    | { type: "setSuccess", payload: boolean }
    | { type: "setFailed", payload: boolean }
    | { type: "setNameError", payload: boolean }
    | { type: "setKeyError", payload: boolean }
    | { type: "setAttachmentIdError", payload: boolean }
    | { type: "setDataSourceError", payload: boolean };

export const nodes_reducer = (state: WorkspaceState, action: WorkspaceAction): WorkspaceState => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload
            };
        case SET_KEY:
            return {
                ...state,
                key: action.payload
            }
        case SET_ATTACHMENT_ID:
            return {
                ...state,
                attachmentId: action.payload
            };
        case SET_DATASOURCE:
            return {
                ...state,
                dataSource: action.payload
            };
        case SET_ACTIVE:
            return {
                ...state,
                active: action.payload
            };
        case SET_SUCCESS:
            return {
                ...state,
                addSuccess: action.payload
            };
        case SET_FAILED:
            return {
                ...state,
                addFailed: action.payload
            };
        case SET_NAME_ERROR:
            return {
                ...state,
                nameError: action.payload
            };
        case SET_KEY_ERROR:
            return {
                ...state,
                keyError: action.payload
            };
        case SET_ATTACHMENT_ERROR:
            return {
                ...state,
                attachmentIdError: action.payload
            };
        case SET_DATASOURCE_ERROR:
            return {
                ...state,
                dataSourceError: action.payload
            };
    }
};
