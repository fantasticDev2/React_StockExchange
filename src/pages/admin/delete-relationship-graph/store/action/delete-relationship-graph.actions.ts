import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {uniqBy} from 'lodash';
import {IGraphRelationship} from "../../../../../shared/models/graph-relationship.model";

export function loadRelationsShips(dispatch: any) {
    const request = axios.get(Endpoints.neo4j.GET_RELATIONSHIPS);
    request.then((response: any) => {
        if (response.data != null && response.data.length > 0) {
            console.log(response.data);
            dispatch({
                type: "setRelationsShips",
                payload: uniqBy(response.data, 'type')
            });
        } else {
            dispatch({
                type: 'setRelationsShips',
                payload: []
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'setRelationsShipsFailed'
            });
        });
}

export function setRelationship(dispatch: any, relationship: IGraphRelationship) {
    dispatch({
        type: 'setRelationship',
        payload: relationship
    });
}

export function setOpenRelationship(dispatch: any, param: boolean) {
    dispatch({
        type: 'setOpenRelationship',
        payload: param
    });
}

export function showSuccessAlert(dispatch: any, deleteSuccess: boolean) {
    dispatch({
        type: 'setDeleteSuccess',
        payload: deleteSuccess
    });
}

