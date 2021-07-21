import React from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import Workspaces from "./components/Workspaces";

export default function WorkspacesPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Workspaces</h1>
            <Workspaces/>
        </Container>
    </Wrapper>;
}
