import schema from "./schema.json" with { type: "json" };

const jsonParser = (schema) => {
  function generateRandomValue(schema, definitions) {
    if (!schema) return null;
  
    if (schema.type) {
      switch (schema.type) {
        case 'string':
          if (schema.pattern) {
            return `https://${Math.random().toString(36).substring(7)}.corezoid.com/api/1/json/public/${Math.floor(Math.random() * 10000)}/${Math.random().toString(36).substring(7)}`;
          }
          return Math.random().toString(36).substring(7);
        case 'integer':
          const min = schema.minimum || 1;
          const max = schema.maximum || 10000;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        case 'boolean':
          return Math.random() < 0.5;
        case 'array':
          if (!schema.items) return [];
          const arrayLength = Math.floor(Math.random() * 5) + 1; 
          return Array.from({ length: arrayLength }, () => generateRandomValue(schema.items, definitions));
        case 'object':
          return generateData(schema, definitions);
        case 'null':
          return null;
        default:
          return null;
      }
    } else if (schema.enum) {
      return schema.enum[Math.floor(Math.random() * schema.enum.length)]; //Random value from enum
    } else if (schema.anyOf) {
      //Choosing one of possible anyOf
      const randomSchema = schema.anyOf[Math.floor(Math.random() * schema.anyOf.length)];
      return generateRandomValue(randomSchema, definitions); 
    }
  
    return null;
  }
  
  function generateData(schema, definitions) {
    const data = {};

    if (schema.properties && typeof schema.properties === 'object') {
      for (const [key, valueSchema] of Object.entries(schema.properties)) {
        if (valueSchema?.items?.hasOwnProperty('$ref')) {
          const ref = valueSchema.items['$ref'].replace('#', '');
          const arrayLength = Math.floor(Math.random() * 5) + 1;
          data[key] = Array.from({ length: arrayLength }, () => generateRandomValue(definitions[ref], definitions));
        } else if (valueSchema) {
          data[key] = generateRandomValue(valueSchema, definitions);
        }
      }
    }
  
    // Require processing
    if (schema.required) {
      schema.required.forEach((requiredField) => {
        if (data[requiredField] === undefined || data[requiredField] === null) {
          data[requiredField] = generateRandomValue(schema.properties[requiredField], definitions);
        }
      });
    }
  
    return data;
  }

  return generateData(schema, schema.definitions);
}

const randomData = jsonParser(schema);
console.log(randomData);