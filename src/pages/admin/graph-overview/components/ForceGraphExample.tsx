import {Container} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import ForceGraph, {GraphData, NodeObject} from "react-force-graph-2d";
import createNeo4jDriver from "../../../../shared/utils/neo4j";

export default function ForceGraphExample() {
    const getNodesQuery = `MATCH (n) RETURN n.id as id`;
    const getNodesWithLinkQuery = `MATCH (n)-[r]->(m) RETURN n as source, r as rel, m as target`;

    const [graphData, setGraphData] = useState<GraphData>({
        nodes: [],
        links: []
    });
    const loadGraphData = useCallback(async () => {
        const driver = createNeo4jDriver();
        let session = driver.session({database: 'neo4j'});
        let getNodes = await session.run(getNodesQuery);
        let getNodesWithLink = await session.run(getNodesWithLinkQuery);
        session.close().then(r => console.log("closed"));

        const nodes: NodeObject[] = getNodes.records.map(record => {
            return {id: record.get("id")}
        });

        let links = getNodesWithLink.records.filter(record => record.get("source") && record.get("target")).map(record => {
            let source = record.get("source");
            let target = record.get("target");
            return {source: source.properties.id, target: target.properties.id};
        });

        const graphData: GraphData = {
            nodes,
            links
        };

        setGraphData(graphData)
    }, []);

    useEffect(() => {
        loadGraphData();
    }, [loadGraphData]);

    return <Container maxWidth="xl">
        <ForceGraph graphData={graphData}></ForceGraph>
    </Container>;
}
