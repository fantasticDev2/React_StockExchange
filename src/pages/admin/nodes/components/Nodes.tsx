import React, {useEffect, useReducer} from "react";
import {reducer} from '../store/reducer';
import * as Actions from '../store/action';
import MaterialTable from "material-table";
import JSONInput from "react-json-editor-ajrm";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {initialState} from "../store/state/nodes.state";
import {Button, createStyles, makeStyles, Popover, Theme, Typography} from "@material-ui/core";
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

export default function Nodes() {

    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.loadNodes(dispatch);
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        Actions.setUpdateAlertOpen(dispatch, false);
        Actions.setDeleteAlertOpen(dispatch, false);
    };

    const handlePopOverClose = () => {
        Actions.setPopOverOpen(dispatch, false);
    };

    const handleShowProps = (event: React.MouseEvent<HTMLButtonElement>, content: object) => {
        Actions.setPopoverAnchor(dispatch, event.currentTarget);
        Actions.setPopoverContent(dispatch, content);
        Actions.setPopOverOpen(dispatch, true);
    };

    return (
        <>
            <Snackbar open={state.updateAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Node updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.deleteAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Node deleted successfully!
                </Alert>
            </Snackbar>
            <MaterialTable
                title=""
                columns={[
                    {title: 'ID', field: 'id'},
                    {title: 'Label', field: 'label'},
                    {
                        title: 'Props', field: 'props',
                        render: rowData => {
                            return <Button variant="contained" color="primary" onClick={(e) => handleShowProps(e, rowData)}>
                                Display Props
                            </Button>
                        }
                    },
                    {title: 'Created At', field: 'created_at'},
                    {title: 'Updated At', field: 'updated_at'}
                ]}
                data={state.nodes}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...state.nodes];
                                const index = oldData['tableData'].id;
                                dataUpdate[index] = newData
                                Actions.setNodes(dispatch, dataUpdate, Actions.UPDATE);
                                resolve(0);
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            // TODO Check flow
                            Actions.deleteNode(dispatch, oldData)
                            setTimeout(() => {
                                let dataDelete = [...state.nodes];
                                const index = oldData['tableData'].id;
                                dataDelete.splice(index, 1);
                                Actions.setNodes(dispatch, dataDelete, Actions.DELETE);
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
