import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Button, Modal } from 'semantic-ui-react'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import {
    frequencyType,
    monthTypes,
    yearsMap,
    yearTypes,
} from './../../appConst'
import { CreateExpense } from '../../components/CreateExpense/CreateExpense'
import { CreateReport } from '../../components/CreateReport/CreateReport'
import { ExpenseTable } from './ExpenseTable'
import { useCallBank } from './../../CallBank'
import './AdminHome.css'

const Form = withTheme(SemanticUITheme)

// const Fetch_Reports = gql`
//     query FetchReports($getAll: Boolean) {
//         fetchReports(getAll: $getAll) {
//             success
//             data {
//                 description
//                 type
//                 isCompleted
//                 nextDate
//                 paidDate
//                 expenseId
//                 amount
//                 _id
//             }
//         }
//     }
// `

export function AdminHome() {
    const [openCreateReport, setOpenCreateReport] = useState(false)
    const [openCreateExpense, setOpenCreateExpense] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const { FETCH_ONE_EXPENSE, FETCH_EXPENSES } = useCallBank()

    FETCH_EXPENSES.fetchExpensesCall()

    const expensesData = FETCH_EXPENSES.res?.data?.fetchExpenses?.data

    // const {
    //     loading: fetchReportsLoader,
    //     error: fetchReportsError,
    //     data: fetchReportsData,
    //     refetch: plzFetchReports,
    // } = useQuery(Fetch_Reports, {
    //     variables: { getAll: true },
    //     notifyOnNetworkStatusChange: true,
    // })

    // CREATE_REPORT.createReport({
    //     variables: {
    //         reportInput: {
    //             ...e.formData,
    //             isCompleted: false,
    //             paidDate: e.formData.nextDate,
    //             nextDate: null,
    //         },
    //     },
    // })

    const res = {
        title: '',
        frequency: '',
    }
    // const {
    //     loading: fetchOneExpenseLoader,
    //     error: fetchOneExpenseError,
    //     data: fetchOneOneExpenseData,
    //     refetch: plzFetchOneExp,
    // } = useQuery(Fetch_One_Expenses, {
    //     variables: res,
    //     notifyOnNetworkStatusChange: true,
    // })
    FETCH_ONE_EXPENSE.fetchOneExpensesCall({
        variables: res,
    })

    const newFetchOneData = FETCH_ONE_EXPENSE?.res?.data?.fetchExpenses?.data

    console.log(FETCH_ONE_EXPENSE.res, 'newFetchOneData')

    const setFilteredReport = (e) => {
        const keys = Object.keys(e.formData)
        const values = Object.values(e.formData)
        const fieldMap = {
            type: 'title',
            frequency: 'frequency',
        }
        FETCH_ONE_EXPENSE.fetchOneExpensesCall({
            variables: {
                [fieldMap[keys[0]]]: values[0],
            },
        })
    }

    if (
        FETCH_EXPENSES.res.loading ||
        FETCH_ONE_EXPENSE.res.fetchOneExpenseLoader
    )
        return <p>Loading...</p>
    if (FETCH_EXPENSES.res.error || FETCH_ONE_EXPENSE.res.fetchOneExpenseError)
        return <p>...Error...</p>

    const filterReport = {
        title: 'Filter Report',
        type: 'object',
        properties: {
            type: {
                type: 'string',
                enum: expensesData.map((node, index) => node.title),
            },
            frequency: {
                type: 'string',
                enum: [...Object.values(frequencyType)],
            },
            nextMonth: { type: 'number', oneOf: monthTypes },
            nextYear: { type: 'number', oneOf: yearTypes },
            lastMonth: { type: 'number', oneOf: monthTypes },
            lastYear: { type: 'number', oneOf: yearTypes },
        },
    }

    return (
        <div className="admin-home">
            <div className="admin-wrapper">
                <Modal
                    onClose={() => setOpenCreateExpense(false)}
                    onOpen={() => setOpenCreateExpense(true)}
                    open={openCreateExpense}
                    trigger={<Button>Create Expense Modal1</Button>}
                >
                    <CreateExpense />
                </Modal>
                <Modal
                    onClose={() => setOpenCreateReport(false)}
                    onOpen={() => setOpenCreateReport(true)}
                    open={openCreateReport}
                    trigger={<Button>Create Report Modal</Button>}
                >
                    <CreateReport
                        expensesData={expensesData}
                        reportData={{
                            ...selectedReport,
                            isCompleted: true,
                        }}
                    />
                </Modal>
            </div>
            <div className="admin-panel">
                <Form
                    className="admin-form filter-expense"
                    schema={filterReport}
                    onChange={() => {}}
                    onSubmit={(e) => setFilteredReport(e)}
                    onError={() => {}}
                />
                {newFetchOneData && (
                    <div className="">
                        <h3>Filtered Data</h3>
                        {newFetchOneData.map((oneData, index) => {
                            return (
                                <div key={index}>
                                    {oneData?.title}
                                    {oneData?.type}
                                    {oneData?.frequency}
                                    {<ExpenseTable data={oneData?.reports} />}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
