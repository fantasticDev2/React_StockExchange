import React, {useEffect, useReducer, useRef, useState} from "react";
import {reducer} from '../store/reducer';
import * as Actions from '../store/action';
import MaterialTable from "material-table";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {ADD_TWEET, initialState} from "../store/state";
import {Snackbar} from "@material-ui/core";
import io from 'socket.io-client';
import {Socket} from "socket.io";
import { Endpoints } from "../../../../shared/endpoints";
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//let io = require('socket.io-client/dist/socket.io.js');
//let io = require('socket.io-client/dist/socket.io.js');
export default function Twitters() {

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const socket:Socket = io(Endpoints.twitters.WS_ENDPOINT);
        Actions.connectTweets(dispatch, socket);
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        Actions.setUpdateAlertOpen(dispatch, false);
        Actions.setDeleteAlertOpen(dispatch, false);
    };

    return (
        <>
            <Snackbar open={state.updateAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Relationship updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.deleteAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Relationship deleted successfully!
                </Alert>
            </Snackbar>
            <MaterialTable
                title=""
                columns={[
                    {title: 'ID', field: 'id'},
                    {title: 'Created At', field: 'created_at'},
                    {title: 'INDUSTRY', field: 'industry'},
                    {title: 'INDUSTRY SIMILARITY', field: 'industry_similarity'},
                    {title: 'TAG', field: 'tag'},
                    {title: 'TEXT SIMILARITY', field: 'text_similarity'},
                    {title: 'TWEET TEXT', field: 'tweet_text'},
                ]}
                data={state.twitters}
                editable={{

                }}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        </>
    );
}
