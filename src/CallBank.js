import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'

const CREATE_REPORT = gql`
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

const UPDATE_REPORT = gql`
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

const CREATE_EXPENSES = gql`
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

export function useCallBank(props) {
    const [
        createReport,
        {
            data: createReportData,
            loading: createReportLoader,
            error: createReportError,
        },
    ] = useMutation(CREATE_REPORT)
    const [
        updateReport,
        {
            data: updateReportData,
            loading: updateReportLoader,
            error: updateReportError,
        },
    ] = useMutation(UPDATE_REPORT)
    const [
        createExpenses,
        {
            data: createExpensesData,
            loading: createExpensesLoader,
            error: createExpensesError,
        },
    ] = useMutation(CREATE_EXPENSES)

    return {
        CREATE_REPORT: {
            createReport,
            res: {
                data: createReportData,
                loading: createReportLoader,
                error: createReportError,
            },
        },
        UPDATE_REPORT: {
            updateReport,
            res: {
                data: updateReportData,
                loading: updateReportLoader,
                error: updateReportError,
            },
        },
        CREATE_EXPENSES: {
            createExpenses,
            res: {
                data: createExpensesData,
                loading: createExpensesLoader,
                error: createExpensesError,
            },
        },
    }
}
