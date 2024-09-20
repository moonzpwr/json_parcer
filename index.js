const schema = require("./schema.json");

const RANDM_ARRAY_MAX_LENGTH = 5;
const MIN_INTEGER_VALUE = 1;
const MAX_INTEGER_VALUE = 1000;

const jsonParser = (schema) => {
  if (!schema) return null;

  function generateRandomLength() {
    return Math.floor(Math.random() * RANDM_ARRAY_MAX_LENGTH) + 1;
  }

  function generateRandomValue(schema, definitions) {
    if (!schema) return null;

    function generateRandomString() {
      return Math.random().toString(36).substring(7);
    }
    function generateRandomInteger(max) {
      return Math.floor(Math.random() * max || MAX_INTEGER_VALUE);
    }

    if (schema.type) {
      switch (schema.type) {
        case "string":
          if (schema.pattern) {
            return `https://${generateRandomString()}.corezoid.com/api/1/json/public/${generateRandomInteger()}/${generateRandomString()}`;
          }
          return generateRandomString();
        case "integer":
          const min = schema.minimum || MIN_INTEGER_VALUE;
          const max = schema.maximum || MAX_INTEGER_VALUE;
          return generateRandomInteger(max - min + 1) + min;
        case "boolean":
          return Math.random() < 0.5;
        case "array":
          if (!schema.items) return [];
          return Array.from({ length: generateRandomLength() }, () =>
            generateRandomValue(schema.items, definitions)
          );
        case "object":
          return generateData(schema, definitions);
        case "null":
          return null;
        default:
          return null;
      }
    } else if (schema.enum) {
      return schema.enum[generateRandomInteger(schema.enum.length)];
    } else if (schema.anyOf) {
      //Choosing one of possible anyOf
      const randomSchema =
        schema.anyOf[generateRandomInteger(schema.anyOf.length)];
      return generateRandomValue(randomSchema, definitions);
    }

    return null;
  }

  function generateData(schema, definitions) {
    const data = {};

    if (schema.properties && typeof schema.properties === "object") {
      for (const [key, valueSchema] of Object.entries(schema.properties)) {
        if (valueSchema?.items?.hasOwnProperty("$ref")) {
          const ref = valueSchema.items["$ref"].replace("#", "");
          data[key] = Array.from({ length: generateRandomLength() }, () =>
            generateRandomValue(definitions[ref], definitions)
          );
        } else if (valueSchema) {
          data[key] = generateRandomValue(valueSchema, definitions);
        }
      }
    }

    // Require processing
    if (schema.required) {
      schema.required.forEach((requiredField) => {
        if (data[requiredField] === undefined || data[requiredField] === null) {
          data[requiredField] = generateRandomValue(
            schema.properties[requiredField],
            definitions
          );
        }
      });
    }

    return data;
  }

  return generateData(schema, schema.definitions);
};

const randomData = jsonParser(schema);
console.log(randomData);

module.exports = jsonParser;
