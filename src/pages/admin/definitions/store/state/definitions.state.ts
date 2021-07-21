import {IDefinition} from "../../../../../shared/models/definition.model";

export type State = {
    definitions: Array<IDefinition>
    addAlertOpen: boolean
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
    openPopover: boolean
    popoverContent: object
    popoverAnchor: HTMLButtonElement | null
    definitionEditorPopover: boolean
    definitionEditorPopoverAnchor: HTMLDivElement | null
    definitionTemp: object
};

export const initialState: State = {
    definitions: [],
    addAlertOpen: false,
    updateAlertOpen: false,
    deleteAlertOpen: false,
    openPopover: false,
    popoverContent: null,
    popoverAnchor: null,
    definitionEditorPopover: false,
    definitionEditorPopoverAnchor: null,
    definitionTemp: null
};

export const SET_POPOVER_OPEN = 'setPopoverOpen';
export const SET_POPOVER_CONTENT = 'setPopoverContent';
export const SET_POPOVER_ANCHOR = 'setPopoverAnchor';
export const SET_DEFINITION_TEMP = 'setDefinitionTemp';
export const SET_DEFINITION_EDITOR_OPEN = 'setDefinitionEditorOpen';
export const SET_DEFINITION_EDITOR_ANCHOR = 'setDefinitionEditorAnchor';
