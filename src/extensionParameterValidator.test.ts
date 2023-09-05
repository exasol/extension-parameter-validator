import { ValidationResult, validateParameter, validateParameters } from "./extensionParameterValidator";

describe("extensionParameterValidator", () => {
    describe("validateParameter", () => {
        const successResult: ValidationResult = { success: true }
        const failure = (message: string) => { return { success: false, message } };
        const invalidFormat = failure("The value has an invalid format.")
        const requiredParameter = failure("This is a required parameter.")
        const invalidBoolean = failure("Boolean value must be 'true' or 'false'.")
        it.each`
        parameter                               | value        | expectedResult
        ${{ type: "string", regex: "^a+$" }}    | ${"test"}    | ${invalidFormat}
        ${{ type: "string", regex: "^t+$" }}    | ${"test"}    | ${invalidFormat}
        ${{ type: "string", regex: "^test$" }}  | ${"test"}    | ${successResult}
        ${{ type: "string", regex: "^.*$" }}    | ${"test"}    | ${successResult}
        ${{ type: "string" }}                   | ${"test"}    | ${successResult}
        ${{ type: "string", required: true }}   | ${""}        | ${requiredParameter}
        ${{ type: "boolean" }}                  | ${"true"}    | ${successResult}
        ${{ type: "boolean" }}                  | ${"false"}   | ${successResult}
        ${{ type: "boolean" }}                  | ${"TRUE"}    | ${invalidBoolean}
        ${{ type: "boolean", required: true }}  | ${undefined} | ${requiredParameter}
        ${{ type: "boolean", required: true }}  | ${""}        | ${requiredParameter}
        ${{ type: "boolean", required: false }} | ${undefined} | ${successResult}
        ${{ type: "boolean", required: false }} | ${""}        | ${successResult}
        ${{ type: "boolean" }}                  | ${"False"}   | ${invalidBoolean}
        ${{ type: "boolean" }}                  | ${"wrong"}   | ${invalidBoolean}
        `('validates $parameter as $expectedResult', ({ parameter, value, expectedResult }) => {
            let result = validateParameter(parameter, value);
            expect(result).toEqual(expectedResult)
        })
    })

    describe("validateParameters", () => {
        it("detects a missing parameter", () => {
            let result = validateParameters([{ id: "param1", type: "string", name: "Parameter 1", required: true }], { values: [] });
            expect(result).toEqual({ success: false, message: "Parameter 1: This is a required parameter." })
        })

        it("accepts a valid parameter", () => {
            let result = validateParameters([{ id: "param1", type: "string", name: "Parameter 1", required: true }], { values: [{ name: "param1", value: "test" }] });
            expect(result).toEqual({ success: true })
        })

        it("rejects invalid parameters", () => {
            let result = validateParameters([{ id: "param1", type: "string", name: "Parameter 1", regex: "^a+$" },
            { id: "param2", type: "string", name: "Parameter 2", regex: "^a+$" }], { values: [{ name: "param1", value: "test" }, { name: "param2", value: "test" }] });
            expect(result).toEqual({
                success: false, message: "Parameter 1: The value has an invalid format.\n" +
                    "Parameter 2: The value has an invalid format."
            })
        })
    })
})
