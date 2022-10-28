import React, { useEffect } from 'react'
// import Form from '@rjsf/core'
import axios from 'axios'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useLazyQuery,
    useMutation,
    useQuery,
    gql,
} from '@apollo/client'
import { Button } from 'semantic-ui-react'
import { withTheme } from '@rjsf/core'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { Card } from 'semantic-ui-react'
const Form = withTheme(SemanticUITheme)

const expType = {
    debit: 'DEBIT',
    credit: 'CREDIT',
}

const Fetch_Expenses = gql`
    query {
        fetchExpenses(type: "debit", month: "12") {
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
    query FetchReports($type: String, $month: String) {
        fetchReports(type: $type, month: $month) {
            success
            data {
                description
                type
                isCompleted
                nextDate
                paidDate
                _id
            }
        }
    }
`

const Create_Expenses = gql`
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

const Create_Report = gql`
    mutation CreateReport($reportInput: CreateReportInput) {
        createReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
        }
    }
`

const Update_Report = gql`
    mutation UpdateReport($reportInput: UpdateReportInput) {
        updateReport(reportInput: $reportInput) {
            amount
            description
        }
    }
`

const schema = {
    title: 'Expense Create',
    type: 'object',
    required: ['title'],
    properties: {
        title: { type: 'string' },
        type: {
            type: 'string',
            enum: ['debit', 'credit', 'loan', 'investment'],
            default: expType.debit,
        },
        frequency: {
            type: 'string',
            enum: ['daily', 'monthly', 'yearly', 'custom'],
            default: 'month',
        },
        amount: { type: 'number' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
    },
}

const uiSchema = {
    startDate: {
        'ui:widget': 'date',
    },
    endDate: {
        'ui:widget': 'date',
    },
}

export default function AdminApp() {
    const [type, setType] = React.useState('')
    const [month, setMonth] = React.useState('')
    const { loading, error, data } = useQuery(Fetch_Expenses)
    const {
        loading: loadingx,
        error: errorx,
        data: datax,
        refetch: plzFetchReports,
    } = useQuery(Fetch_Reports, {
        variables: { type, month },
        notifyOnNetworkStatusChange: true,
    });

    const {
        loading: fetchReportloader,
        error: fetchReportError,
        data: fetchReportdata,
        refetch: fetchReportRefetch,
    } = useQuery(Fetch_Reports, {
        variables: { type, month },
        notifyOnNetworkStatusChange: true,
    })

    const [createExpenses, { data1, loading1, error1 }] =
        useMutation(Create_Expenses)
    const [createReport, { data2, loading2, error2 }] =
        useMutation(Create_Report)
    const [updateReport, { data3, loading3, error3 }] =
        useMutation(Update_Report)

    const makeTheCall = (e) => {
        createExpenses({
            variables: {
                expensesInput: e.formData,
            },
        })
    }

    const makeTheCall1 = (e) => {
        createReport({
            variables: {
                reportInput: e.formData,
            },
        })
    }

    const makeTheCall2 = (e) => {
        plzFetchReports({
            type: e.formData.type,
            month: e.formData.filterDate,
        })
    }

    const filterReportCall = (e) => {
        debugger;
        fetchReportRefetch({
            type: e.formData.type,
            month: e.formData.filterDate,
        })
    }

    const makeTheCall3 = (nodeType) => {
        updateReport({
            variables: {
                reportInput: {
                    data: {
                        isCompleted: true,
                    },
                    findI: {
                        _id: nodeType,
                    },
                },
            },
        })
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error </p>

    const reportSchema = {
        title: 'Report Create',
        type: 'object',
        required: ['type'],
        properties: {
            type: {
                type: 'string',
                enum: data?.fetchExpenses?.data.map(
                    (node, index) => node.title
                ),
            },
            amount: { type: 'number' },
            description: { type: 'string' },
            paidDate: { type: 'string' },
            nextDate: { type: 'string' },
            isCompleted: { type: 'boolean' },
        },
    }

    const reportUiSchema = {
        paidDate: {
            'ui:widget': 'date',
        },
        nextDate: {
            'ui:widget': 'date',
        },
    }

    const filterSchma = {
        title: 'Filter Expense',
        type: 'object',
        properties: {
            type: {
                type: 'string',
                enum: data?.fetchExpenses?.data.map(
                    (node, index) => node.title
                ),
            },
            time: {
                type: 'string',
                enum: ['daily', 'monthly', 'yearly', 'custom'],
            },
            filterDate: { type: 'string' },
        },
    }

    const filterReport = {
        title: 'Filter Report',
        type: 'object',
        properties: {
            type: {
                type: 'string',
                enum: data?.fetchExpenses?.data.map(
                    (node, index) => node.title
                ),
            },
            time: {
                type: 'string',
                enum: ['daily', 'monthly', 'yearly', 'custom'],
            },
            filterDate: { type: 'string' },
        },
    }

    if (loadingx) return <p>Loading ...</p>
    if (errorx) return `Error! ${errorx}`

    return (
        <>
            <div className="admin-wrapper">
                <Form
                    className="admin-form expense-create"
                    schema={schema}
                    uiSchema={uiSchema}
                    onChange={() => {}}
                    onSubmit={(e) => makeTheCall(e)}
                    onError={() => {}}
                />

                <Form
                    className="admin-form report-create"
                    schema={reportSchema}
                    uiSchema={reportUiSchema}
                    onChange={() => {}}
                    onSubmit={(e) => makeTheCall1(e)}
                    onError={() => {}}
                />

                <Form
                    className="admin-form filter-expense"
                    schema={filterSchma}
                    onChange={() => {}}
                    onSubmit={(e) => makeTheCall2(e)}
                    onError={() => {}}
                />

                <Form
                    className="admin-form filter-report"
                    schema={filterReport}
                    onChange={() => {}}
                    onSubmit={(e) => filterReportCall(e)}
                    onError={() => {}}
                />
            </div>
            <div className="admin-result">
                <Card.Group>
                    {datax.fetchReports.data &&
                        datax.fetchReports.data.map((node, index) => (
                            <Card key={index}>
                                <Card.Content>
                                    <Card.Header content={node.type} />
                                    <Card.Meta
                                        content={new Date(
                                            parseInt(node.nextDate)
                                        ).toLocaleDateString('en-US')}
                                    />
                                    <Card.Description content="Jake is a drummer living in New York." />
                                    {!node.isCompleted && (
                                        <Button
                                            onClick={() =>
                                                makeTheCall3(node._id)
                                            }
                                            circular
                                            color="facebook"
                                            icon="play"
                                            className="margin-top"
                                        />
                                    )}
                                </Card.Content>
                            </Card>
                        ))}
                </Card.Group>
            </div>
        </>
    )
}
