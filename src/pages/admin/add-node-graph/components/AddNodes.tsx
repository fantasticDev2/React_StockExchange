import React, {useEffect, useReducer, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {INode} from "../../../../shared/models/node.model";
import Grid from '@material-ui/core/Grid';

import * as Actions from '../store/action';
import {nodes_reducer} from "../store/reducer";
import {initialNodesState} from "../store/state";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {AlertProps} from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert/Alert";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
    }),
);


export default function AddNodes() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(nodes_reducer, initialNodesState);
    const [showAlert, setAlert] = useState(false);
    useEffect(() => {
        Actions.loadNodeLabels(dispatch);
        Actions.loadNodes(dispatch);
    }, []);

    const handleNodeLabelChange = async (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setNodeLabel(dispatch, value)
        Actions.nodeLabelChange(dispatch, value);
    };

    const handleNodeChange = (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setNode(dispatch, value);
    };

    const handleNodeLabelClose = () => {
        Actions.setOpenNodeLabel(dispatch, false);
    };

    const handleNodeLabelOpen = () => {
        Actions.setOpenNodeLabel(dispatch, true);
    };

    const handleNodeClose = () => {
        Actions.setOpenNode(dispatch, false);
    };

    const handleNodeOpen = () => {
        Actions.setOpenNode(dispatch, true);
    };

    const addNodeToGraph = () => {
        const graphNodes: INode[] = state.nodes.filter(findNode => findNode.id === state.node['id']);
        if(state.node == "")
        {
            setAlert(true);
            return;
        }
        if (graphNodes.length > 0) {
            Actions.CreateNewNodeGraph(dispatch, graphNodes[0]);
        }
        else
        {
            setAlert(true);
            return;
        }
    };

    const handleClose = () => {
        setAlert(false);
        Actions.showSuccessAlert(dispatch, false);
    }

    return (
        <>
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="warning">
                    You have to select a node!
                </Alert>
            </Snackbar>
            <Snackbar open={state.addSuccess} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Add node success!
                </Alert>
            </Snackbar>
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.nodeLabels}
                                        getOptionLabel={option => option}
                                        id="node-label-controlled-open-select"
                                        onClose={handleNodeLabelClose}
                                        onOpen={handleNodeLabelOpen}
                                        onChange={handleNodeLabelChange}
                                        renderInput={(params) => <TextField {...params} label="Node Labels" margin="normal" />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.nodes}
                                        getOptionLabel={option => option != null ? option.props.name : ''}
                                        id="node-controlled-open-select"
                                        open={state.openNode}
                                        onClose={handleNodeClose}
                                        onOpen={handleNodeOpen}
                                        onChange={handleNodeChange}
                                        renderInput={(params) => <TextField {...params} label="Nodes" margin="normal" />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={addNodeToGraph}>
                                    Add Node
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
