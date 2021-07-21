export type DataSourceState = {
    nickname: string
    connectionMethod: string
    behindFirewall: boolean
    databaseHost: string
    databasePort: number | null
    username: string
    password: string
    version: string
    workspaceId: number | null
    addSuccess: boolean
    addFailed: boolean
    databasePortError: boolean
    workspaceIdError: boolean
};

export const initialDataSourceState: DataSourceState = {
    nickname: "",
    connectionMethod: "",
    behindFirewall: true,
    databaseHost: '',
    databasePort: null,
    username: "",
    password: "",
    version: "",
    workspaceId: null,
    addSuccess: false,
    addFailed: false,
    databasePortError: false,
    workspaceIdError: false
};

export const SET_NICKNAME = 'setNickName';
export const SET_CONNECTION_METHOD = 'setConnectionMethod';
export const SET_BEHIND_FIREWALL = 'setBehindFirewall';
export const SET_DB_HOST = 'setDatabaseHost';
export const SET_DB_PORT = 'setDatabasePort';
export const SET_USERNAME = 'setUsername';
export const SET_PASSWORD = 'setPassword';
export const SET_VERSION = 'setVersion';
export const SET_WORKSPACE_ID = 'setWorkspaceId';
export const SET_SUCCESS = 'setSuccess';
export const SET_FAILED = 'setFailed';
export const SET_DATABASE_PORT_ERROR = 'setDatabasePortError';
export const SET_WORKSPACE_ID_ERROR = 'setWorkspaceIdError';
