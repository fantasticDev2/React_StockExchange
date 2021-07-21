import React, {useEffect, useReducer} from "react";
import {reducer} from '../../store/reducer';
import * as Actions from '../../store/action';
import MaterialTable from "material-table";
import JSONInput from "react-json-editor-ajrm";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {initialState} from "../../store/state";
import {Button, createStyles, makeStyles, Popover, TextField, Theme, Typography} from "@material-ui/core";
import {TextInputComponent} from "react-native";

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

export default function Definitions() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.loadDefinitions(dispatch);
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        Actions.setAddAlertOpen(dispatch, false);
        Actions.setUpdateAlertOpen(dispatch, false);
        Actions.setDeleteAlertOpen(dispatch, false);
    };

    const handlePopOverClose = () => {
        Actions.setPopOverOpen(dispatch, false);
        Actions.setDefinitionEditorOpen(dispatch, false);
    };

    const handleShowProps = (event: React.MouseEvent<HTMLButtonElement>, content: object) => {
        Actions.setPopoverAnchor(dispatch, event.currentTarget);
        Actions.setPopoverContent(dispatch, content);
        Actions.setPopOverOpen(dispatch, true);
    };

    const handleDefinitionEditShowProps = (event: React.MouseEvent<HTMLDivElement>, content: object) => {
        Actions.setDefinitionEditorAnchor(dispatch, event.currentTarget);
        Actions.setDefinitionTemp(dispatch, content);
        Actions.setDefinitionEditorOpen(dispatch, true);
    };

    const handleDefinitionEditContent = (event: React.ChangeEvent<HTMLDivElement>) => {
        Actions.setDefinitionTemp(dispatch, event['jsObject']);
    }

    return (
        <>
            <Snackbar open={state.addAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Definition added successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.updateAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Definition updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.deleteAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Definition deleted successfully!
                </Alert>
            </Snackbar>
            <MaterialTable
                title=""
                columns={[
                    {
                        title: 'ID', field: 'id',
                    },
                    {
                        title: 'Type', field: 'type',
                    },
                    {
                        title: 'Entity', field: 'entity',
                    },
                    {
                        title: 'Definition', field: 'definition_json',
                        render: rowData => {
                            return <Button variant="contained" color="primary" onClick={(e) => handleShowProps(e, rowData)}>
                                Display Definition
                            </Button>
                        },
                        editComponent: props => (
                            <TextField
                                type="text"
                                value={state.definitionTemp != null ? JSON.stringify(state.definitionTemp) : ''}
                                placeholder='Definition'
                                onClick={(e) => handleDefinitionEditShowProps(e, state.definitionTemp)}
                            />
                        )
                    },
                    {
                        title: 'Created At', field: 'created_at',
                        cellStyle: {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    },
                    {
                        title: 'Updated At', field: 'updated_at',
                    },
                ]}
                data={state.definitions}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                // TODO check flow
                                Actions.addDefinition(dispatch, newData);
                                let dataAdd = [...state.definitions, newData];
                                Actions.setDefinitions(dispatch, dataAdd, Actions.ADD);
                                resolve(0);
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...state.definitions];
                                const index = oldData['tableData'].id;
                                dataUpdate[index] = newData
                                Actions.setDefinitions(dispatch, dataUpdate, Actions.UPDATE);
                                resolve(0);
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                // TODO Check flow
                                Actions.deleteDefinition(dispatch, oldData)
                                let dataDelete = [...state.definitions];
                                const index = oldData['tableData'].id;
                                dataDelete.splice(index, 1);
                                Actions.setDefinitions(dispatch, dataDelete, Actions.DELETE);
                                resolve(0);
                            }, 1000)
                        }),
                }}
                options={{
                    actionsColumnIndex: -1,
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

            <Popover
                open={state.definitionEditorPopover}
                anchorEl={state.definitionEditorPopoverAnchor}
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
                        placeholder={state.definitionTemp}
                        height="200px"
                        onBlur={handleDefinitionEditContent}
                    />
                </Typography>
            </Popover>
        </>
    );
}
