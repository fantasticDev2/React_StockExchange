import {
    SET_DELETEALERT,
    SET_UPDATEALERT,
    SET_WORKSPACES,
    SET_WORKSPACES_FAILED,
    State
} from "../state/workspaces.state";
import {IGraphWorkspace} from "../../../../../shared/models/graph-workspace.model";

export type Action =
    { type: "setWorkspaces", payload: Array<IGraphWorkspace> }
    | { type: "setWorkspacesFailed" }
    | { type: "setUpdateAlert", payload: boolean }
    | { type: "setDeleteAlert", payload: boolean };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_WORKSPACES:
            return {
                ...state,
                workspaces: action.payload
            };
        case SET_WORKSPACES_FAILED:
            return {
                ...state,
            };
        case SET_UPDATEALERT:
            return {
                ...state,
                updateAlertOpen: action.payload
            }
        case SET_DELETEALERT:
            return {
                ...state,
                deleteAlertOpen: action.payload
            }
    }
};
