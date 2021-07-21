import React, {useCallback, useEffect, useReducer, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {relations_reducer} from '../store/reducer';
import * as Actions from '../store/action';
import {Endpoints} from "../../../../shared/endpoints";
import {IRelationship} from "../../../../shared/models/relationship.model";
import {ICreateRelationshipGraph} from "../../../../shared/models/create-relationship-graph.model";
import {initialRelationsState} from "../store/state";
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

export default function AddRelations() {
    const classes = useStyles();

    // Neo4j
    const onCreateRelationshipGraph = useCallback(
        (createRelationshipGraph: ICreateRelationshipGraph) => {
            axios
                .post(Endpoints.neo4j.POST_RELATIONSHIP, createRelationshipGraph)
                .then((response) => {
                    console.log(response.data);
                    Actions.showSuccessAlert(dispatch, true);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        []
    );

    const [state, dispatch] = useReducer(relations_reducer, initialRelationsState);
    const [showAlert, setAlert] = useState(false);
    useEffect(() => {
        Actions.loadRelationsShips(dispatch);
        Actions.loadNodeLabels1(dispatch);
        Actions.loadNodeLabels2(dispatch);
        Actions.loadNodes1(dispatch);
        Actions.loadNodes2(dispatch);
    }, []);

    const handleRelationshipChange = (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setRelationship(dispatch, value);
    };
    const handleRelationshipClose = () => {
        Actions.setOpenRelationship(dispatch, false);
    };
    const handleRelationshipOpen = () => {
        Actions.setOpenRelationship(dispatch, true);
    };

    const handleNodeLabel1Change = (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setNodeLabel1(dispatch, value)
        Actions.setNodes1(dispatch, value)
    };

    const handleNode1Change = (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setNode1(dispatch, value)
    };

    const handleNodeLabel1Close = () => {
        Actions.setOpenNodeLabel1(dispatch, false);
    };

    const handleNodeLabel1Open = () => {
        Actions.setOpenNodeLabel1(dispatch, true);
    };

    const handleNode1Close = () => {
        Actions.setOpenNode1(dispatch, false);
    };

    const handleNode1Open = () => {
        Actions.setOpenNode1(dispatch, true);
    };

    const handleNodeLabel2Change = (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setNodeLabel2(dispatch, value);
        Actions.setNodes2(dispatch, value);
    };

    const handleNode2Change = (event: React.ChangeEvent<{ value: unknown }>, value: string) => {
        Actions.setNode2(dispatch, value);
    };

    const handleNodeLabel2Close = () => {
        Actions.setOpenNodeLabel2(dispatch, false);
    };

    const handleNodeLabel2Open = () => {
        Actions.setOpenNodeLabel2(dispatch, true);
    };

    const handleNode2Close = () => {
        Actions.setOpenNode2(dispatch, false);
    };

    const handleNode2Open = () => {
        Actions.setOpenNode2(dispatch, true);
    };

    const addRelationToGraph = () => {
        if(state.relationship == "" || state.relationship == null)
        {
            setAlert(true);
            return;
        }
        const graphRelationships: IRelationship[] = state.relationships.filter(findRelationship => findRelationship.id === state.relationship['id']);
        if (graphRelationships.length > 0) {
            const createRelationshipGraph: ICreateRelationshipGraph = {
                relationship: graphRelationships[0],
                firstNodeId: state.node1['id'],
                secondNodeId: state.node2['id'],
            };

            onCreateRelationshipGraph(createRelationshipGraph);
        }
        else {
            setAlert(true);
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
                    You have to select a relationship!
                </Alert>
            </Snackbar>
            <Snackbar open={state.addSuccess} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Add relation success!
                </Alert>
            </Snackbar>
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.relationships}
                                        getOptionLabel={option => option.name}
                                        id="relationship-controlled-open-select"
                                        open={state.openRelationship}
                                        onClose={handleRelationshipClose}
                                        onOpen={handleRelationshipOpen}
                                        onChange={handleRelationshipChange}
                                        renderInput={(params) => <TextField {...params} label="Relationships"
                                                                            margin="normal"/>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.nodeLabels1}
                                        getOptionLabel={option => option}
                                        id="node-label1-controlled-open-select"
                                        open={state.openNodeLabel1}
                                        onClose={handleNodeLabel1Close}
                                        onOpen={handleNodeLabel1Open}
                                        onChange={handleNodeLabel1Change}
                                        renderInput={(params) => <TextField {...params} label="Nodes label"
                                                                            margin="normal"/>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.nodes1}
                                        getOptionLabel={option => option != null ? option.props.name : ''}
                                        id="node1-controlled-open-select"
                                        open={state.openNode1}
                                        onClose={handleNode1Close}
                                        onOpen={handleNode1Open}
                                        onChange={handleNode1Change}
                                        renderInput={(params) => <TextField {...params} label="Nodes" margin="normal"/>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.nodeLabels2}
                                        getOptionLabel={option => option}
                                        id="node-label2-controlled-open-select"
                                        open={state.openNodeLabel2}
                                        onClose={handleNodeLabel2Close}
                                        onOpen={handleNodeLabel2Open}
                                        onChange={handleNodeLabel2Change}
                                        renderInput={(params) => <TextField {...params} label="Nodes label"
                                                                            margin="normal"/>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        options={state.nodes2}
                                        getOptionLabel={option => option != null ? option.props.name : ''}
                                        id="node2-controlled-open-select"
                                        open={state.openNode2}
                                        onClose={handleNode2Close}
                                        onOpen={handleNode2Open}
                                        onChange={handleNode2Change}
                                        renderInput={(params) => <TextField {...params} label="Nodes label"
                                                                            margin="normal"/>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={addRelationToGraph}>
                                    Add Relation
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
