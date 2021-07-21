export interface IGraphDataSource {
    "id": number,
    "nickname": string,
    "connectionMethod": string,
    "behindFirewall": boolean,
    "databaseHost": string,
    "databasePort": number,
    "username": string,
    "password": string,
    "version": string,
    "workspaceId": number
}
