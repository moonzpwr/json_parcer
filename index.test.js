const { describe, expect } = require("@jest/globals");
const jsonParser = require("./index");
const schema = require("./schema.json");

describe("json parser", () => {
  it("should generate object", () => {
    const randomObject = jsonParser(schema);
    expect(typeof randomObject).toBe("object");
  });

  it("should return null if no schema is passed", () => {
    const randomObject = jsonParser();
    expect(randomObject).toBe(null);
  });

  it("in random object should present required fields", () => {
    const randomObject = jsonParser(schema);
    const arrayOfRequiredFields = schema.required;
    const isAllReqiredFieldPresent = arrayOfRequiredFields
      .map((requiredField) => randomObject.hasOwnProperty(requiredField))
      .every((el) => el === true);
    expect(isAllReqiredFieldPresent).toBeTruthy();
  });

  it("all attendees should have required fields", () => {
    const randomObject = jsonParser(schema);
    const arrayOfRequiredFields = schema.definitions.attendees.required;
    const isAllReqiredFieldPresent = randomObject.attendees
      .reduce((acc, attendee) => {
        arrayOfRequiredFields.map((requiredField) =>
          acc.push(attendee.hasOwnProperty(requiredField))
        );
        return acc;
      }, [])
      .every((el) => el === true);
    expect(isAllReqiredFieldPresent).toBeTruthy();
  });

  it("fields must match the type specified in the schema", () => {
    const randomObject = jsonParser(schema);
    const result = {};
    for (const [key, value] of Object.entries(randomObject)) {
      if (
        schema.properties[key].type &&
        schema.properties[key].type === typeof value
      ) {
        result[key] = true;
      } else if (
        schema.properties[key].anyOf &&
        schema.properties[key].anyOf.some((el) => el.type === typeof value)
      ) {
        result[key] = true;
      }
    }
    expect(Object.values(result)).toBeTruthy();
  });

  it("priorProbability must be within the minimum and maximum values specified in the schema.", () => {
    const randomObject = jsonParser(schema);
    const isFieldBetweenMinMax =
      randomObject.priorProbability >=
        schema.properties.priorProbability.anyOf[1].minimum &&
      randomObject.priorProbability <=
        schema.properties.priorProbability.anyOf[1].maximum;
    expect(isFieldBetweenMinMax).toBeTruthy();
  });
});
