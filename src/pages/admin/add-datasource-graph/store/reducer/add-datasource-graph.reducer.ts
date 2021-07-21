import {
    SET_SUCCESS,
    SET_FAILED,
    DataSourceState,
    SET_NICKNAME,
    SET_CONNECTION_METHOD,
    SET_BEHIND_FIREWALL,
    SET_DB_HOST,
    SET_DB_PORT,
    SET_USERNAME,
    SET_PASSWORD, SET_VERSION, SET_WORKSPACE_ID, SET_DATABASE_PORT_ERROR, SET_WORKSPACE_ID_ERROR
} from "../state";

export type DataSourceAction = { type: "setNickName", payload: string }
    | { type: "setConnectionMethod", payload: string }
    | { type: "setBehindFirewall", payload: boolean }
    | { type: "setDatabaseHost", payload: string }
    | { type: "setDatabasePort", payload: number | null }
    | { type: "setUsername", payload: string }
    | { type: "setPassword", payload: string }
    | { type: "setPassword", payload: string }
    | { type: "setVersion", payload: string }
    | { type: "setWorkspaceId", payload: number | null}
    | { type: "setSuccess", payload: boolean }
    | { type: "setFailed", payload: boolean }
    | { type: "setDatabasePortError", payload: boolean }
    | { type: "setWorkspaceIdError", payload: boolean };

export const nodes_reducer = (state: DataSourceState, action: DataSourceAction): DataSourceState => {
    switch (action.type) {
        case SET_NICKNAME:
            return {
                ...state,
                nickname: action.payload
            };
        case SET_CONNECTION_METHOD:
            return {
                ...state,
                connectionMethod: action.payload
            }
        case SET_BEHIND_FIREWALL:
            return {
                ...state,
                behindFirewall: action.payload
            };
        case SET_DB_HOST:
            return {
                ...state,
                databaseHost: action.payload
            };
        case SET_DB_PORT:
            return {
                ...state,
                databasePort: action.payload
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
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case SET_VERSION:
            return {
                ...state,
                version: action.payload
            };
        case SET_WORKSPACE_ID:
            return {
                ...state,
                workspaceId: action.payload
            };
        case SET_DATABASE_PORT_ERROR:
            return {
                ...state,
                databasePortError: action.payload
            };
        case SET_WORKSPACE_ID_ERROR:
            return {
                ...state,
                workspaceIdError: action.payload
            };
    }
};
