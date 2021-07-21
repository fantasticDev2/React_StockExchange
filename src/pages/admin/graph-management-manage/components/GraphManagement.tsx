import React, {useReducer} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Card, CardContent, Grid, Popover, Typography} from "@material-ui/core";
import {initialGraphManagementState} from "../store/state";
import {graphmanagement_reducer} from "../store/reducer";
import * as Actions from "../store/action";
import JSONInput from "react-json-editor-ajrm";
import save from 'save-file'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
        typography: {
            padding: theme.spacing(2),
            backgroundColor: '#bbc2ea'
        },
    }),
);

export default function GraphManagement() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(graphmanagement_reducer, initialGraphManagementState);

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let choosenFile = event.target.files[0];
        let fr = new FileReader();
        fr.addEventListener('load', (event) => {
            let content = event.target.result.toString();
            Actions.setImportContent(dispatch, JSON.parse(content));
        });
        fr.readAsText(choosenFile);
    }

    const handleImportPreview = (event: React.MouseEvent<HTMLButtonElement>) => {
        Actions.setImportPopoverAnchor(dispatch, event.currentTarget);
        Actions.setImportOpenPopover(dispatch, true);
    }

    const handleExportLoad = async (event: React.MouseEvent<HTMLButtonElement>) => {
        let content = {
            "states": [
                {
                    "state": "Arizona",
                    "electors": 11
                },
                {
                    "state": "Florida",
                    "electors": 29
                },
                {
                    "state": "Iowa",
                    "electors": 6
                },
                {
                    "state": "Michigan",
                    "electors": 16
                },
                {
                    "state": "North Carolina",
                    "electors": 15
                },
                {
                    "state": "Ohio",
                    "electors": 18
                },
                {
                    "state": "Pennsylvania",
                    "electors": 20
                },
                {
                    "state": "Wisconsin",
                    "electors": 10
                }
            ]
        };
        Actions.setExportContent(dispatch, content);
    }

    const handleExportPreview = (event: React.MouseEvent<HTMLButtonElement>) => {
        Actions.setExportPopoverAnchor(dispatch, event.currentTarget);
        Actions.setExportOpenPopover(dispatch, true);
    }

    const handleImportPopOverClose = () => {
        Actions.setImportOpenPopover(dispatch, false);
    };

    const handleExportPopOverClose = () => {
        Actions.setExportOpenPopover(dispatch, false);
    };

    const handleExport = async () => {
        await save(JSON.stringify(state.exportContent, undefined, 4), 'graph.json');
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Button variant="contained" color="primary">
                                Backup
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Button variant="contained" color="primary">
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <input
                                        accept=".json"
                                        className={classes.input}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={(e) => handleImport(e)}
                                    />
                                    <Button variant="contained" color="primary" component="span">
                                        Import
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" onClick={(e) => handleImportPreview(e)}>
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" onClick={(e) => handleExportLoad(e)}>
                                        Load
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" onClick={(e) => handleExportPreview(e)}>
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" onClick={handleExport}>
                                        Export
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Popover
                open={state.importOpenPopover}
                anchorEl={state.importPopoverAnchor}
                onClose={handleImportPopOverClose}
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
                        placeholder={state.importContent}
                        height="200px"
                    />
                </Typography>
            </Popover>
            <Popover
                open={state.exportOpenPopover}
                anchorEl={state.exportPopoverAnchor}
                onClose={handleExportPopOverClose}
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
                        placeholder={state.exportContent}
                        height="200px"
                    />
                </Typography>
            </Popover>
        </>
    );
}
