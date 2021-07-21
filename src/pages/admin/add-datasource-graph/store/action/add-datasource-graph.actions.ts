import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {
    DataSourceState,
    SET_BEHIND_FIREWALL,
    SET_CONNECTION_METHOD, SET_DATABASE_PORT_ERROR, SET_DB_HOST, SET_DB_PORT, SET_FAILED,
    SET_NICKNAME, SET_PASSWORD,
    SET_SUCCESS, SET_USERNAME, SET_VERSION, SET_WORKSPACE_ID, SET_WORKSPACE_ID_ERROR
} from "../state";
import {WorkspaceState} from "../../../add-workspace-graph/store/state";

export function createDataSource(dispatch: any, state: DataSourceState) {
    let datasource = {
        nickname: state.nickname,
        connectionMethod: state.connectionMethod,
        behindFirewall: state.behindFirewall,
        databaseHost: state.databaseHost,
        databasePort: state.databasePort,
        username: state.username,
        password: state.password,
        version: state.version,
        workspaceId: state.workspaceId
    };
    const request = axios.post(Endpoints.datasource.POST, datasource);
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

export function setNickName(dispatch: any, name: string) {
    dispatch({
        type: SET_NICKNAME,
        payload: name
    });
}

export function setConnectionMethod(dispatch: any, method: string) {
    dispatch({
        type: SET_CONNECTION_METHOD,
        payload: method
    });
}

export function setBehindFirewall(dispatch: any, behindFirewall: boolean) {
    dispatch({
        type: SET_BEHIND_FIREWALL,
        payload: behindFirewall
    });
}

export function setDatabaseHost(dispatch: any, host: string) {
    dispatch({
        type: SET_DB_HOST,
        payload: host
    });
}

export function setDatabasePort(dispatch: any, port: number | null) {
    dispatch({
        type: SET_DB_PORT,
        payload: port
    });
}

export function setUsername(dispatch: any, name: string) {
    dispatch({
        type: SET_USERNAME,
        payload: name
    });
}

export function setPassword(dispatch: any, password: string) {
    dispatch({
        type: SET_PASSWORD,
        payload: password
    });
}

export function setVersion(dispatch: any, version: string) {
    dispatch({
        type: SET_VERSION,
        payload: version
    });
}

export function setWorkspaceId(dispatch: any, workspaceId: number | null) {
    dispatch({
        type: SET_WORKSPACE_ID,
        payload: workspaceId
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

export function setDatabasePortError(dispatch: any, isError: boolean) {
    dispatch({
        type: SET_DATABASE_PORT_ERROR,
        payload: isError
    });
}

export function setWorkspaceIdError(dispatch: any, isError: boolean) {
    dispatch({
        type: SET_WORKSPACE_ID_ERROR,
        payload: isError
    });
}
