import { ParameterValues } from "@exasol/extension-manager-interface";
import { Parameter, StringParameter } from "@exasol/extension-manager-interface/dist/parameters";

const SUCCESS_RESULT = { success: true, message: "" };

function validationError(errorMessage: string): ValidationResult {
    return { success: false, message: errorMessage }
}

export function validateParameter(definition: Parameter, value: string): ValidationResult {
    if (value === undefined || value === null || value === "") {
        if (definition.required) {
            return validationError("This is a required input.")
        } else {
            return SUCCESS_RESULT;
        }
    } else {
        switch (definition.type) {
            case "string":
                return validateStringParameter(definition, value);
            case "boolean":
                return validateBooleanParameter(value);
            default:
                return validationError("unsupported parameter type '" + definition.type + "'");
        }
    }
}

export function validateParameters(definitions: Parameter[], values: ParameterValues): ValidationResult {
    let findings: string[] = []
    for (const key in definitions) {
        let definition = definitions[key];
        let singleResult = validateParameter(definition, getValue(definition.id, values))
        if (!singleResult.success) {
            findings.push(definition.name + ": " + singleResult.message)
        }
    }
    if (findings.length == 0) {
        return SUCCESS_RESULT
    } else {
        return validationError(findings.join("\n"))
    }
}

function getValue(id: string, values: ParameterValues): string | undefined {
    const value = values.values.find(v => v.name === id);
    if (value) {
        return value.value
    } else {
        return undefined
    }
}

function validateStringParameter(definition: StringParameter, value: string) {
    if (definition.regex) {
        if (!new RegExp(definition.regex).test(value)) {
            return validationError("The value has an invalid format.")
        }
    }
    return SUCCESS_RESULT
}

function validateBooleanParameter(value:string){
    if(value === "true" || value==="false"){
        return SUCCESS_RESULT
    }
    return validationError("Boolean value must be 'true' or 'false'.")
}

export interface ValidationResult {
    /** true of the validation passed with no findings. */
    success: boolean
    /** Validation error description. If multiples errors were found they are separated by \n. */
    message: string
}
