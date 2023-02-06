import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
