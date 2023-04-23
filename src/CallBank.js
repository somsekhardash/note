import { useMutation, gql, useQuery } from '@apollo/client'

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

// const FETCH_REPORTS = gql`
//     query FetchReports($month: String, $year: String) {
//         fetchReports(month: $month, year: $year) {
//             success
//             data {
//                 description
//                 type
//                 isCompleted
//                 nextDate
//                 expenseId
//                 paidDate
//                 amount
//                 title
//                 _id
//             }
//         }
//     }
// `

const FETCH_EXPENSES = gql`
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

const FETCH_ONE_EXPENSES = gql`
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
                    _id
                }
            }
        }
    }
`

export function useCallBank() {
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
    const {
        loading: fetchExpensesLoader,
        error: fetchExpensesError,
        data: fetchExpensesData,
        refetch: fetchExpensesCall,
    } = useQuery(FETCH_EXPENSES)
    const {
        loading: fetchOneExpensesLoader,
        error: fetchOneExpensesError,
        data: fetchOneExpensesData,
        refetch: fetchOneExpensesCall,
    } = useQuery(FETCH_ONE_EXPENSES)

    const res = {
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
        FETCH_EXPENSES: {
            fetchExpensesCall,
            res: {
                loading: fetchExpensesLoader,
                error: fetchExpensesError,
                data: fetchExpensesData,
            },
        },
        FETCH_ONE_EXPENSE: {
            fetchOneExpensesCall,
            res: {
                loading: fetchOneExpensesLoader,
                error: fetchOneExpensesError,
                data: fetchOneExpensesData,
            },
        },
    }
    return res
}
