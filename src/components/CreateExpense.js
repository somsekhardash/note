import React, { useEffect, useState } from 'react'
import {
    useMutation,
    gql,
} from '@apollo/client'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { expType, frequencyType } from '../appConst'

const Form = withTheme(SemanticUITheme)

const expenseSchema = {
    title: 'Expense Create',
    type: 'object',
    required: ['title'],
    properties: {
        title: { type: 'string' },
        type: {
            type: 'string',
            enum: [...Object.values(expType)],
            default: expType.debit,
        },
        frequency: {
            type: 'string',
            enum: [...Object.values(frequencyType)],
            default: frequencyType.monthly,
        },
        amount: { type: 'number' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
    },
}

const uiSchema = {
    startDate: {
        'ui:widget': 'date',
    },
    endDate: {
        'ui:widget': 'date',
    },
}

const Create_Expenses = gql`
    mutation CreateExpenses($expensesInput: CreateExpensesInput) {
        createExpenses(expensesInput: $expensesInput) {
            title
            type
            amount
            startDate
            endDate
            frequency
        }
    }
`

export function CreateExpense() {
    const [createExpenses, { data, loading, error }] = useMutation(Create_Expenses)

    const makeTheCall = (e) => {
        createExpenses({
            variables: {
                expensesInput: e.formData,
            },
        })
    }

    if(loading)
        return <p>Loading...</p>
    if(error)
        return <p className='error'>...Error...</p>

    return (
        <Form
            className="admin-form expense-create"
            schema={expenseSchema}
            uiSchema={uiSchema}
            onChange={() => {}}
            onSubmit={(e) => makeTheCall(e)}
            onError={() => {}}
        />
    )
}
