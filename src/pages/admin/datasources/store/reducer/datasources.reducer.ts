import {
    SET_DELETEALERT,
    SET_UPDATEALERT,
    SET_DATASOURCES,
    SET_DATASOURCES_FAILED,
    State
} from "../state/datasources.state";
import {IGraphDataSource} from "../../../../../shared/models/graph-datasource.model";


export type Action =
    { type: "setDataSources", payload: Array<IGraphDataSource> }
    | { type: "setDataSourcesFailed" }
    | { type: "setUpdateAlert", payload: boolean }
    | { type: "setDeleteAlert", payload: boolean };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_DATASOURCES:
            return {
                ...state,
                datasources: action.payload
            };
        case SET_DATASOURCES_FAILED:
            return {
                ...state,
            };
        case SET_UPDATEALERT:
            return {
                ...state,
                updateAlertOpen: action.payload
            }
        case SET_DELETEALERT:
            return {
                ...state,
                deleteAlertOpen: action.payload
            }
    }
};
