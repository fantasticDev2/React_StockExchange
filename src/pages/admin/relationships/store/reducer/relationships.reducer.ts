import {IRelationship} from "../../../../../shared/models/relationship.model";
import {State} from "../state";
import {SET_POPOVER_ANCHOR, SET_POPOVER_CONTENT, SET_POPOVER_OPEN} from "../state";


export type Action =
    { type: "deleteRelationship" }
    | { type: "deleteRelationshipFailed" }
    | { type: "loadRelationships", payload: Array<IRelationship> }
    | { type: "loadRelationshipsFailed" }
    | { type: "setUpdateAlertOpen", payload: boolean }
    | { type: "setDeleteAlertOpen", payload: boolean }
    | { type: "setPopoverAnchor", payload: HTMLButtonElement | null }
    | { type: "setPopoverOpen", payload: boolean }
    | { type: "setPopoverContent", payload: object };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "deleteRelationship":
            return {
                ...state
            };
        case "deleteRelationshipFailed":
            return {
                ...state,
            };
        case "loadRelationships":
            return {
                ...state,
                relationships: action.payload
            };
        case "loadRelationshipsFailed":
            return {
                ...state,
                relationships: []
            };
        case "setUpdateAlertOpen":
            return {
                ...state,
                updateAlertOpen: action.payload
            }
        case "setDeleteAlertOpen":
            return {
                ...state,
                deleteAlertOpen: action.payload
            }
        case SET_POPOVER_OPEN:
            return {
                ...state,
                openPopover: action.payload
            }
        case SET_POPOVER_CONTENT:
            return {
                ...state,
                popoverContent: action.payload
            }
        case SET_POPOVER_ANCHOR:
            return {
                ...state,
                popoverAnchor: action.payload
            }
    }
};
