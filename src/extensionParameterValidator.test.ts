import { SelectOption } from "@exasol/extension-manager-interface";
import { ValidationResult, validateParameter, validateParameters } from "./extensionParameterValidator";

describe("extensionParameterValidator", () => {
    describe("validateParameter", () => {
        const successResult: ValidationResult = { success: true }
        const failure = (message: string) => { return { success: false, message } };
        const invalidFormat = failure("The value has an invalid format.")
        const requiredParameter = failure("This is a required parameter.")
        const invalidBoolean = failure("Boolean value must be 'true' or 'false'.")
        const options: SelectOption[] = [{ id: "a", name: "Option A" }, { id: "b", name: "Option B" }]
        const invalidSelectParam = failure("The value is not allowed. Possible values are 'a', 'b'.");
        it.each`
        parameter                               | value        | expectedResult
        ${{ type: "unsupported" }}              | ${"test"}    | ${failure("unsupported parameter type 'unsupported'")}
        ${{ type: "string", regex: "^a+$" }}    | ${"test"}    | ${invalidFormat}
        ${{ type: "string", regex: "^a+$" }}    | ${"aa"}      | ${successResult}
        ${{ type: "string", regex: "^t+$" }}    | ${"test"}    | ${invalidFormat}
        ${{ type: "string", regex: "^test$" }}  | ${"test"}    | ${successResult}
        ${{ type: "string", regex: "^test$" }}  | ${" test"}   | ${invalidFormat}
        ${{ type: "string", regex: "^test$" }}  | ${"test "}   | ${invalidFormat}
        ${{ type: "string", regex: "^.*$" }}    | ${"test"}    | ${successResult}
        ${{ type: "string", regex: "^.*$" }}    | ${" test "}  | ${successResult}
        ${{ type: "string" }}                   | ${"test"}    | ${successResult}
        ${{ type: "string", required: true }}   | ${""}        | ${requiredParameter}
        ${{ type: "string", required: true }}   | ${undefined} | ${requiredParameter}
        ${{ type: "string", required: true }}   | ${null}      | ${requiredParameter}
        ${{ type: "string", required: false }}  | ${""}        | ${successResult}
        ${{ type: "string", required: false }}  | ${undefined} | ${successResult}
        ${{ type: "string", required: false }}  | ${null}      | ${successResult}
        ${{ type: "boolean" }}                  | ${"true"}    | ${successResult}
        ${{ type: "boolean" }}                  | ${"false"}   | ${successResult}
        ${{ type: "boolean" }}                  | ${" true"}   | ${invalidBoolean}
        ${{ type: "boolean" }}                  | ${"TRUE"}    | ${invalidBoolean}
        ${{ type: "boolean" }}                  | ${"True"}    | ${invalidBoolean}
        ${{ type: "boolean" }}                  | ${"FALSE"}   | ${invalidBoolean}
        ${{ type: "boolean" }}                  | ${"False"}   | ${invalidBoolean}
        ${{ type: "boolean", required: true }}  | ${undefined} | ${requiredParameter}
        ${{ type: "boolean", required: true }}  | ${null}      | ${requiredParameter}
        ${{ type: "boolean", required: true }}  | ${""}        | ${requiredParameter}
        ${{ type: "boolean", required: false }} | ${undefined} | ${successResult}
        ${{ type: "boolean", required: false }} | ${null}      | ${successResult}
        ${{ type: "boolean", required: false }} | ${""}        | ${successResult}
        ${{ type: "boolean" }}                  | ${"False"}   | ${invalidBoolean}
        ${{ type: "boolean" }}                  | ${"wrong"}   | ${invalidBoolean}
        ${{ type: "select", options: options }} | ${"a"}       | ${successResult}
        ${{ type: "select", options: options }} | ${"b"}       | ${successResult}
        ${{ type: "select", options: options }} | ${"c"}       | ${invalidSelectParam}
        ${{ type: "select", options: [] }}      | ${"a"}       | ${failure("No option available for this parameter.")}
        ${{ type: "select", options, required: false }} | ${""}        | ${successResult}
        ${{ type: "select", options, required: false }} | ${undefined} | ${successResult}
        ${{ type: "select", options, required: false }} | ${null}      | ${successResult}
        ${{ type: "select", options, required: false }} | ${"wrong"}   | ${invalidSelectParam}
        ${{ type: "select", options, required: true }}  | ${undefined} | ${requiredParameter}
        ${{ type: "select", options, required: true }}  | ${null}      | ${requiredParameter}
        ${{ type: "select", options, required: true }}  | ${"a"}       | ${successResult}
        ${{ type: "select", options, required: true }}  | ${"wrong"}   | ${invalidSelectParam}
        `('validates $parameter with value $value as $expectedResult', ({ parameter, value, expectedResult }) => {
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
