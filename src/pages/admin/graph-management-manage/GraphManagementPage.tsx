import React, {useState} from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import GraphManagement from "./components/GraphManagement";

export default function GraphManagementPage() {

    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Graph Backup, Delete, Export & Import Link</h1>
            <GraphManagement/>
        </Container>
    </Wrapper>;
}
