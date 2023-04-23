import React from 'react'

export const HomePageInitialState = {
    expenses: [],
    reports: [],
    loading: false,
    date: new Date(),
    selectedReport: null,
    selectedExpense: null,
}

export const HomePageActions = {
    FETCH_EXPENSES: 'FETCH_EXPENSES',
    FETCH_REPORTS: 'FETCH_REPORTS',
    SET_ISLOADING: 'SET_ISLOADING',
    SET_REPORT: 'SET_REPORT',
    SET_EXPENSE: 'SET_EXPENSE',
    SET_DATE: 'SET_DATE',
}

//Reducer to Handle Actions
export const HomePageReducer = (state, action) => {
    switch (action.type) {
        case HomePageActions.FETCH_EXPENSES:
            return {
                ...state,
                expenses: [...action.payload],
                isLoading: false,
            }
        case HomePageActions.FETCH_REPORTS: {
            return {
                ...state,
                reports: [...action.payload],
                isLoading: false,
            }
        }
        case HomePageActions.SET_ISLOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case HomePageActions.SET_REPORT: {
            return {
                ...state,
                selectedReport: action.payload,
            }
        }
        case HomePageActions.SET_EXPENSE: {
            return {
                ...state,
                selectedExpense: action.payload,
            }
        }
        case HomePageActions.SET_DATE: {
            return {
                ...state,
                date: action.payload,
            }
        }
        default:
            return state
    }
}
