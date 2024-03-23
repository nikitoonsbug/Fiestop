import React, { useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../Context";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import styled from 'styled-components'; // Importa styled-components

const StyledContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 10px;

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

const StyledForm = styled(Form)`
  color: white; /* Color del texto */
  background-color: #333; /* Fondo oscuro */
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5%;
  margin-top: 10px;
`;

function Login() {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    e.persist();
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault()) e.preventDefault();
    const formData = new FormData();
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    axios.post("http://localhost/videogamestore/public/api/auth/login", formData, 
    {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response");
        console.log(response);
        setGlobalToken(response.data.token);
        setGlobalId(response.data.id);
        setGlobalId_rol(response.data.id_rol);
        navigate({
          pathname: "/videogamestore/public",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <StyledContainer>
      <Row className="mb-4">
        <Col className="text-center">
          
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h1 className="text-center mb-4">
            <img src={"http://localhost/videogamestore/public/icono.png"} width="100" height="100" alt="Logo"/>
            <Form.Label style={{ fontSize: "24px", fontWeight: "bold", color: "white"}}>
                GeinGemmu
              </Form.Label>
          </h1>
          <StyledForm onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "24px", fontWeight: "bold" }}>
                Login
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                value={formValue.email}
                onChange={onChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={formValue.password}
                onChange={onChange}
              />
            </Form.Group>
            <StyledButton variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </StyledButton>
            <Link to="/videogamestore/public/register">
            <Button variant="link">You don't have an account? Register</Button>
          </Link>
          </StyledForm>
        </Col>
      </Row>
    </StyledContainer>
    </>
  );
}

export default Login;
