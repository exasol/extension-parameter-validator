import { ParameterValues } from "@exasol/extension-manager-interface";
import { Parameter, SelectParameter, StringParameter } from "@exasol/extension-manager-interface/dist/parameters";

const SUCCESS_RESULT: ValidationResultSuccess = { success: true };

function validationError(errorMessage: string): ValidationResultFailure {
    return { success: false, message: errorMessage }
}

export function validateParameter(definition: Parameter, value: string | undefined): ValidationResult {
    if (value === undefined || value === null || value === "") {
        if (definition.required) {
            return validationError("This is a required parameter.")
        } else {
            return SUCCESS_RESULT;
        }
    } else {
        const definitionType = definition.type
        switch (definition.type) {
            case "string":
                return validateStringParameter(definition, value);
            case "boolean":
                return validateBooleanParameter(value);
            case "select":
                return validateSelectParameter(definition, value)
            default:
                return validationError(`unsupported parameter type '${definitionType}'`);
        }
    }
}

export function validateParameters(definitions: Parameter[], values: ParameterValues): ValidationResult {
    const findings: string[] = []
    for (const definition of definitions) {
        const singleResult = validateParameter(definition, getValue(definition.id, values))
        if (singleResult.success === false) {
            findings.push(`${definition.name}: ${singleResult.message}`)
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

function validateSelectParameter(definition: SelectParameter, value: string) {
    const possibleValues = definition.options.map(option => option.id)
    if (possibleValues.length === 0) {
        return validationError("No option available for this parameter.")
    }
    if (possibleValues.includes(value)) {
        return SUCCESS_RESULT
    }
    const quotedValues = possibleValues.map(value => `'${value}'`).join(', ')
    return validationError(`The value is not allowed. Possible values are ${quotedValues}.`)
}

function validateBooleanParameter(value: string) {
    if (value === "true" || value === "false") {
        return SUCCESS_RESULT
    }
    return validationError("Boolean value must be 'true' or 'false'.")
}

export type ValidationResult = ValidationResultSuccess | ValidationResultFailure

export interface ValidationResultSuccess {
    success: true
}

export interface ValidationResultFailure {
    success: false
    /** Validation error description. If multiples errors were found they are separated by \n. */
    message: string
}