import React from 'react'

const initialState = {
    expenses: [],
    reports: [],
    report: null,
    expense: null,
}

const actions = {
    FETCH_EXPENSES: 'FETCH_EXPENSES',
    FETCH_EXPENSE: 'FETCH_EXPENSE',
    FETCH_REPORTS: 'FETCH_REPORTS',
    FETCH_REPORT: 'FETCH_REPORT',
}

//Reducer to Handle Actions
const reducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_EXPENSES:
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            }
        case actions.FETCH_REPORTS: {
            return {
                ...state,
                reports: [...state.reports, action.payload],
            }
        }
        default:
            return state
    }
}

const AdminHomeContext = React.createContext()

export const AdminHomeProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const value = {
        expenses: state.expenses,
        reports: state.reports,
        fetchExpenses: (expenses) => {
            dispatch({ type: actions.FETCH_EXPENSES, payload: expenses })
        },
        fetchReports: (reports) => {
            dispatch({ type: actions.FETCH_REPORTS, payload: reports })
        },
    }

    return (
        <AdminHomeContext.Provider value={value}>
            {children}
        </AdminHomeContext.Provider>
    )
}
