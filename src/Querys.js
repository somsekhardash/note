import { gql } from '@apollo/client'
import { dateFormater } from './Utils'

export const Create_Report = gql`
    mutation CreateReport($reportInput: CreateReportInput) {
        createReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
            isCompleted
        }
    }
`

export const Update_Report = gql`
    mutation UpdateReport($reportInput: UpdateReportInput) {
        updateReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
            isCompleted
        }
    }
`

export const Fetch_Reports = gql`
    query FetchReports($month: String, $year: String) {
        fetchReports(month: $month, year: $year) {
            success
            data {
                description
                type
                isCompleted
                nextDate
                expenseId
                paidDate
                amount
                title
                _id
            }
        }
    }
`

export const Fetch_Expenses = gql`
    query FetchExpenses($frequency: String, $month: String, $year: String) {
        fetchExpenses(frequency: $frequency, month: $month, year: $year) {
            success
            data {
                title
                type
                frequency
                amount
                startDate
                endDate
                _id
            }
        }
    }
`

export const reportSchema = ({
    hideHeader = false,
    expenses = [],
    report = {},
}) => {
    const selectedExp = expenses.find((exp) => exp._id === report.expenseId)
    const todayDate = new Date()
    const dateAfterOneMonth = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth() + 1,
        todayDate.getDate()
    )
    return {
        title: hideHeader ? '' : 'Report Create',
        type: 'object',
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                enum: expenses.map((node, index) => node.title),
                default: report.title,
            },
            amount: { type: 'number', default: report.amount },
            description: {
                type: 'string',
                default: `${report.description} on ${dateFormater(
                    report.paidDate
                )}`,
            },
            paidDate: {
                type: 'string',
                default: todayDate.toISOString().slice(0, 10),
            },
            nextDate: {
                type: 'string',
                default: dateAfterOneMonth.toISOString().slice(0, 10),
            },
            isCompleted: { type: 'boolean', default: report.isCompleted },
        },
    }
}

export const reportUiSchema = {
    paidDate: {
        'ui:widget': 'date',
    },
    nextDate: {
        'ui:widget': 'date',
    },
}
