import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword)
    {
        setMessage('Password do not match')
    }
    else
    {
        dispatch(register(name,email,password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>NAME</Form.Label>
          <Form.Control
            type='etxt'
            value={name}
            placeholder='Enter Name'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account ?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
