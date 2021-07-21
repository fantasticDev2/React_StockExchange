import {IGraphWorkspace} from "../../../../../shared/models/graph-workspace.model";

export type State = {
    workspaces: Array<IGraphWorkspace>
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
};

export const initialState: State = {
    workspaces: [],
    updateAlertOpen: false,
    deleteAlertOpen: false,
};

export const SET_WORKSPACES = 'setWorkspaces';
export const SET_WORKSPACES_FAILED = 'setWorkspacesFailed'
export const SET_UPDATEALERT = 'setUpdateAlert';
export const SET_DELETEALERT = 'setDeleteAlert';
