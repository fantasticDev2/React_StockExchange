import {IDefinition} from "../../../../../shared/models/definition.model";

export type State = {
    jsonData: Array<any>
    validJsonData: Array<any>
    errorData: boolean
    types: Array<string>
    selectedType: string
    type: string
    definition: string
    selectedDefinition: IDefinition
    definitions: Array<IDefinition>
    openDefinition: boolean
    openType: boolean
};

export const initialState: State = {
    jsonData: [],
    validJsonData: [],
    errorData: false,
    type: "",
    selectedType: "",
    types: [],
    definition: "",
    selectedDefinition: <IDefinition>{
        id: "",
        created_at: "",
        updated_at: "",
        type: "",
        entity: "",
        definition_json: ""
    },
    definitions: Array<IDefinition>(),
    openDefinition: false,
    openType: false
};

export type Action = { type: "loadTypes", payload: Array<string> }
    | { type: "setType", payload: string }
    | { type: "loadDefinitions", payload: Array<IDefinition> }
    | { type: "loadDefinitionsFailed" }
    | { type: "setJsonData", payload: Array<any> }
    | { type: "setValidJsonData", payload: Array<any> }
    | { type: "setErrorData", payload: boolean }
    | { type: "setDefinition", payload: string }
    | { type: "setSelectedDefinition", payload: IDefinition }
    | { type: "setOpenDefinition", payload: boolean }
    | { type: "setOpenType", payload: boolean };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "loadTypes":
            return {
                ...state,
                types: action.payload
            };
        case "setType":
            return {
                ...state,
                type: action.payload
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
            };
        case 'setJsonData':
            return {
                ...state,
                jsonData: action.payload
            };
        case 'setValidJsonData':
            return {
                ...state,
                validJsonData: action.payload
            };
        case 'setErrorData':
            return {
                ...state,
                errorData: action.payload
            };
        case 'setDefinition':
            return {
                ...state,
                definition: action.payload
            };
        case 'setSelectedDefinition':
            return {
                ...state,
                selectedDefinition: action.payload
            };
        case 'setOpenDefinition':
            return {
                ...state,
                openDefinition: action.payload
            };
        case 'setOpenType':
            return {
                ...state,
                openType: action.payload
            };
    }
};
