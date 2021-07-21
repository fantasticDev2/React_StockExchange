import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";


export function getCompanyStockPrices(dispatch: any) {
    const request = axios.get(Endpoints.companyStockPrices.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "getCompanyStockPricesNumber",
                payload: response.data.length
            });
        } else {
            dispatch({
                type: "getCompanyStockPricesNumber",
                payload: 0
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: "getCompanyStockPricesNumber",
                payload: 0
            });
        });
}

export function getDefinitions(dispatch: any) {
    const request = axios.get(Endpoints.definitions.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "getDefinitionsNumber",
                payload: response.data.length
            });
        } else {
            dispatch({
                type: "getDefinitionsNumber",
                payload: 0
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: "getDefinitionsNumber",
                payload: 0
            });
        });
}

export function getNodes(dispatch: any) {
    const request = axios.get(Endpoints.nodes.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "getNodesNumber",
                payload: response.data.length
            });
        } else {
            dispatch({
                type: "getNodesNumber",
                payload: 0
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: "getNodesNumber",
                payload: 0
            });
        });
}

export function getRelationships(dispatch: any) {
    const request = axios.get(Endpoints.relationships.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "getRelationshipsNumber",
                payload: response.data.length
            });
        } else {
            dispatch({
                type: "getRelationshipsNumber",
                payload: 0
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: "getRelationshipsNumber",
                payload: 0
            });
        });
}


