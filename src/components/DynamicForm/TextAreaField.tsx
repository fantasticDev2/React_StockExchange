import React from "react";
import PropTypes from "prop-types";
import {FieldContainer, TextArea} from "./FieldStyles";

function TextAreaField(props: any) {
    return (
        <FieldContainer>
            <div className="label">{props.label}</div>
            <TextArea
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onBlur={props.handleBlur}
                onChange={props.onChange}
            />
            {props.error && props.touched[props.name] && (
                <div className="error">{props.error}</div>
            )}
        </FieldContainer>
    );
}

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};

TextAreaField.defaultProps = {
    label: "",
    name: "",
    placeholder: "",
    value: "",
    error: "",
    onChange: () => {
    },
};

export default TextAreaField;
