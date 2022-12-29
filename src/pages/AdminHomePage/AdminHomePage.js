import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import './../AdminHome/AdminHome.css'
import { AdminTable } from './AdminTable'

const Fetch_Reports = gql`
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

const Fetch_Expenses = gql`
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

export function AdminHomePage() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const month = urlSearchParams.get('month') || new Date().getUTCMonth() + 1
    const year = urlSearchParams.get('year') || new Date().getFullYear()
    const [report, setReport] = useState([])

    const {
        loading: fetchReportsLoader,
        error: fetchReportsError,
        data: fetchReportsData,
        refetch: plzFetchReports,
    } = useQuery(Fetch_Reports, {
        variables: { month: month.toString(), year: year.toString() },
        notifyOnNetworkStatusChange: true,
    })

    const {
        loading: fetchExpensesLoader,
        error: fetchExpensesError,
        data: fetchExpensesData,
    } = useQuery(Fetch_Expenses, {
        variables: {
            frequency: 'MONTHLY',
            month: month.toString(),
            year: year.toString(),
        },
        notifyOnNetworkStatusChange: true,
    })

    if (fetchReportsLoader || fetchExpensesLoader) return <p>Loading...</p>
    if (fetchReportsError || fetchExpensesError) return <p>...Error...</p>

    let newReports = fetchReportsData?.fetchReports?.data

    newReports = newReports.reduce((acc, report) => {
        const f_acc = acc.filter(
            (accreport) => accreport.expenseId != report.expenseId
        )
        return [...f_acc, report]
    }, [])

    const finalResult = fetchExpensesData?.fetchExpenses?.data.reduce(
        (acc, expance) => {
            if (acc && !acc.map((acc) => acc.expenseId).includes(expance._id)) {
                return [...acc, expance]
            }
            return acc
        },
        newReports
    )

    return (
        <div className="admin-home">
            <AdminTable month={month} year={year} reports={finalResult} />
        </div>
    )
}
