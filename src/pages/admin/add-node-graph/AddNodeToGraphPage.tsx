import React from "react";
import {Container} from "@material-ui/core";
import AddNodes from "./components/AddNodes";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";


export default function AddNodeToGraphPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Add Node To Graph</h1>
            <AddNodes/>
        </Container>
    </Wrapper>;
}
