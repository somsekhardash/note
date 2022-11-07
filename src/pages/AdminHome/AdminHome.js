import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Button, Modal } from 'semantic-ui-react'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { Card } from 'semantic-ui-react'
import { DataGrid } from './../../components/DataGrid'
import { expType, frequencyType, monthTypes, yearTypes } from './../../appConst'
import { CreateExpense } from './../../components/CreateExpense'
import { CreateReport } from './../../components/CreateReport'
import { EditReport } from './../../components/EditReport'
import { ReportCard } from './../../components/ReportCard/ReportCard'
import { ExpenseCard } from "./../../components/ExpenseCard/ExpenseCard";
import './AdminHome.css'

const Form = withTheme(SemanticUITheme)

const Fetch_Expenses = gql`
    query {
        fetchExpenses(type: "DEBIT", month: "12") {
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

const Fetch_Reports = gql`
    query FetchReports($getAll: Boolean) {
        fetchReports(getAll: $getAll) {
            success
            data {
                description
                type
                isCompleted
                nextDate
                paidDate
                amount
                _id
            }
        }
    }
`

export function AdminHome() {
    const [openCreateReport, setOpenCreateReport] = useState(false)
    const [openCreateExpense, setOpenCreateExpense] = useState(false)
    const [filteredReport, setTheFilteredReport] = useState(null)
    const [selectedReport, setSelectedReport] = useState(null)
    const [editSelectReport, setEditSelectReport] = useState(null)
    const [filteredExpense, setTheFilteredExpense] = useState(null)


    const {
        loading: fetchExpensesLoader,
        error: fetchExpensesError,
        data: fetchExpensesData,
    } = useQuery(Fetch_Expenses)
    const expensesData = fetchExpensesData?.fetchExpenses?.data

    const {
        loading: fetchReportsLoader,
        error: fetchReportsError,
        data: fetchReportsData,
        refetch: plzFetchReports,
    } = useQuery(Fetch_Reports, {
        variables: { getAll: true },
        notifyOnNetworkStatusChange: true,
    })
    const reportsData = fetchReportsData?.fetchReports?.data

    const makeTheCall2 = (e) => {
        // plzFetchReports({
        //     type: e.formData.type,
        //     month: e.formData.filterDate,
        // })
        const keys = Object.keys(e.formData)
        const values = Object.values(e.formData)

        const filteredResult = expensesData.filter(function (e) {
            return keys.every(function (a) {
                return values.includes(e[a])
            })
        })


        setTheFilteredExpense([...filteredResult]);
    }

    const setFilteredReport = (e) => {
        const reportsWithFrequency = reportsData.map((report) => {
            const expenseResult = expensesData.find((expense) => {
                return report.type === expense.title
            })
            return {
                ...report,
                frequency: expenseResult.frequency,
                nextYear: new Date(parseInt(report.nextDate)).getFullYear(),
                nextMonth: new Date(parseInt(report.nextDate)).getMonth() + 1,
                lastMonth: new Date(parseInt(report.paidDate)).getMonth() + 1,
                lastYear: new Date(parseInt(report.paidDate)).getFullYear(),
            }
        })

        const keys = Object.keys(e.formData)
        const values = Object.values(e.formData)

        const filteredResult = reportsWithFrequency.filter(function (e) {
            return keys.every(function (a) {
                return values.includes(e[a])
            })
        })

        setTheFilteredReport([...filteredResult])
    }

    const makeTheCall3 = (nodeType) => {
        setOpenCreateReport(true)
        setSelectedReport({
            ...nodeType,
        })
    }

    const onExpenseAction = (node) => {
        setOpenCreateReport(true);
        setSelectedReport({
            ...node,
            type: node.title,
        })
    }

    // const createNewReport = (node) => {
    //     setOpenCreateReport(true)
    //     setSelectedReport(node)
    // }

    if (fetchExpensesLoader || fetchReportsLoader) return <p>Loading...</p>
    if (fetchExpensesError || fetchReportsError) return <p>...Error...</p>

    // const reportSchema = {
    //     title: 'Report Create',
    //     type: 'object',
    //     required: ['type'],
    //     properties: {
    //         type: {
    //             type: 'string',
    //             enum: expensesData.map((node, index) => node.title),
    //         },
    //         amount: { type: 'number' },
    //         description: { type: 'string' },
    //         paidDate: { type: 'string' },
    //         nextDate: { type: 'string' },
    //         isCompleted: { type: 'boolean' },
    //     },
    // }

    const filterSchma = {
        title: 'Filter Expense',
        type: 'object',
        properties: {
            type: {
                type: 'string',
                enum: expensesData.map((node, index) => node.title),
            },
            frequency: {
                type: 'string',
                enum: [...Object.values(frequencyType)],
            }
        },
    }

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
        <div className='admin-home'>
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
                <Form
                    className="admin-form filter-expense"
                    schema={filterSchma}
                    onChange={() => {}}
                    onSubmit={(e) => makeTheCall2(e)}
                    onError={() => {}}
                />
            </div>
            <div className="admin-panel">
                <div className='reports-list data-list'>
                    <Card>
                        <Card.Content>
                            <Card.Header>Recent Reports</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Group className="reports-stack">
                                {reportsData &&
                                    reportsData.map((node, index) => (
                                        <ReportCard
                                            key={index}
                                            report={node}
                                            onAction={makeTheCall3}
                                            onSelect={() => {
                                                setEditSelectReport({ ...node })
                                            }}
                                        />
                                    ))}
                            </Card.Group>
                        </Card.Content>
                    </Card>
                </div>    
                <div className='expense-list data-list'>
                    <Card>
                        <Card.Content>
                            <Card.Header>Recent Expenses</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Group className="reports-stack">
                                {expensesData &&
                                    expensesData.map((node, index) => (
                                       <ExpenseCard key={index} expense={node} onAction={onExpenseAction}/>
                                    ))}
                            </Card.Group>
                        </Card.Content>
                    </Card>
                </div>
                    {/* <DataGrid /> */}
                <div className='expense-list data-list'>
                    <Card>
                        <Card.Content>
                            <Card.Header>Filtered Reports</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Group>
                                {filteredReport &&
                                    filteredReport.map((node, index) => (
                                        <ReportCard
                                            key={index}
                                            report={node}
                                            onAction={makeTheCall3}
                                        />
                                    ))}
                            </Card.Group>
                        </Card.Content>
                    </Card>
                </div>

                
                <div className='expense-list data-list'>
                    <Card>
                        <Card.Content>
                            <Card.Header>Filtered Expenses</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Group>
                                {filteredExpense &&
                                    filteredExpense.map((node, index) => (
                                        <ExpenseCard key={index} 
                                            expense={node} 
                                            onAction={onExpenseAction}
                                        />
                                    ))}
                            </Card.Group>
                        </Card.Content>
                    </Card>
                </div>


                <div className="edit-panel">
                    <Card>
                        <Card.Content>
                            <Card.Header>Edit Panel</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <EditReport
                            reportData={editSelectReport}
                            expensesData={expensesData}
                        />
                    </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    )
}
