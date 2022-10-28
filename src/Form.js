import React from "react";
import Form from "@rjsf/semantic-ui";

export default function JSONForm(props) {
  const schema = {
    title: "Todo",
    type: "object",
    properties: {
      title: {
        type: "string",
        title: "Title",
        default: "A new task",
      },
      start: {
        type: "string",
        format: "date-time",
      },
      description: {
        type: "string",
      },
      nextTime: {
        type: "string",
        format: "date-time",
      },
      recurrence: {
        title: "Integer range",
        type: "integer",
        minimum: 0,
        maximum: 100,
      },
    },
  };
  // const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);
  const onSubmit = ({ formData }, e) => {
    e.preventDefault();
    console.log("Data submitted: ", formData);
    props.onEventChange(formData);
  };
  const onError = (errors) =>
    console.log("I have", errors.length, "errors to fix");

  return (
    <div className="form-demo">
      <Form
        schema={schema}
        onChange={({ formData }, e) => {
          console.log(formData, e);
        }}
        onSubmit={onSubmit.bind(this)}
        onError={onError}
      />
    </div>
  );
}
