import React, {useEffect, useReducer} from "react";
import Wrapper from "../../../layout/main/components/Wrapper/Wrapper";
import Grid from "@material-ui/core/Grid";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import NoteIcon from '@material-ui/icons/Note';
import StatCard from "../../../components/Cards/StatCard";
import {reducer} from "./store/reducer";
import * as Actions from './store/action';
import {initialState} from "./store/state";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            textColor: '#FFFFFF'
        }
    }),
);


export default function InformationPage() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.getCompanyStockPrices(dispatch);
        Actions.getDefinitions(dispatch);
        Actions.getNodes(dispatch);
        Actions.getRelationships(dispatch);
    }, []);

    return (
        <Wrapper>
            <h1>
                Information
            </h1>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Company Stock Prices"
                        value={state.companyStockPrices}
                        icon={<TrendingUpIcon/>}
                        color="#ffd740"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Definitions"
                        value={state.definitions}
                        icon={<LocalOfferIcon/>}
                        color="#3f51b5"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Nodes"
                        value={state.nodes}
                        icon={<NoteIcon/>}
                        color="#9c27b0"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Relationships"
                        value={state.relationships}
                        icon={<ShuffleIcon/>}
                        color="#f44336"
                    />
                </Grid>

            </Grid>
        </Wrapper>
    );
}
