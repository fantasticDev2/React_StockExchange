import React from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import DataSources from "./components/DataSources";

export default function DataSourcesPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Workspaces</h1>
            <DataSources/>
        </Container>
    </Wrapper>;
}
