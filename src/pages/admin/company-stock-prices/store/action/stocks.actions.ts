import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {ICompanyStockPrice} from "../../../../../shared/models/company-stock-price.model";


export const UPDATE: string = 'update';
export const DELETE: string = 'delete';

export function getStockPrices(dispatch: any) {
    const request = axios.get(Endpoints.companyStockPrices.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "getStockPrices",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'getStockPricesFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'getStockPricesFailed'
            });
        });
}

export function deleteStockPrice(dispatch: any, oldData: ICompanyStockPrice) {
    const request = axios.delete(Endpoints.companyStockPrices.DELETE, {data: {companyStockPriceIds: [oldData.id]}});
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "deleteStockPrice",
            });
        } else {
            dispatch({
                type: 'deleteStockPriceFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'deleteStockPriceFailed'
            });
        });
}


export function setStockPrices(dispatch: any, stocks: Array<ICompanyStockPrice>, action = '') {
    dispatch({
        type: "getStockPrices",
        payload: stocks
    });
    if (action === UPDATE) {
        setUpdateAlertOpen(dispatch, true);
    } else if (action === DELETE) {
        setDeleteAlertOpen(dispatch, true);
    }
}

export function setUpdateAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: 'setUpdateAlertOpen',
        payload: param
    });
}

export function setDeleteAlertOpen(dispatch: any, param: boolean) {
    dispatch({
        type: 'setDeleteAlertOpen',
        payload: param
    });
}
