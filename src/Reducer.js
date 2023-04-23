import React from 'react'
import {
    HomePageActions,
    HomePageReducer,
    HomePageInitialState,
} from './pages/HomePage/Reducer'
export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        HomePageReducer,
        HomePageInitialState
    )

    const value = {
        expenses: state.expenses,
        reports: state.reports,
        today: state.date,
        isLoading: state.isLoading,
        selectedReport: state.selectedReport,
        selectedExpense: state.selectedExpense,
        fetchExpenses: (expenses) => {
            dispatch({
                type: HomePageActions.FETCH_EXPENSES,
                payload: expenses,
            })
        },
        fetchReports: (reports) => {
            dispatch({ type: HomePageActions.FETCH_REPORTS, payload: reports })
        },
        setLoader: (isLoading) => {
            dispatch({
                type: HomePageActions.SET_ISLOADING,
                payload: isLoading,
            })
        },
        setReport: (report) => {
            dispatch({ type: HomePageActions.SET_REPORT, payload: report })
        },
        setExpenses: (expense) => {
            dispatch({ type: HomePageActions.SET_EXPENSE, payload: expense })
        },
        setDate: (date) => {
            dispatch({ type: HomePageActions.SET_DATE, payload: date })
        },
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
