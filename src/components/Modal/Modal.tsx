import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal} from "react-bootstrap";
import {makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    action_button: {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        width: theme.spacing(10)
    }
}));

function CustomModal(props) {
    const classes = useStyles();
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.content}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className={classes.action_button} onClick={props.onHide}>{props.action}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal
