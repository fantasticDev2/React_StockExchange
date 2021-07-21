import React from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import AddWorkspace from "./components/AddWorkspace";


export default function AddWorkspaceToGraphPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Create Workspace</h1>
            <AddWorkspace/>
        </Container>
    </Wrapper>;
}
