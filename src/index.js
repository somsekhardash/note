import React from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from './ErrorBoundary'
import './index.css'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    gql,
} from '@apollo/client'
import { RouteConfigExample } from './route'
import { BrowserRouter as Router } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import { CookieMaker } from "./Utils";

const typeDefs = gql`
    extend type CreateExpensesInput {
        title: String
        type: String
        amount: Int
        startDate: String
        endDate: String
        frequency: String
    }
    extend type CreateReportInput {
        amount: Int
        description: String
        paidDate: String
        nextDate: String
        type: String
        isCompleted: Boolean
    }
    extend type UpdateReportInput {
        data: CreateReportInput
        findI: CreateReportInput
    }
`

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = CookieMaker.readCookie('dashAccessCookie');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:8082/graphql',
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    typeDefs,
})

ReactDOM.render(
    <ErrorBoundary>
        <Router>
            <ApolloProvider client={client}>
                <RouteConfigExample />
            </ApolloProvider>
        </Router>
    </ErrorBoundary>,
    document.getElementById('root')
)

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
