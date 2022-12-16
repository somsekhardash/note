import React from 'react'
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { CookieMaker } from "./../../Utils";
import { useNavigate } from "react-router-dom";

const User_Login = gql`
    mutation LoginUser($usersInput: RegisterUserInput) {
        loginUser(usersInput: $usersInput) {
            success
            accessToken
        }
    }
`

export const LoginPage = () => {
    const [loginUser, { data, loading, error }] = useMutation(User_Login)
    const [mobileNumber, setMobileNumber] = React.useState('')
    const [passWord, setPassWord] = React.useState('')
    const navigate = useNavigate();
    
    const makeTheCall = () => {
        loginUser({
            variables: {
                usersInput: {
                    mobileNumber: parseInt(mobileNumber),
                    passWord,
                },
            },
        })
    }

    React.useEffect(() => {
      if(data) {
        const cookie = new CookieMaker("dashAccessCookie", data.loginUser.accessToken);
        cookie.createCookie();
        navigate("/dashboard");
      }
    }, [data])
    

    if(loading)
      return <h2>Loading..</h2>;

    return (
        <Grid
            textAlign="center"
            style={{ height: '100vh' }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                    <Image src="/logo.png" /> Log-in to your account
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail address"
                            value={mobileNumber}
                            onChange={(e) => {
                                setMobileNumber(e.target.value);
                            }}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={passWord}
                            onChange={(e) => {
                                setPassWord(e.target.value)
                            }}
                        />

                        <Button color="teal" fluid size="large" onClick={() => makeTheCall()}>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href="/signup">Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
