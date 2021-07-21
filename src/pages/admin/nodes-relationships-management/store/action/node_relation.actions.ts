import axios from "axios";
import {Endpoints} from "../../../../../shared/endpoints";
import {IDefinition} from "../../../../../shared/models/definition.model";
import {ICreateNode} from "../../../../../shared/models/create-node.model";
import {ICreateRelationship} from "../../../../../shared/models/create-relationship.model";

export function loadDefinitions(dispatch: any, selectedType: string) {
    const request = axios.get(Endpoints.definitions.GET);
    request.then((response: any) => {
        if (response.data != null) {

            const filteredDefinitions = response.data.filter((definition: IDefinition) => definition.type === selectedType)

            dispatch({
                type: "loadDefinitions",
                payload: filteredDefinitions
            });
        } else {
            dispatch({
                type: 'loadDefinitionsFailed'
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loadDefinitionsFailed'
            });
        });
}


export function loadTypes(dispatch: any) {
    dispatch({
        type: "loadTypes",
        payload: ["Node", "Relationship"]
    });
}

export function setJsonData(dispatch: any, jsonData: Array<any>) {
    dispatch({
        type: "setJsonData",
        payload: jsonData
    });
}

export function setValidJsonData(dispatch: any, jsonData: Array<any>) {
    dispatch({
        type: "setValidJsonData",
        payload: jsonData
    });
}

export function setErrorData(dispatch: any, error: boolean) {
    dispatch({
        type: "setErrorData",
        payload: error
    });
}

export function setDefinition(dispatch: any, definition: string) {
    dispatch({
        type: "setDefinition",
        payload: definition
    });
}

export function setSelectedDefinition(dispatch: any, definition: IDefinition) {
    dispatch({
        type: "setSelectedDefinition",
        payload: definition
    });
}

export function setOpenDefinition(dispatch: any, open: boolean) {
    dispatch({
        type: "setOpenDefinition",
        payload: open
    });
}

export function setType(dispatch: any, type: string) {
    dispatch({
        type: "setType",
        payload: type
    });
}

export function setSelectedType(dispatch: any, type: string) {
    dispatch({
        type: "setSelectedDefinition",
        payload: type
    });
}

export function setOpenType(dispatch: any, open: boolean) {
    dispatch({
        type: "setOpenType",
        payload: open
    });
}

export function createNode(dispatch: any, node: ICreateNode) {
    axios
        .post(Endpoints.nodes.POST, node)
        .then((response) => {
            console.log(response.data);
            alert("Created node");
        })
        .catch((error) => {
            console.log(error);
        });
}

export function createRelationship(dispatch: any, relationship: ICreateRelationship) {
    axios
        .post(Endpoints.relationships.POST, relationship)
        .then((response) => {
            console.log(response.data);
            alert("Created relationship");
        })
        .catch((error) => {
            console.log(error);
        });
}
