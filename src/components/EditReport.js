import React, { useEffect, useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { isEmpty } from "./../Utils";

const Form = withTheme(SemanticUITheme)

const reportUiSchema = {
    paidDate: {
        'ui:widget': 'date',
    },
    nextDate: {
        'ui:widget': 'date',
    },
}

const Update_Report = gql`
    mutation UpdateReport($reportInput: UpdateReportInput) {
        updateReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
            isCompleted
        }
    }
`;

export function EditReport({ expensesData, reportData }) {
    const [updateReport, { data: updateDate, loading: updateLoader, error: updateError }] = useMutation(Update_Report)
    if(isEmpty(reportData)) return null;

    let todayDate = new Date();
    if(!isEmpty(reportData) && !isEmpty(reportData.paidDate)) {
        todayDate = new Date(parseInt(reportData.paidDate));
    }
    const reportSchema = {
        title: 'Report Create',
        type: 'object',
        required: ['type'],
        properties: {
            type: {
                type: 'string',
                enum: expensesData.map(
                    (node, index) => node.title
                ),
                default: reportData.type
            },
            amount: { type: 'number', default: reportData.amount },
            description: { type: 'string', default:reportData.description },
            paidDate: { type: 'string', default: todayDate.toISOString().slice(0,10) },
            nextDate: { type: 'string', default: new Date(todayDate.getFullYear(), todayDate.getMonth()+1, todayDate.getDate()).toISOString().slice(0,10) },
            isCompleted: { type: 'boolean', default: reportData.isCompleted },
        },
    }

    const makeTheCall = (e) => {
        updateReport({
            variables: {
                reportInput: {findI: {_id:reportData._id},  data: {...e.formData}},
            },
        });
    }

    if (updateLoader) return <p>Loading...</p>
    if (updateError) return <p className="error">...Error...</p>
    
    return (
        <Form
            className="edit-report"
            schema={reportSchema}
            uiSchema={reportUiSchema}
            onChange={() => {}}
            onSubmit={(e) => makeTheCall(e)}
            onError={() => {}}
        />
    )
}
