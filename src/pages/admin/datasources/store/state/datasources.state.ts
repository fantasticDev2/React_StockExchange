import {IGraphDataSource} from "../../../../../shared/models/graph-datasource.model";

export type State = {
    datasources: Array<IGraphDataSource>
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
};

export const initialState: State = {
    datasources: [],
    updateAlertOpen: false,
    deleteAlertOpen: false,
};

export const SET_DATASOURCES = 'setDataSources';
export const SET_DATASOURCES_FAILED = 'setDataSourcesFailed'
export const SET_UPDATEALERT = 'setUpdateAlert';
export const SET_DELETEALERT = 'setDeleteAlert';
