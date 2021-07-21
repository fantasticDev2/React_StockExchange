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
import {initialRelationsState} from "../store/state";
import {IGraphRelationship} from "../../../../shared/models/graph-relationship.model";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
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

export default function DeleteRelations() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(relations_reducer, initialRelationsState);
    const [showAlert, setAlert] = useState(false);

    useEffect(() => {
        Actions.loadRelationsShips(dispatch);
    }, []);

    const handleRelationshipChange = (event: React.ChangeEvent<{ value: unknown }>, value: IGraphRelationship) => {
        Actions.setRelationship(dispatch, value);
    };
    const handleRelationshipClose = () => {
        Actions.setOpenRelationship(dispatch, false);
    };
    const handleRelationshipOpen = () => {
        Actions.setOpenRelationship(dispatch, true);
    };

    // Neo4j
    const onDeleteRelationshipGraph = useCallback(
        (graphRelationship: IGraphRelationship) => {
            axios
                .delete(Endpoints.neo4j.DELETE_RELATIONSHIP, {data: {id: graphRelationship.identity.low}})
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

    const deleteRelationToGraph = () => {
        if(state.relationship == null)
        {
            setAlert(true);
            return;
        }
        const graphRelationships: IGraphRelationship[] = state.relationships.filter(findRelationship => findRelationship.identity.low === state.relationship['low']);
        if (graphRelationships.length > 0) {
            onDeleteRelationshipGraph(graphRelationships[0]);
        }
        else
        {
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
            <Snackbar open={state.deleteSuccess} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Delete relation success!
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
                                        getOptionLabel={option => option != null ? option.type : ''}
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

                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={deleteRelationToGraph}>
                                    Delete Relation
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
