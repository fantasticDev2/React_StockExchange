import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {
    SET_ACTIVE, SET_ATTACHMENT_ERROR,
    SET_ATTACHMENT_ID,
    SET_DATASOURCE, SET_DATASOURCE_ERROR, SET_FAILED,
    SET_KEY,
    SET_KEY_ERROR,
    SET_NAME,
    SET_NAME_ERROR,
    SET_SUCCESS, WorkspaceState
} from "../state";
import {IGraphWorkspace} from "../../../../../shared/models/graph-workspace.model";


export function createWorkspace(dispatch: any, state: WorkspaceState) {
    let workspace = {
        name: state.name,
        key: state.key,
        isActive: state.active,
        attachmentId: state.attachmentId,
        datasource: [state.dataSource]
    };
    const request = axios.post(Endpoints.workspaces.POST, workspace);
    request.then((response: any) => {
        if (response.data != null) {
            setSuccess(dispatch, true);
        } else {
            setFailed(dispatch, true);
        }
    })
        .catch((error: any) => {
            setFailed(dispatch, true);
        });
}

export function setName(dispatch: any, name: string) {
    dispatch({
        type: SET_NAME,
        payload: name
    });
}

export function setKey(dispatch: any, key: string) {
    dispatch({
        type: SET_KEY,
        payload: key
    });
}

export function setAttachmentId(dispatch: any, attachmentId: number) {
    dispatch({
        type: SET_ATTACHMENT_ID,
        payload: attachmentId
    });
}

export function setDataSource(dispatch: any, dataSource: string) {
    dispatch({
        type: SET_DATASOURCE,
        payload: dataSource
    });
}

export function setActive(dispatch: any, isActive: boolean) {
    dispatch({
        type: SET_ACTIVE,
        payload: isActive
    });
}

export function setSuccess(dispatch: any, isSuccess: boolean) {
    dispatch({
        type: SET_SUCCESS,
        payload: isSuccess
    });
}

export function setFailed(dispatch: any, isFailed: boolean) {
    dispatch({
        type: SET_FAILED,
        payload: isFailed
    });
}

export function setNameError(dispatch: any, isError: boolean) {
    dispatch({
        type: SET_NAME_ERROR,
        payload: isError
    });
}

export function setKeyError(dispatch: any, isError: boolean) {
    dispatch({
        type: SET_KEY_ERROR,
        payload: isError
    });
}

export function setAttachmentIdError(dispatch: any, isError: boolean) {
    dispatch({
        type: SET_ATTACHMENT_ERROR,
        payload: isError
    });
}

export function setDataSourceError(dispatch: any, isError: boolean) {
    dispatch({
        type: SET_DATASOURCE_ERROR,
        payload: isError
    });
}
