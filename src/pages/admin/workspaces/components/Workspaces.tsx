import React, {useEffect, useReducer} from "react";
import {reducer} from '../store/reducer';
import * as Actions from '../store/action';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {initialState} from "../store/state/workspaces.state";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Workspaces() {

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.setWorkspaces(dispatch);
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
                    {title: 'NAME', field: 'name'},
                    {title: 'KEY', field: 'key'},
                    {title: 'ACTIVE', field: 'isActive'},
                    {title: 'ATTACHMENT ID', field: 'attachmentId'},
                    {title: 'Created At', field: 'createdDate'},
                    {title: 'Updated At', field: 'updatedDate'}
                ]}
                data={state.workspaces}
                /*editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...state.workspaces];
                                const index = oldData['tableData'].id;
                                dataUpdate[index] = newData
                                Actions.setWorkspaces(dispatch, dataUpdate, Actions.UPDATE);
                                resolve(0);
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            // TODO Check flow
                            Actions.deleteWorkspace(dispatch, oldData)
                            setTimeout(() => {
                                let dataDelete = [...state.nodes];
                                const index = oldData['tableData'].id;
                                dataDelete.splice(index, 1);
                                Actions.setWorkspaces(dispatch, dataDelete, Actions.DELETE);
                                resolve(0);
                            }, 1000)
                        }),
                }}*/
                options={{
                    actionsColumnIndex: -1
                }}
            />
        </>
    );
}
