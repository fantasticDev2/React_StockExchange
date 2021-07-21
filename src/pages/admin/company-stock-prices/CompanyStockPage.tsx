import React from "react";
import {Container} from "@material-ui/core";
import CompanyStockPrices from "./components/CompanyStockPrices";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";

export default function CompanyStockPricesPage() {
    return (
        <Wrapper>
            <Container maxWidth="xl">
                <h1>Company Stock Prices</h1>
                <CompanyStockPrices/>
            </Container>
        </Wrapper>
    );
}
