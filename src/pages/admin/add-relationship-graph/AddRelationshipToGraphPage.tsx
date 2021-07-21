import React from "react";
import {Container} from "@material-ui/core";
import AddRelations from "./components/AddRelations";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";


export default function AddRelationshipToGraphPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Add Relationship To Graph</h1>
            <AddRelations/>
        </Container>
    </Wrapper>;
}
