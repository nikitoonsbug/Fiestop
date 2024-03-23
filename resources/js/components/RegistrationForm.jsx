import React, { useState, useContext } from 'react';
import { MyContext } from '../Context';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components'; // Importa styled-components

const StyledContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledForm = styled(Form)`
  color: white; /* Color del texto */
  background-color: #333; /* Fondo oscuro */
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5%;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
  background-color: #333;
  color: #fff;
  border-color: #fff;
  &:hover {
    background-color: #fff;
    color: #333;
  }
`;

const RegistrationForm = () => {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone_number: '',
  });
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const onChange = (e) => {
    e.persist();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/videogamestore/public/api/register',
        formValue,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('response');
      console.log(response);
      setGlobalToken(response.data.token);
      setGlobalId(response.data.id);
      setGlobalId_rol(response.data.id_rol);
      navigate({
        pathname: "/videogamestore/public",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessageString = error.response.data.error;
        const errorMessagesArray = errorMessageString.split('\n').filter((line) => line.trim() !== '');

        setErrorMessages(errorMessagesArray);
      } else {
        setErrorMessages(['An error occurred while adding a new user.']);
      }
    }
  };

  return (
    <>
      <StyledContainer className="mt-5">
        <Row className="mb-4">
          <Col className="text-center">
          <h1 className="text-center mb-4">
            <img src={"http://localhost/videogamestore/public/icono.png"} width="100" height="100" alt="Logo"/>
            <Form.Label style={{ fontSize: "24px", fontWeight: "bold", color: "white"}}>
                GeinGemmu
              </Form.Label>
          </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            
            <StyledForm onSubmit={handleSubmit}>
              {errorMessages.length > 0 && (
                <Alert variant="danger">
                  {errorMessages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </Alert>
              )}
              <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "24px", fontWeight: "bold" }}>
                Create an account
              </Form.Label>
            </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formValue.name}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formValue.email}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formValue.password}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={formValue.address}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone_number"
                  value={formValue.phone_number}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <StyledButton variant="primary" type="submit" className="w-100 mt-3">
                Register
              </StyledButton>
              <Link to="/videogamestore/public/login">
              <Button variant="link">You have an account? Login</Button>
            </Link>
            </StyledForm>
          </Col>
        </Row>
      </StyledContainer>
    </>
  );
};

export default RegistrationForm;
