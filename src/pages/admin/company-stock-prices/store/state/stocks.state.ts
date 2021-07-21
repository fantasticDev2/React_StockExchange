import {ICompanyStockPrice} from "../../../../../shared/models/company-stock-price.model";

export type State = {
    stock_prices: Array<ICompanyStockPrice>
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
};

export const initialState: State = {
    stock_prices: [],
    updateAlertOpen: false,
    deleteAlertOpen: false,
};
