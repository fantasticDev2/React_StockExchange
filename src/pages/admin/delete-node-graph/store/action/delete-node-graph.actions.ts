import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {IGraphNode} from "../../../../../shared/models/graph-node.model";

export function loadNodeLabels(dispatch: any) {
    const request = axios.get(Endpoints.neo4j.GET_NODE_LABELS);
    request.then((response: any) => {
        if (response.data != null && response.data.length > 0) {
            dispatch({
                type: "loadNodeLabels",
                payload: response.data.filter((v, i, a) => a.indexOf(v) === i)
            });
        } else {
            dispatch({
                type: "loadNodeLabels",
                payload: []
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadNodeLabelsFailed'
            });
        });
}

export function loadNodes(dispatch: any) {
    const request = axios.get(Endpoints.neo4j.GET_NODES);
    request.then((response: any) => {
        if (response.data != null && response.data.length > 0) {
            dispatch({
                type: "loadNodes",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadNodesFailed',
                payload: []
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadNodesFailed'
            });
        });
}

export function setNodeLabel(dispatch: any, label: string) {
    dispatch({
        type: "setNodeLabel",
        payload: label
    });
}

export function setNode(dispatch: any, node: IGraphNode) {
    dispatch({
        type: 'setNode',
        payload: node
    });
}

export function setOpenNodeLabel(dispatch: any, openlabel: boolean) {
    dispatch({
        type: 'setOpenNodeLabel',
        payload: openlabel
    });
}

export function setOpenNode(dispatch: any, opennode: boolean) {
    dispatch({
        type: 'setOpenNode',
        payload: opennode
    });
}

export function DeleteNodeFromGraph(dispatch: any, node: IGraphNode) {
    axios
        .delete(Endpoints.neo4j.DELETE_NODE, {data: {id: node.identity.low}})
        .then((response) => {
            console.log(response.data);
            showSuccessAlert(dispatch, true);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function nodeLabelChange(dispatch: any, param: string) {
    const request = axios.get(Endpoints.neo4j.GET_NODES_BY_LABEL.replace(':label', param));
    request.then((response: any) => {
        if (response.data != null && response.data.length > 0) {
            dispatch({
                type: "loadNodes",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadNodes',
                payload: []
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadNodesFailed'
            });
        });
}

export function showSuccessAlert(dispatch: any, deleteSuccess: boolean) {
    dispatch({
        type: 'setDeleteSuccess',
        payload: deleteSuccess
    });
}
