import React from "react";
import {Container} from "@material-ui/core";
import NodesRelationshipsForms from "./components/NodesRelationshipsForms";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";

export default function NodesRelationshipsManagement() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Nodes & Relationships Management</h1>
            <NodesRelationshipsForms/>
        </Container>
    </Wrapper>;
}
