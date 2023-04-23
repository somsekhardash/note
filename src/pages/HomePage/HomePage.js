import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import {
    Button,
    Container,
    Header,
    Icon,
    Menu,
    Segment,
} from 'semantic-ui-react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { HomePageWrapper } from './style'
import { useQuery } from '@apollo/client'
import { Fetch_Reports, Fetch_Expenses } from './../../Querys'
import { AppContext } from './../../Reducer'

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as="h1"
            content="Imagine-a-Company"
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as="h2"
            content="Do whatever you want when you want to."
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size="huge">
            Get Started
            <Icon name="right arrow" />
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

function DesktopContainer() {
    const fixed = true
    const { loginWithRedirect } = useAuth0()
    const { fetchExpenses, fetchReports, today } = React.useContext(AppContext)
    const {
        loading: fetchReportsLoader,
        error: fetchReportsError,
        data: fetchReportsData,
        refetch: plzFetchReports,
    } = useQuery(Fetch_Reports, {
        variables: {
            month: (new Date().getUTCMonth() + 1).toString(),
            year: new Date().getFullYear().toString(),
        },
        notifyOnNetworkStatusChange: true,
    })

    useEffect(() => {
        if (today) {
            plzFetchReports({
                month: (new Date(today).getUTCMonth() + 1).toString(),
                year: new Date(today).getFullYear().toString(),
            })
        }
    }, [today])

    const {
        loading: fetchExpensesLoader,
        error: fetchExpensesError,
        data: fetchExpensesData,
    } = useQuery(Fetch_Expenses, {
        variables: {},
        notifyOnNetworkStatusChange: true,
    })

    const expensesData = fetchExpensesData?.fetchExpenses?.data
    const reportsData = fetchReportsData?.fetchReports?.data

    useEffect(() => {
        if (expensesData) fetchExpenses(expensesData)
    }, [expensesData])

    useEffect(() => {
        if (reportsData) fetchReports(reportsData)
    }, [reportsData])

    return (
        <HomePageWrapper>
            <Segment
                inverted
                textAlign="center"
                style={{ padding: '2em 0em' }}
                vertical
            >
                <Menu
                    fixed={fixed ? 'top' : null}
                    inverted={!fixed}
                    pointing={!fixed}
                    secondary={!fixed}
                    size="large"
                >
                    <Container>
                        <Menu.Item as="a" active>
                            <Link to="/dashboard">Home</Link>
                        </Menu.Item>
                        <Menu.Item as="a">
                            <Link to="/search">Search</Link>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Button
                                onClick={() => loginWithRedirect()}
                                inverted={!fixed}
                            >
                                Log in
                            </Button>
                        </Menu.Item>
                    </Container>
                </Menu>
                {/* <HomepageHeading /> */}
            </Segment>
            <Outlet />
        </HomePageWrapper>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

export default DesktopContainer
