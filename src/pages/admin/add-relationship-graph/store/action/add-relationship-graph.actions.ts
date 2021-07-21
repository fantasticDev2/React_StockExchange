import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";

export function loadRelationsShips(dispatch: any) {
    const request = axios.get(Endpoints.relationships.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "setRelationsShips",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'setRelationsShipsFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'setRelationsShipsFailed'
            });
        });
}

export function setRelationship(dispatch: any, relationship: string) {
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

export function setNodeLabel1(dispatch: any, nodeLabel: string) {
    dispatch({
        type: 'setNodeLabel1',
        payload: nodeLabel
    });
}

export function setNodeLabel2(dispatch: any, nodeLabel: string) {
    dispatch({
        type: 'setNodeLabel2',
        payload: nodeLabel
    });
}

export function setNode1(dispatch: any, param: string) {
    dispatch({
        type: 'setNode1',
        payload: param
    });
}

export function setNode2(dispatch: any, param: string) {
    dispatch({
        type: 'setNode2',
        payload: param
    });
}

export function setOpenNodeLabel1(dispatch: any, param: boolean) {
    dispatch({
        type: 'setOpenNodeLabel1',
        payload: param
    });
}

export function setOpenNodeLabel2(dispatch: any, param: boolean) {
    dispatch({
        type: 'setOpenNodeLabel2',
        payload: param
    });
}

export function setOpenNode1(dispatch: any, param: boolean) {
    dispatch({
        type: 'setOpenNode1',
        payload: param
    });
}

export function setOpenNode2(dispatch: any, param: boolean) {
    dispatch({
        type: 'setOpenNode2',
        payload: param
    });
}

export function loadNodes1(dispatch: any) {
    axios.get(Endpoints.nodes.GET).then((response) => {
        if (response.data != null) {
            dispatch({
                type: 'setNodes1',
                payload: response.data
            });
        }
    });
}

export function loadNodes2(dispatch: any) {
    axios.get(Endpoints.nodes.GET).then((response) => {
        if (response.data != null) {
            dispatch({
                type: 'setNodes2',
                payload: response.data
            });
        }
    });
}

export function setNodes1(dispatch: any, param: string) {
    axios.get(Endpoints.nodes.GET_NODES_BY_LABEL.replace(':label', param)).then((response) => {
        if (response.data != null) {
            dispatch({
                type: 'setNodes1',
                payload: response.data
            });
        }
    });
}

export function setNodes2(dispatch: any, param: string) {
    axios.get(Endpoints.nodes.GET_NODES_BY_LABEL.replace(':label', param)).then((response) => {
        if (response.data != null) {
            dispatch({
                type: 'setNodes2',
                payload: response.data
            });
        }
    });
}

export function loadNodeLabels1(dispatch: any) {
    axios.get(Endpoints.nodes.GET_NODES_LABELS).then((response) => {
        if (response.data != null) {
            dispatch({
                type: 'setNodeLabels1',
                payload: response.data
            });
        }
    });
}

export function loadNodeLabels2(dispatch: any) {
    axios.get(Endpoints.nodes.GET_NODES_LABELS).then((response) => {
        if (response.data != null) {
            dispatch({
                type: 'setNodeLabels2',
                payload: response.data
            });
        }
    });
}

export function showSuccessAlert(dispatch: any, addSuccess: boolean) {
    dispatch({
        type: 'setAddSuccess',
        payload: addSuccess
    });
}
