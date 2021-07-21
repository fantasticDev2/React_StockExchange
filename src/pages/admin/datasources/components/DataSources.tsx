import React, {useEffect, useReducer} from "react";
import {reducer} from '../store/reducer';
import * as Actions from '../store/action';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {initialState} from "../store/state/datasources.state";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DataSources() {

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.setDataSources(dispatch);
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
                    Workspace updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.deleteAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Workspace deleted successfully!
                </Alert>
            </Snackbar>
            <MaterialTable
                title=""
                columns={[
                    {title: 'ID', field: 'id'},
                    {title: 'NICK NAME', field: 'nickname'},
                    {title: 'CONNECTION METHOD', field: 'connectionMethod'},
                    {title: 'BEHIND FIREWALL', field: 'behindFirewall'},
                    {title: 'DATABASE HOST', field: 'databaseHost'},
                    {title: 'DATABASE PORT', field: 'databasePort'},
                    {title: 'USER NAME', field: 'username'},
                    {title: 'PASSWORD', field: 'password'},
                    {title: 'VERSION', field: 'version'},
                    {title: 'WORKSPACE ID', field: 'workspaceId'},
                ]}
                data={state.datasources}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        </>
    );
}
