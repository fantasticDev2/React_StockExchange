import React, {useState} from "react";
import {Container} from "@material-ui/core";
import Definitions from "./components/Definitions/Definitions";
import DefinitionDialog from "./components/DefinitionDialog/DefinitionDialog";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";

export default function DefinitionsPage() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <Wrapper>
        <Container maxWidth="xl">
            <h1>Definitions for Nodes & Relationships</h1>
            <Definitions/>
            <DefinitionDialog open={open} onClose={() => handleClose()}/>
        </Container>
    </Wrapper>;
}
