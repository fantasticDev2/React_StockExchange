import React from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import AddDataSource from "./components/AddDataSource";


export default function AddDataSourceToGraphPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Create DataSource</h1>
            <AddDataSource/>
        </Container>
    </Wrapper>;
}
