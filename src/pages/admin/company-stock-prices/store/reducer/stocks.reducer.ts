import {ICompanyStockPrice} from "../../../../../shared/models/company-stock-price.model";
import {State} from "../state";


export type Action = { type: "deleteStockPrice" }
    | { type: "deleteStockPriceFailed" }
    | { type: "getStockPrices", payload: Array<ICompanyStockPrice> }
    | { type: "getStockPricesFailed" }
    | { type: "setUpdateAlertOpen", payload: boolean }
    | { type: "setDeleteAlertOpen", payload: boolean }
    | { type: "updateStockPrice" }
    | { type: "updateStockPriceFailed" };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "deleteStockPrice":
            return {
                ...state,
            };
        case "deleteStockPriceFailed":
            return {
                ...state
            };
        case "getStockPrices":
            return {
                ...state,
                stock_prices: action.payload
            };
        case "getStockPricesFailed":
            return {
                ...state,
                stock_prices: []
            }
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
    }
};
