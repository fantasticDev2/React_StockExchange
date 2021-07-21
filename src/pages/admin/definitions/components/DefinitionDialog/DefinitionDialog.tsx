import React, {useCallback, useReducer} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {reducer} from '../../store/reducer';
import * as Actions from '../../store/action';
import {initialState} from "../../store/state";

export interface IDefinitionDialogProps {
    open: boolean,
    onClose: () => void,
}

export default function DefinitionDialog(props: IDefinitionDialogProps) {
    const {open, onClose} = props;

    // const [open, setOpen] = React.useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    //   };
    const [state, dispatch] = useReducer(reducer, initialState);
    const onAddDefinition = useCallback(
        (formDataDefinition?) => {
            const mockFormDataDefinition = {
                "type": "Node",
                "entity": "Person33",
                "definition_json": "[{\"id\":\"current_job\",\"label\":\"Current job\",\"placeholder\":\"current_job\",\"type\":\"text\",\"validationType\":\"string\",\"value\":\"\",\"validations\":[]},{\"id\":\"gender\",\"label\":\"Gender\",\"placeholder\":\"gender\",\"type\":\"text\",\"validationType\":\"string\",\"value\":\"\",\"validations\":[]},{\"id\":\"jobs\",\"label\":\"Jobs\",\"placeholder\":\"jobs\",\"type\":\"text\",\"validationType\":\"string\",\"value\":\"\",\"validations\":[]},{\"id\":\"linkedin\",\"label\":\"Linkedin\",\"placeholder\":\"linkedin\",\"type\":\"boolean\",\"validationType\":\"boolean\",\"value\":\"\",\"validations\":[]},{\"id\":\"location\",\"label\":\"Location\",\"placeholder\":\"location\",\"type\":\"text\",\"validationType\":\"string\",\"value\":\"\",\"validations\":[]},{\"id\":\"name\",\"label\":\"Name\",\"placeholder\":\"name\",\"type\":\"text\",\"validationType\":\"string\",\"value\":\"\",\"validations\":[]},{\"id\":\"twitter\",\"label\":\"Twitter\",\"placeholder\":\"twitter\",\"type\":\"text\",\"validationType\":\"string\",\"value\":\"\",\"validations\":[]}]"
            };

            Actions.addDefinition(dispatch, mockFormDataDefinition);
            onClose()
        },
        []
    );

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Definition</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add new entity definition.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onAddDefinition} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
