import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { forgotPassword } from "../actions/userActions"

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()

  const forgotPasswordState = useSelector((state) => state.userForgotPassword)
  const { loading, error, success } = forgotPasswordState

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      {success && <Message variant="success">Mail sent to email</Message>}
      {error && <Message variant="danger">Error: Possibly wrong email</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Send Verification Email
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
