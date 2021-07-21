import React, {useEffect, useReducer, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {INode} from "../../../../shared/models/node.model";
import Grid from '@material-ui/core/Grid';
import * as Actions from '../store/action';
import {nodes_reducer} from "../store/reducer";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {AlertProps} from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert/Alert";
import Typography from "@material-ui/core/Typography/Typography";
import {Switch} from "@material-ui/core";
import {initialWorkspaceState} from "../store/state";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        formTitle: {
            margin: theme.spacing(1)
        },
        formControl: {
            minWidth: 200,
            width: '100%'
        },
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        error: {
            textColor: '#FF0000'
        }
    }),
);


export default function AddWorkspace() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(nodes_reducer, initialWorkspaceState);

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setName(dispatch, event.target.value);
        };

    const handleKeyChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setKey(dispatch, event.target.value);
        };

    const handleAttachmentIdChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            let value: string = event.target.value;
            const re = /^[0-9\b]+$/;
            if(value.length > 0 && re.test(value)) {
                let id: number = +value;
                Actions.setAttachmentId(dispatch, id)
                Actions.setAttachmentIdError(dispatch, false);
            }
            else if(value == "")
            {
                Actions.setAttachmentId(dispatch, null);
                Actions.setAttachmentIdError(dispatch, false);
            }
            else
            {
                Actions.setAttachmentIdError(dispatch, true);
            }
        };

    const handleDataSourceChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setDataSource(dispatch, event.target.value);
        };

    const handleActive: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setActive(dispatch, event.target.checked);
        };

    const createWorkspace = async () => {
        Actions.createWorkspace(dispatch, state);
    }

    const handleClose = () => {
        Actions.setSuccess(dispatch, false);
        Actions.setFailed(dispatch, false);
    }

    return (
        <>
            <Snackbar open={state.addFailed} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="warning">
                    Creating Workspace Failed!
                </Alert>
            </Snackbar>
            <Snackbar open={state.addSuccess} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Workspace created successfully!
                </Alert>
            </Snackbar>
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-name"
                                    className={classes.formControl}
                                    value={state.name}
                                    onChange={handleNameChange}
                                    label="Name" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Key:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-key"
                                    className={classes.formControl}
                                    label="Key"
                                    value={state.key}
                                    onChange={handleKeyChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Attachment ID:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-attachment-id"
                                    className={classes.formControl}
                                    label="Attachment ID"
                                    value={state.attachmentId}
                                    error={state.attachmentIdError}
                                    helperText={state.attachmentIdError ? "This field should be numerical value." : ''}
                                    onChange={handleAttachmentIdChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Data Source:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-data-source"
                                    className={classes.formControl}
                                    label="Data Source"
                                    value={state.dataSource}
                                    onChange={handleDataSourceChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Active:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Switch
                                    checked={state.active}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    onChange={handleActive}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={createWorkspace}>
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
