import {
    GraphManagementState,
    SET_EXPORT_CONTENT, SET_EXPORT_FAILED,
    SET_EXPORT_OPEN_POPOVER,
    SET_EXPORT_POPOVER_ANCHOR,
    SET_EXPORT_SUCCESS,
    SET_IMPORT_CONTENT,
    SET_IMPORT_FAILED,
    SET_IMPORT_OPEN_POPOVER,
    SET_IMPORT_POPOVER_ANCHOR,
    SET_IMPORT_SUCCESS
} from "../state";

export type GraphManagementAction = { type: "setImportContent", payload: object }
    | { type: "setImportOpenPopover", payload: boolean }
    | { type: "setImportPopoverAnchor", payload: HTMLButtonElement | null }
    | { type: "setImportSuccess", payload: boolean }
    | { type: "setImportFailed", payload: boolean }
    | { type: "setExportContent", payload: object }
    | { type: "setExportOpenPopover", payload: boolean }
    | { type: "setExportPopoverAnchor", payload: HTMLButtonElement | null }
    | { type: "setExportSuccess", payload: boolean }
    | { type: "setExportFailed", payload: boolean };

export const graphmanagement_reducer = (state: GraphManagementState, action: GraphManagementAction): GraphManagementState => {
    switch (action.type) {
        case SET_IMPORT_CONTENT:
            return {
                ...state,
                importContent: action.payload
            };
        case SET_IMPORT_OPEN_POPOVER:
            return {
                ...state,
                importOpenPopover: action.payload
            };
        case SET_IMPORT_POPOVER_ANCHOR:
            return {
                ...state,
                importPopoverAnchor: action.payload
            };
        case SET_IMPORT_SUCCESS:
            return {
                ...state,
                importSuccess: action.payload
            };
        case SET_IMPORT_FAILED:
            return {
                ...state,
                importFailed: action.payload
            };
        case SET_EXPORT_CONTENT:
            return {
                ...state,
                exportContent: action.payload
            };
        case SET_EXPORT_OPEN_POPOVER:
            return {
                ...state,
                exportOpenPopover: action.payload
            };
        case SET_EXPORT_POPOVER_ANCHOR:
            return {
                ...state,
                exportPopoverAnchor: action.payload
            };
        case SET_EXPORT_SUCCESS:
            return {
                ...state,
                exportSuccess: action.payload
            };
        case SET_EXPORT_FAILED:
            return {
                ...state,
                exportFailed: action.payload
            };
    }
}
