
export type GraphManagementState = {
    importContent: object
    importOpenPopover: boolean
    importPopoverAnchor: HTMLButtonElement | null
    importSuccess: boolean
    importFailed: boolean
    exportContent: object,
    exportOpenPopover: boolean
    exportPopoverAnchor: HTMLButtonElement | null
    exportSuccess: boolean
    exportFailed: boolean
};

export const initialGraphManagementState: GraphManagementState = {
    importContent: null,
    importOpenPopover: false,
    importPopoverAnchor: null,
    importSuccess: false,
    importFailed: false,
    exportContent: null,
    exportOpenPopover: false,
    exportPopoverAnchor: null,
    exportSuccess: false,
    exportFailed: false
};

export const SET_IMPORT_CONTENT = 'setImportContent';
export const SET_IMPORT_OPEN_POPOVER = 'setImportOpenPopover';
export const SET_IMPORT_POPOVER_ANCHOR = 'setImportPopoverAnchor';
export const SET_IMPORT_SUCCESS = 'setImportSuccess';
export const SET_IMPORT_FAILED = 'setImportFailed';
export const SET_EXPORT_CONTENT = 'setExportContent';
export const SET_EXPORT_OPEN_POPOVER = 'setExportOpenPopover';
export const SET_EXPORT_POPOVER_CONTENT = 'setExportPopoverContent';
export const SET_EXPORT_POPOVER_ANCHOR = 'setExportPopoverAnchor';
export const SET_EXPORT_SUCCESS = 'setExportSuccess';
export const SET_EXPORT_FAILED = 'setExportFailed';
