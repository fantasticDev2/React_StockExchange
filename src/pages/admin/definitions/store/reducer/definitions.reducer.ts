import {IDefinition} from "../../../../../shared/models/definition.model";
import {SET_DEFINITION_EDITOR_ANCHOR, SET_DEFINITION_EDITOR_OPEN, State} from "../state";
import {SET_POPOVER_ANCHOR, SET_POPOVER_CONTENT, SET_POPOVER_OPEN, SET_DEFINITION_TEMP} from "../state";


export type Action = { type: "addDefinition", payload: IDefinition }
    | { type: "addDefinitionFailed" }
    | { type: "deleteDefinition" }
    | { type: "deleteDefinitionFailed" }
    | { type: "loadDefinitions", payload: Array<IDefinition> }
    | { type: "loadDefinitionsFailed" }
    | { type: "setAddAlertOpen", payload: boolean }
    | { type: "setUpdateAlertOpen", payload: boolean }
    | { type: "setDeleteAlertOpen", payload: boolean }
    | { type: "setPopoverAnchor", payload: HTMLButtonElement | null }
    | { type: "setPopoverOpen", payload: boolean }
    | { type: "setPopoverContent", payload: object }
    | { type: "setDefinitionEditorOpen", payload: boolean }
    | { type: "setDefinitionEditorAnchor", payload: HTMLDivElement | null }
    | { type: "setDefinitionTemp", payload: object };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "addDefinition":
            return {
                ...state,
                definitions: [...state.definitions, action.payload]
            };
        case "addDefinitionFailed":
            return {
                ...state
            };
        case "deleteDefinition":
            return {
                ...state,

            };
        case "deleteDefinitionFailed":
            return {
                ...state
            };
        case "loadDefinitions":
            return {
                ...state,
                definitions: action.payload
            };
        case "loadDefinitionsFailed":
            return {
                ...state,
                definitions: []
            }
        case "setAddAlertOpen":
            return {
                ...state,
                addAlertOpen: action.payload
            };
        case "setUpdateAlertOpen":
            return {
                ...state,
                updateAlertOpen: action.payload
            };
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
        case SET_DEFINITION_TEMP:
            return {
                ...state,
                definitionTemp: action.payload
            }
        case SET_DEFINITION_EDITOR_OPEN:
            return {
                ...state,
                definitionEditorPopover: action.payload
            }
        case SET_DEFINITION_EDITOR_ANCHOR:
            return {
                ...state,
                definitionEditorPopoverAnchor: action.payload
            }
    }
};
