import React from "react";
import {Container} from "@material-ui/core";
import ForceGraphExample from "./components/ForceGraphExample";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";


export default function GraphOverviewPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Graph Overview</h1>
            <ForceGraphExample/>
        </Container>
    </Wrapper>;
}

