import React from "react";
import {Container} from "@material-ui/core";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import Twitters from "./components/Twitter";

export default function TwittersPage() {
    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Tweets</h1>
            <Twitters/>
        </Container>
    </Wrapper>;
}
