import React from 'react'
import Form from '@rjsf/semantic-ui';
import { Button, Header, Image, Modal } from 'semantic-ui-react';


export default function ModelForEdit({data}) {
    const [open, setOpen] = React.useState(false);
    const onSubmit = ({ formData }, e) => {
        e.preventDefault();
        console.log("Data submitted: ", formData);
      };
    const onError = (errors) => console.log("I have", errors.length, "errors to fix");
    const {title, start, extendedProps} = data._def;  
    const schema = {
        title: 'Edit Model',
        type: 'object',
        properties: {
            title: {
                type: 'string',
                title: 'Title',
                default: 'A new task',
                default: title
            },
            start: {
                type: 'string',
                format: 'date-time',
                default: start
            },
            description: {
                type: 'string',
                default: extendedProps.description
            },
            nextTime: {
                type: 'string',
                format: 'date-time',
            },
            recurrence: {
                title: 'Integer range',
                type: 'integer',
                minimum: 0,
                maximum: 100,
            },
        },
    }
    return (
        data && <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form
                        schema={schema}
                        onChange={({ formData }, e) => {
                            console.log(formData, e)
                        }}
                        onSubmit={onSubmit.bind(this)}
                        onError={onError}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                </Button>
                <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}
