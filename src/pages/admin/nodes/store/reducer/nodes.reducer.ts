import {INode} from "../../../../../shared/models/node.model";
import {SET_POPOVER_ANCHOR, SET_POPOVER_CONTENT, SET_POPOVER_OPEN, State} from "../state/nodes.state";

export type Action = { type: "deleteNode" }
    | { type: "deleteNodeFailed" }
    | { type: "loadNodes", payload: Array<INode> }
    | { type: "loadNodesFailed" }
    | { type: "setUpdateAlertOpen", payload: boolean }
    | { type: "setDeleteAlertOpen", payload: boolean }
    | { type: "setPopoverAnchor", payload: HTMLButtonElement | null }
    | { type: "setPopoverOpen", payload: boolean }
    | { type: "setPopoverContent", payload: object };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "deleteNode":
            return {
                ...state,
            };
        case "deleteNodeFailed":
            return {
                ...state,
            };
        case "loadNodes":
            return {
                ...state,
                nodes: action.payload
            };
        case "loadNodesFailed":
            return {
                ...state,
                nodes: []
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
