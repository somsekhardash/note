import React from 'react'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { expType, frequencyType } from '../../appConst'
import { getExpenseSchema, expenseUiSchema } from './../../SchemaBank'
import { useCallBank } from './../../CallBank'

const Form = withTheme(SemanticUITheme)

export function CreateExpense() {
    const { CREATE_EXPENSE } = useCallBank()
    const expenseSchema = getExpenseSchema({ expType, frequencyType })
    const makeTheCall = (e) => {
        CREATE_EXPENSE.createExpenses({
            variables: {
                expensesInput: e.formData,
            },
        })
    }

    if (CREATE_EXPENSE.res.loading) return <p>Loading...</p>
    if (CREATE_EXPENSE.res.error) return <p className="error">...Error...</p>

    return (
        <Form
            className="admin-form expense-create"
            schema={expenseSchema}
            uiSchema={expenseUiSchema}
            onChange={() => {}}
            onSubmit={(e) => makeTheCall(e)}
            onError={() => {}}
        />
    )
}
