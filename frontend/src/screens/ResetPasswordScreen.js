import React, { useState } from "react"

import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { forgotPasswordReset } from "../actions/userActions"

const ResetPasswordScreen = ({ match }) => {
  const token = match.params.token
  const [password, setPasssword] = useState("")
  const [confirmPassword, setConfirmPasssword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userPasswordReset = useSelector(
    (state) => state.userForgotPasswordReset
  )
  const { loading, error, success } = userPasswordReset

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      setMessage(null)
      dispatch(forgotPasswordReset(token, password, confirmPassword))
    }
  }

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {success && (
        <Message variant="success">Password successfully reset!</Message>
      )}
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPasssword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPasssword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPasswordScreen
