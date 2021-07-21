export const URL = "https://data-mapper-api.herokuapp.com";
export const WEB_SOCKET = "https://data-connection-api.herokuapp.com"; 
export const Endpoints = {
    auth: {
        POST_GET_TOKEN: URL + '/auth/token',
        POST_CREATE_USER: URL + '/users'
    },
    companyStockPrices: {
        GET: URL + '/company-stock-prices',
        POST: URL + '/company-stock-prices',
        DELETE: URL + '/company-stock-prices',
    },
    definitions: {
        GET: URL + '/definitions',
        POST: URL + '/definitions',
        DELETE: URL + '/definitions',
    },
    neo4j: {
        GET_NODES: URL + '/neo4j/nodes',
        GET_NODES_BY_LABEL: URL + '/neo4j/nodes/:label',
        GET_NODE_LABELS: URL + '/neo4j/node-labels',
        GET_RELATIONSHIPS: URL + '/neo4j/relationships',
        POST_NODE: URL + '/neo4j/node',
        POST_RELATIONSHIP: URL + '/neo4j/relationship',
        DELETE_NODE: URL + '/neo4j/node',
        DELETE_RELATIONSHIP: URL + '/neo4j/relationship',
        DESTROY_GRAPH: URL + '/neo4j/destroy-graph',
    },
    nodes: {
        GET: URL + '/nodes',
        POST: URL + '/nodes',
        GET_NODES_LABELS: URL + '/nodes/labels', // response: ["Company","Person"]
        GET_NODES_BY_LABEL: URL + '/nodes/get-by-label/:label', // e.g: /nodes/get-by-label/Company
        DELETE: URL + '/nodes'
    },
    workspaces: {
        GET: URL + '/workspace',
        POST: URL + '/workspace'
    },
    datasource: {
        GET: URL + '/datasource',
        POST: URL + '/datasource'
    },
    relationships: {
        GET: URL + '/relationships',
        POST: URL + '/relationships',
        DELETE: URL + '/relationships'
    },
    twitters: {
        GET: URL + '/tweets',
        POST: URL + '/',
        DELETE: URL + '/',
        WS_ENDPOINT: WEB_SOCKET,
    }
};
