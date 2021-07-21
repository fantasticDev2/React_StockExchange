import React, {useCallback, useEffect, useReducer} from "react";
import DynamicForm from "../../../../components/DynamicForm/DynamicForm";
import {Container, ErrMessage, FormWrapper, JsonWrapper, Textarea, Wrapper} from "./NodeRelationshipsFormsStyle";
import {IDefinition} from "../../../../shared/models/definition.model";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {initialState, reducer} from '../store/reducer';
import * as Actions from '../store/action';
import {ICreateNode} from "../../../../shared/models/create-node.model";
import {ICreateRelationship} from "../../../../shared/models/create-relationship.model";

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

export default function NodesRelationshipsForms() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        Actions.loadDefinitions(dispatch, "Node");
        Actions.loadTypes(dispatch);
    }, []);

    const isJSON = (str: any) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    const handleInputChange = (e: any) => {
        if (!isJSON(e.target.value)) {
            Actions.setJsonData(dispatch, e.target.value);
            Actions.setErrorData(dispatch, true);
        } else {
            let value = JSON.parse(e.target.value);
            Actions.setJsonData(dispatch, value);
            Actions.setValidJsonData(dispatch, value);
            Actions.setErrorData(dispatch, false);
        }
    };

    const handleSubmission = (val: any) => {
        if (state.selectedType === "Node") {
            const createNode: ICreateNode = {
                label: state.selectedDefinition.entity,
                props: val
            };
            onCreateNewNode(createNode)
        } else {
            const createRelationship: ICreateRelationship = {
                "name": state.selectedDefinition.entity,
                "impact_score": "N/A",
                "metadata": JSON.stringify(state.selectedDefinition)
            };
            onCreateNewRelationship(createRelationship)
        }
    };

    // Definition
    const handleDefinitionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        Actions.setDefinition(dispatch, event.target.value as string);

        const defs: IDefinition[] = state.definitions.filter(definition => definition.id === event.target.value);
        if (defs.length > 0) {
            let value = JSON.parse(defs[0].definition_json);
            Actions.setJsonData(dispatch, value);
            Actions.setValidJsonData(dispatch, value);
            Actions.setSelectedDefinition(dispatch, defs[0]);
        }
    };
    const handleDefinitionClose = () => {
        Actions.setOpenDefinition(dispatch, false);
    };
    const handleDefinitionOpen = () => {
        Actions.setOpenDefinition(dispatch, true);
    };

    // Types
    const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        Actions.setType(dispatch, event.target.value as string);
        Actions.loadDefinitions(dispatch, event.target.value as string);
    };
    const handleTypeClose = () => {
        Actions.setOpenType(dispatch, false);
    };
    const handleTypeOpen = () => {
        Actions.setOpenType(dispatch, true);
    };


    // Neo4j
    const onCreateNewNode = useCallback(
        (createNode: ICreateNode) => {
            Actions.createNode(dispatch, createNode);
        },
        []
    );

    const onCreateNewRelationship = useCallback(
        (createRelationship: ICreateRelationship) => {
            Actions.createRelationship(dispatch, createRelationship);
        },
        []
    );

    return (
        <Container>
            <Wrapper>
                <FormControl className={classes.formControl}>
                    <InputLabel id="type-controlled-open-select-label">Types</InputLabel>
                    <Select
                        labelId="type-controlled-open-select-label"
                        id="type-controlled-open-select"
                        open={state.openType}
                        onClose={handleTypeClose}
                        onOpen={handleTypeOpen}
                        value={state.type}
                        onChange={handleTypeChange}
                    >
                        {state.types.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="definition-controlled-open-select-label">Entities</InputLabel>
                    <Select
                        labelId="definition-controlled-open-select-label"
                        id="definition-controlled-open-select"
                        open={state.openDefinition}
                        onClose={handleDefinitionClose}
                        onOpen={handleDefinitionOpen}
                        value={state.definition}
                        onChange={handleDefinitionChange}
                    >
                        {state.definitions.map((definition) => (
                            <MenuItem key={definition.id} value={definition.id}>{definition.entity}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <JsonWrapper>
                    <h2>JSON Data</h2>
                    <Textarea
                        name="json-input"
                        value={
                            isJSON(state.jsonData) || typeof state.jsonData === "object"
                                ? JSON.stringify(state.jsonData, null, 4)
                                : state.jsonData
                        }
                        onChange={handleInputChange}
                    />
                    {state.errorData && (
                        <ErrMessage>The data you entered is not a VALID json</ErrMessage>
                    )}
                </JsonWrapper>
                <FormWrapper>
                    <h2>Selected Entity: {state.selectedDefinition.entity} with Id: {state.selectedDefinition.id}</h2>
                    <DynamicForm fields={state.validJsonData} cbSubmit={handleSubmission}/>
                </FormWrapper>
            </Wrapper>
        </Container>
    );
}

