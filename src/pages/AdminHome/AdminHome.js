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
import './AdminHome.css'

const Form = withTheme(SemanticUITheme)

const Fetch_Expenses = gql`
    query {
        fetchExpenses(frequency: "MONTHLY") {
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

const Fetch_One_Expenses = gql`
    query FetchExpenses($title: String) {
        fetchExpenses(title: $title) {
            success
            data {
                title
                type
                frequency
                amount
                startDate
                endDate
                _id
                reports {
                    description
                    title
                    amount
                    _id
                    paidDate
                    nextDate
                }
            }
        }
    }
`

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
    const {
        loading: fetchExpensesLoader,
        error: fetchExpensesError,
        data: fetchExpensesData,
    } = useQuery(Fetch_Expenses)
    const expensesData = fetchExpensesData?.fetchExpenses?.data

    // const {
    //     loading: fetchReportsLoader,
    //     error: fetchReportsError,
    //     data: fetchReportsData,
    //     refetch: plzFetchReports,
    // } = useQuery(Fetch_Reports, {
    //     variables: { getAll: true },
    //     notifyOnNetworkStatusChange: true,
    // })
    const title = null
    const {
        loading: fetchOneExpenseLoader,
        error: fetchOneExpenseError,
        data: fetchOneOneExpenseData,
        refetch: plzFetchOneExp,
    } = useQuery(Fetch_One_Expenses, {
        variables: { title },
        notifyOnNetworkStatusChange: true,
    })
    const newFetchOneData = fetchOneOneExpenseData?.fetchExpenses?.data

    console.log(newFetchOneData, 'newFetchOneData')

    const setFilteredReport = (e) => {
        const keys = Object.keys(e.formData)
        const values = Object.values(e.formData)
        plzFetchOneExp({
            title: values[0],
        })
    }

    if (fetchExpensesLoader || fetchOneExpenseLoader) return <p>Loading...</p>
    if (fetchExpensesError || fetchOneExpenseError) return <p>...Error...</p>

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
                    trigger={<Button>Create Expense Modal</Button>}
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
                <Form
                    className="admin-form filter-expense"
                    schema={filterReport}
                    onChange={() => {}}
                    onSubmit={(e) => setFilteredReport(e)}
                    onError={() => {}}
                />
            </div>
            <div className="admin-panel">
                {newFetchOneData && (
                    <div className="">
                        <h3>Filtered Data</h3>
                        {newFetchOneData.map((oneData, index) => {
                            return (
                                <div key={index}>
                                    {console.log(oneData)}
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
