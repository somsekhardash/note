import React from 'react'

export const adminHomePageInitialState = {
    expenses: [],
    reports: [],
    isLoading: false,
}

export const adminHomePageActions = {
    FETCH_EXPENSES: 'FETCH_EXPENSES',
    FETCH_REPORTS: 'FETCH_REPORTS',
    SET_ISLOADING: 'SET_ISLOADING',
}

//Reducer to Handle Actions
export const adminHomePageReducer = (state, action) => {
    switch (action.type) {
        case adminHomePageActions.FETCH_EXPENSES:
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
                isLoading: false,
            }
        case adminHomePageActions.FETCH_REPORTS: {
            return {
                ...state,
                reports: [...state.reports, action.payload],
                isLoading: false,
            }
        }
        case adminHomePageActions.SET_ISLOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        default:
            return state
    }
}
