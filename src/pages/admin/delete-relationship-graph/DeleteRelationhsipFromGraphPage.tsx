import React from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import DeleteRelations from "./components/DeleteRelations";


export default function DeleteRelationshipFromGraphPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Delete Relationship From Graph</h1>
            <DeleteRelations/>
        </Container>
    </Wrapper>;
}
