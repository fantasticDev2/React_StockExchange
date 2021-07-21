import React from "react";
import {Container} from "@material-ui/core";
import DeleteNodes from "./components/DeleteNodes";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";


export default function DeleteNodeFromGraphPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Delete Node From Graph</h1>
            <DeleteNodes/>
        </Container>
    </Wrapper>;
}
