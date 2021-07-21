import {
    SET_EXPORT_CONTENT, SET_EXPORT_FAILED,
    SET_EXPORT_OPEN_POPOVER,
    SET_EXPORT_POPOVER_ANCHOR,
    SET_EXPORT_POPOVER_CONTENT,
    SET_EXPORT_SUCCESS,
    SET_IMPORT_CONTENT,
    SET_IMPORT_FAILED,
    SET_IMPORT_OPEN_POPOVER,
    SET_IMPORT_POPOVER_ANCHOR,
    SET_IMPORT_SUCCESS
} from "../state";

export function setImportContent(dispatch: any, content: object) {
    dispatch({
        type: SET_IMPORT_CONTENT,
        payload: content
    });
}

export function setImportOpenPopover(dispatch: any, isOpen: boolean) {
    dispatch({
        type: SET_IMPORT_OPEN_POPOVER,
        payload: isOpen
    });
}

export function setImportPopoverAnchor(dispatch: any, anchor: HTMLButtonElement | null) {
    dispatch({
        type: SET_IMPORT_POPOVER_ANCHOR,
        payload: anchor
    });
}

export function setImportSuccess(dispatch: any, isSuccess: boolean) {
    dispatch({
        type: SET_IMPORT_SUCCESS,
        payload: isSuccess
    });
}

export function setImportFailed(dispatch: any, isFailed: boolean) {
    dispatch({
        type: SET_IMPORT_FAILED,
        payload: isFailed
    });
}

export function setExportContent(dispatch: any, content: object) {
    dispatch({
        type: SET_EXPORT_CONTENT,
        payload: content
    });
}

export function setExportOpenPopover(dispatch: any, isOpen: boolean) {
    dispatch({
        type: SET_EXPORT_OPEN_POPOVER,
        payload: isOpen
    });
}

export function setExportPopoverAnchor(dispatch: any, anchor: HTMLButtonElement | null) {
    dispatch({
        type: SET_EXPORT_POPOVER_ANCHOR,
        payload: anchor
    });
}

export function setExportSuccess(dispatch: any, isSuccess: boolean) {
    dispatch({
        type: SET_EXPORT_SUCCESS,
        payload: isSuccess
    });
}

export function setExportFailed(dispatch: any, isFailed: boolean) {
    dispatch({
        type: SET_EXPORT_FAILED,
        payload: isFailed
    });
}
