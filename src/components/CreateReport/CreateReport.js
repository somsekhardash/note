import React, { useEffect, useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'

const Form = withTheme(SemanticUITheme)

const reportUiSchema = {
    paidDate: {
        'ui:widget': 'date',
    },
    nextDate: {
        'ui:widget': 'date',
    },
}

const Create_Report = gql`
    mutation CreateReport($reportInput: CreateReportInput) {
        createReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
            isCompleted
        }
    }
`;

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

export function CreateReport({ expensesData, reportData }) {
    let todayDate = new Date();
    if(reportData.paidDate) {
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

    const [createReport, { data, loading, error }] = useMutation(Create_Report)
    const [updateReport, { data: updateDate, loading: updateLoader, error: updateError }] = useMutation(Update_Report)
    

    const makeTheCall = (e) => {
        if(reportData._id) {
            alert('update');
            updateReport({
                variables: {
                    reportInput: {findI: {_id:reportData._id},  data: {...e.formData}},
                },
            });
            createReport({
                variables: {
                    reportInput: {
                        ...e.formData,
                        isCompleted: false,
                        paidDate: e.formData.nextDate,
                        nextDate: null
                    },
                },
            });  
        } else {
            alert('create');
            createReport({
                variables: {
                    reportInput: e.formData,
                },
            });
            createReport({
                variables: {
                    reportInput: {
                        ...e.formData,
                        isCompleted: false,
                        paidDate: e.formData.nextDate,
                        nextDate: null
                    },
                },
            });
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="error">...Error...</p>

    return (
        <Form
            className="admin-form report-create"
            schema={reportSchema}
            uiSchema={reportUiSchema}
            onChange={() => {}}
            onSubmit={(e) => makeTheCall(e)}
            onError={() => {}}
        />
    )
}
