import {IRelationship} from "../../../../../shared/models/relationship.model";

export type State = {
    relationships: Array<IRelationship>
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
    openPopover: boolean
    popoverContent: object
    popoverAnchor: HTMLButtonElement | null
};

export const initialState: State = {
    relationships: [],
    updateAlertOpen: false,
    deleteAlertOpen: false,
    openPopover: false,
    popoverContent: null,
    popoverAnchor: null
};

export const SET_POPOVER_OPEN = 'setPopoverOpen';
export const SET_POPOVER_CONTENT = 'setPopoverContent';
export const SET_POPOVER_ANCHOR = 'setPopoverAnchor';
