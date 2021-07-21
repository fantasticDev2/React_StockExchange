import React from "react";
import {Container} from "@material-ui/core";
import Relationships from "./components/Relationships";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";

export default function RelationshipsPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Relationships</h1>
            <Relationships/>
        </Container>
    </Wrapper>;
}
