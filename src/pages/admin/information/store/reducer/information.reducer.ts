import {State} from "../state";


export type Action =
    { type: "getCompanyStockPricesNumber", payload: number }
    | { type: "getDefinitionsNumber", payload: number }
    | { type: "getNodesNumber", payload: number }
    | { type: "getRelationshipsNumber", payload: number }

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "getCompanyStockPricesNumber":
            return {
                ...state,
                companyStockPrices: action.payload
            };
        case "getDefinitionsNumber":
            return {
                ...state,
                definitions: action.payload
            };
        case "getNodesNumber":
            return {
                ...state,
                nodes: action.payload
            };
        case "getRelationshipsNumber":
            return {
                ...state,
                relationships: action.payload
            };
    }
};
