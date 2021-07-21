export type WorkspaceState = {
    name: string
    key: string
    attachmentId: number
    dataSource: string
    active: boolean
    addSuccess: boolean
    addFailed: boolean
    nameError: boolean
    keyError: boolean
    attachmentIdError: boolean
    dataSourceError: boolean
};

export const initialWorkspaceState: WorkspaceState = {
    name: "",
    key: "",
    attachmentId: null,
    dataSource: '',
    active: true,
    addSuccess: false,
    addFailed: false,
    nameError: false,
    keyError: false,
    attachmentIdError: false,
    dataSourceError: false
};

export const SET_NAME = 'setName';
export const SET_KEY = 'setKey';
export const SET_ATTACHMENT_ID = 'setAttachmentId';
export const SET_DATASOURCE = 'setDataSource';
export const SET_ACTIVE = 'setActive';
export const SET_SUCCESS = 'setSuccess';
export const SET_FAILED = 'setFailed';
export const SET_NAME_ERROR = 'setNameError';
export const SET_KEY_ERROR = 'setKeyError';
export const SET_ATTACHMENT_ERROR = 'setAttachmentIdError';
export const SET_DATASOURCE_ERROR = 'setDataSourceError';
