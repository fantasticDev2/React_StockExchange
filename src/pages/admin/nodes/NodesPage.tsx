import React from "react";
import {Container} from "@material-ui/core";
import Nodes from "./components/Nodes";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";

export default function NodesPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Nodes</h1>
            <Nodes/>
        </Container>
    </Wrapper>;
}
