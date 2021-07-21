import React from "react";
import {Container} from "@material-ui/core";
import ForceGraphExample from "./components/ForceGraphExample";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";


export default function GraphSchemaVisualizationPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Graph Schema Visualization</h1>
            <ForceGraphExample/>
        </Container>
    </Wrapper>;
}

