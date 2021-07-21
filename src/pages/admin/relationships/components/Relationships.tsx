import React, {useEffect, useReducer} from "react";
import {reducer} from '../store/reducer';
import * as Actions from '../store/action';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {initialState} from "../store/state";
import {Button, createStyles, makeStyles, Popover, Theme, Typography} from "@material-ui/core";
import JSONInput from "react-json-editor-ajrm";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
            backgroundColor: '#bbc2ea'
        },
    }),
);

export default function Relationships() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.loadRelationships(dispatch);
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        Actions.setUpdateAlertOpen(dispatch, false);
        Actions.setDeleteAlertOpen(dispatch, false);
    };

    const handleShowProps = (event: React.MouseEvent<HTMLButtonElement>, content: object) => {
        Actions.setPopoverAnchor(dispatch, event.currentTarget);
        Actions.setPopoverContent(dispatch, content);
        Actions.setPopOverOpen(dispatch, true);
    };

    const handlePopOverClose = () => {
        Actions.setPopOverOpen(dispatch, false);
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
                    {title: 'Name', field: 'name'},
                    {title: 'Impact Score', field: 'impact_score'},
                    {
                        title: 'Meta Data', field: 'metadata',
                        render: rowData => {
                            return <Button variant="contained" color="primary" onClick={(e) => handleShowProps(e, rowData)}>
                                Display Meta Data
                            </Button>
                        }
                    },
                    {title: 'Created At', field: 'created_at'},
                    {title: 'Updated At', field: 'updated_at'}
                ]}
                data={state.relationships}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...state.relationships];
                                const index = oldData['tableData'].id;
                                dataUpdate[index] = newData
                                Actions.setRelationships(dispatch, dataUpdate, Actions.UPDATE);
                                resolve(0);
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                // TODO Check flow
                                Actions.deleteRelationship(dispatch, oldData)
                                let dataDelete = [...state.relationships];
                                const index = oldData['tableData'].id;
                                dataDelete.splice(index, 1);
                                Actions.setRelationships(dispatch, dataDelete, Actions.DELETE);
                                resolve(0);
                            }, 1000)
                        }),
                }}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <Popover
                open={state.openPopover}
                anchorEl={state.popoverAnchor}
                onClose={handlePopOverClose}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <JSONInput
                        id="props-content"
                        placeholder={state.popoverContent}
                        height="200px"
                    />
                </Typography>
            </Popover>
        </>
    );
}
