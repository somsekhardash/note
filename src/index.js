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
import { HashRouter as Router } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import { CookieMaker } from './Utils'
import { Auth0Provider } from '@auth0/auth0-react'
import { AppProvider } from './Reducer'

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
    const token = CookieMaker.readCookie('dashAccessCookie')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_BE_URL}/graphql`,
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    typeDefs,
})

ReactDOM.render(
    <ErrorBoundary>
        <Auth0Provider
            domain="dev-ouzt5qe3gzjb3cpc.us.auth0.com"
            clientId="4m8IhmCkEDQnUlZKVr5oaKz10eSF1zLC"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <Router>
                <ApolloProvider client={client}>
                    <AppProvider>
                        <RouteConfigExample />
                    </AppProvider>
                </ApolloProvider>
            </Router>
        </Auth0Provider>
        ,
    </ErrorBoundary>,
    document.getElementById('root')
)

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
