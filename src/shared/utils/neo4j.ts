import * as neo4j from "neo4j-driver";

const NEO4J_URI = "bolt://schnetwork.go.ro:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "test12345";


export default function createNeo4jDriver() {
    const driver = neo4j.driver(
        process.env.NEO4J_URI || NEO4J_URI,
        neo4j.auth.basic(
            process.env.NEO4J_USER || NEO4J_USER,
            process.env.NEO4J_PASSWORD || NEO4J_PASSWORD
        ), {
            encrypted: process.env.NEO4J_ENCRYPTED ? "ENCRYPTION_ON" : "ENCRYPTION_OFF"
        }
    );

    return driver;
}



