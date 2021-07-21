import * as yup from "yup";

interface SchemaType {
    [index: number]: string;
}

interface ValidationType {
    params: string[];
    type: string;
}

interface ConfigType {
    id: number;
    validationType: string;
    validations: ValidationType[];
}


export function createYupSchema(schema: SchemaType, config: ConfigType) {
    const {id, validationType, validations = []} = config;
    // @ts-ignore
    if (!yup[validationType]) {
        return schema;
    }
    // @ts-ignore
    let validator = yup[validationType]();
    validations.forEach((validation: any) => {
        const {params, type} = validation;
        if (!validator[type] || !params) {
            return;
        }
        validator = validator[type](...params);
    });
    schema[id] = validator;
    return schema;
}
