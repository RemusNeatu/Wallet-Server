import Ajv from "ajv";

export const requestValidator = (schema: object, data: object): boolean => {
    const ajv = new Ajv();

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        return false;
    }

    return true;
};
