import React, {useEffect, useReducer, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../store/action';
import {nodes_reducer} from "../store/reducer";
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {AlertProps} from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert/Alert";
import Typography from "@material-ui/core/Typography/Typography";
import {Switch} from "@material-ui/core";
import {initialDataSourceState} from "../store/state";

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


export default function AddDataSource() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(nodes_reducer, initialDataSourceState);

    const handleNickChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setNickName(dispatch, event.target.value);
        };

    const handleConnectionMethodChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setConnectionMethod(dispatch, event.target.value);
        };

    const handleDatabaseHostChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setDatabaseHost(dispatch, event.target.value);
        };

    const handleDatabasePortChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            let value: string = event.target.value;
            const re = /^[0-9\b]+$/;
            if(value.length > 0 && re.test(value)) {
                let port: number = +value;
                Actions.setDatabasePort(dispatch, port)
                Actions.setDatabasePortError(dispatch, false);
            }
            else if(value == "")
            {
                Actions.setDatabasePort(dispatch, null);
                Actions.setDatabasePortError(dispatch, false);
            }
            else
            {
                Actions.setDatabasePortError(dispatch, true);
            }
        };

    const handleActive: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setBehindFirewall(dispatch, event.target.checked);
        };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setUsername(dispatch, event.target.value);
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setPassword(dispatch, event.target.value);
        };

    const handleVersionChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions.setVersion(dispatch, event.target.value);
        };

    const handleWorkspaceChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            let value: string = event.target.value;
            const re = /^[0-9\b]+$/;
            if(value.length > 0 && re.test(value)) {
                let id: number = +value;
                Actions.setWorkspaceId(dispatch, id)
                Actions.setWorkspaceIdError(dispatch, false);
            }
            else if(value == "")
            {
                Actions.setWorkspaceId(dispatch, null);
                Actions.setWorkspaceIdError(dispatch, false);
            }
            else
            {
                Actions.setWorkspaceIdError(dispatch, true);
            }
        };

    const createWorkspace = async () => {
        Actions.createDataSource(dispatch, state);
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
                    Creating DataSource Failed!
                </Alert>
            </Snackbar>
            <Snackbar open={state.addSuccess} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    DataSource created successfully!
                </Alert>
            </Snackbar>
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Nickname:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-nickname"
                                    className={classes.formControl}
                                    value={state.nickname}
                                    onChange={handleNickChange}
                                    label="Nickname" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Connection Method:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-connection-method"
                                    className={classes.formControl}
                                    label="Connection Method"
                                    value={state.connectionMethod}
                                    onChange={handleConnectionMethodChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Behind Firewall:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Switch
                                    checked={state.behindFirewall}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    onChange={handleActive}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Database Host:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-database-host"
                                    className={classes.formControl}
                                    label="Database Host"
                                    value={state.databaseHost}
                                    onChange={handleDatabaseHostChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Database Port:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-database-port"
                                    className={classes.formControl}
                                    label="Database Port"
                                    value={state.databasePort}
                                    error={state.databasePortError}
                                    helperText={state.databasePortError ? "This field should be numerical value." : ''}
                                    onChange={handleDatabasePortChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Username:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-username"
                                    className={classes.formControl}
                                    label="Username"
                                    value={state.username}
                                    onChange={handleUsernameChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Password:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-password"
                                    className={classes.formControl}
                                    label="Password"
                                    value={state.password}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Version:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-version"
                                    className={classes.formControl}
                                    label="Version"
                                    value={state.version}
                                    onChange={handleVersionChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
                            <Grid item xs={12} sm={2}>
                                <Typography gutterBottom className={classes.formTitle} component="div">Workspace:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="input-workspace"
                                    className={classes.formControl}
                                    label="Workspace Id"
                                    value={state.workspaceId}
                                    error={state.workspaceIdError}
                                    helperText={state.workspaceIdError ? "This field should be numerical value." : ''}
                                    onChange={handleWorkspaceChange}
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
