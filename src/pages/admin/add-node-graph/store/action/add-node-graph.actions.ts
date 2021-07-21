import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {INode} from "../../../../../shared/models/node.model";

export function loadNodeLabels(dispatch: any) {
    const request = axios.get(Endpoints.nodes.GET_NODES_LABELS);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadNodeLabels",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadNodeLabelsFailed'
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
    const request = axios.get(Endpoints.nodes.GET);
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadNodes",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadNodesFailed'
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

export function setNode(dispatch: any, node: string) {
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

export function CreateNewNodeGraph(dispatch: any, node: INode) {
    axios
        .post(Endpoints.neo4j.POST_NODE, node)
        .then((response) => {
            console.log(response.data);
            showSuccessAlert(dispatch, true);

        })
        .catch((error) => {
            console.log(error);
        });
}

export function nodeLabelChange(dispatch: any, param: string) {
    const request = axios.get(Endpoints.nodes.GET_NODES_BY_LABEL.replace(':label', param));
    request.then((response: any) => {
        if (response.data != null) {
            dispatch({
                type: "loadNodes",
                payload: response.data
            });
        } else {
            dispatch({
                type: 'loadNodesFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadNodesFailed'
            });
        });
}

export function showSuccessAlert(dispatch: any, addSuccess: boolean) {
    dispatch({
        type: 'setAddSuccess',
        payload: addSuccess
    });
}
