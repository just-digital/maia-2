import questions from "./maia-2-questions.json";
import { JSONSchema7 } from "json-schema";

export const generateSchemas = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {},
    required: [],
  };
  const uischema: any = {
    type: "VerticalLayout",
    elements: [],
  };

  questions.forEach((question, index) => {
    const key = `question${index + 1}`;
    schema.properties![key] = {
      type: "string",
      title: `${index + 1}. ${question}`,
      enum: ["0", "1", "2", "3", "4", "5"],
    };
    uischema.elements.push({
      type: "Control",
      scope: `#/properties/${key}`,
      options: {
        format: "radio",
      },
    });
    schema.required!.push(key)
  });
  return { schema, uischema };
};
