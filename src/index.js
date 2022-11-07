import React from 'react'
import ReactDOM from 'react-dom'
import { AdminHome } from './pages/AdminHome/AdminHome'
import {ErrorBoundary} from './ErrorBoundary'
import './index.css'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client'

const typeDefs = gql`
extend type CreateExpensesInput {
    title: String,
    type: String,
    amount: Int,
    startDate: String,
    endDate: String,
    frequency: String
}
extend type CreateReportInput {
    amount: Int,
    description: String,
    paidDate: String,
    nextDate: String,
    type: String,
    isCompleted: Boolean
}
extend type UpdateReportInput {
    data: CreateReportInput,
    findI: CreateReportInput
}
`;


const client = new ApolloClient({
    uri: 'http://localhost:8082/graphql',
    cache: new InMemoryCache(),
    typeDefs
})

ReactDOM.render(
    <ErrorBoundary>
        <ApolloProvider client={client}>
            <React.StrictMode>
                <AdminHome />
            </React.StrictMode>
        </ApolloProvider>
    </ErrorBoundary>,
    document.getElementById('root')
)

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
