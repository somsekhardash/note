import React from 'react'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { useCallBank } from './../../CallBank'
import { getReportSchema, reportUiSchema } from './../../SchemaBank'

const Form = withTheme(SemanticUITheme)

export function CreateReport({ expensesData, reportData }) {
    let todayDate = new Date()
    if (reportData.paidDate) {
        todayDate = new Date(parseInt(reportData.paidDate))
    }
    const reportSchema = getReportSchema({
        reportData,
        expensesData,
        todayDate,
    })
    const { CREATE_REPORT, UPDATE_REPORT } = useCallBank()
    const makeTheCall = (e) => {
        if (reportData._id) {
            UPDATE_REPORT.updateReport({
                variables: {
                    reportInput: {
                        findI: { _id: reportData._id },
                        data: { ...e.formData },
                    },
                },
            })
            CREATE_REPORT.createReport({
                variables: {
                    reportInput: {
                        ...e.formData,
                        isCompleted: false,
                        paidDate: e.formData.nextDate,
                        nextDate: null,
                    },
                },
            })
        } else {
            CREATE_REPORT.createReport({
                variables: {
                    reportInput: {
                        ...e.formData,
                        isCompleted: false,
                        paidDate: e.formData.paidDate,
                        nextDate: e.formData.nextDate,
                        expenseId: expensesData.find(
                            (exp) => exp.title === e.formData.title
                        )._id,
                    },
                },
            })
        }
    }

    if (CREATE_REPORT.res.loader || CREATE_REPORT.res.loader)
        return <p>Loading...</p>
    if (CREATE_REPORT.res.error || CREATE_REPORT.res.error)
        return <p className="error">...Error...</p>

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
