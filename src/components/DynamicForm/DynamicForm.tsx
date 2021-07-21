import React from "react";
import PropTypes from "prop-types";
import {Formik} from "formik";
import * as yup from "yup";
import styled from "styled-components";
import Fields from "./Field";
import {createYupSchema} from "./yup-schema-creator";
import {FIELD_TYPES, VALIDATION_TYPES} from "./constants";

const Button = styled.button`
  padding: 4px;
  width: 190px;
`;

function DynamicForm(props: any) {
    const {fields, cbSubmit} = props;
    const initialValues: any = {};

    fields.forEach((item: { id: string | number; value: string; }) => {
        initialValues[item.id] = item.value || "";
    });

    const yupSchema = fields.reduce(createYupSchema, {});

    const validateSchema = yup.object().shape(yupSchema);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={cbSubmit}
        >
            {formikProps => (
                <form onSubmit={formikProps.handleSubmit}>
                    <Fields fields={fields} formikProps={formikProps}/>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
}

DynamicForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string,
            placeholder: PropTypes.string,
            type: PropTypes.oneOf(FIELD_TYPES).isRequired,
            validationType: PropTypes.oneOf(VALIDATION_TYPES).isRequired,
            value: PropTypes.any,
            options: PropTypes.array,
            validations: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    params: PropTypes.array.isRequired
                })
            )
        })
    ).isRequired,
    cbSubmit: PropTypes.func.isRequired
};

export default DynamicForm;
