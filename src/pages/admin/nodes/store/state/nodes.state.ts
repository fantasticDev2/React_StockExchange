import {INode} from "../../../../../shared/models/node.model";

export type State = {
    nodes: Array<INode>
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
    openPopover: boolean
    popoverContent: object
    popoverAnchor: HTMLButtonElement | null
};

export const initialState: State = {
    nodes: [],
    updateAlertOpen: false,
    deleteAlertOpen: false,
    openPopover: false,
    popoverContent: null,
    popoverAnchor: null
};

export const SET_POPOVER_OPEN = 'setPopoverOpen';
export const SET_POPOVER_CONTENT = 'setPopoverContent';
export const SET_POPOVER_ANCHOR = 'setPopoverAnchor';
