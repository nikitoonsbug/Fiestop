import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../Context';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import styled from 'styled-components'; // Importa styled-components

const StyledContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
`;

const StyledCard = styled(Card)`
color: white; /* Color del texto */
background-color: #333; /* Fondo oscuro */
border: 1px solid black;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
padding: 5%;

`;

const StyledButton = styled(Button)`
margin-top: 10px;

margin-right: 10px;
margin-bottom: 10px;
width: auto;
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

`;

function Profile() {
  const navigate = useNavigate();
  const { token, id } = useContext(MyContext);
  const userId = id;
  const [userData, setUserData] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/videogamestore/public/login");
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost/videogamestore/public/api/user_show/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setUserData(response.data);
        setEditedUserData(response.data);
      } catch (error) {
        console.error('Error obtaining user information:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const emptyFields = Object.values(editedUserData).filter(value => value === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(editedUserData.phone_number)) {
      setErrorMessages(['Please enter a valid phone number.']);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUserData.email)) {
      setErrorMessages(['Please enter a valid email address.']);
      return;
    }
    try {
      setUserData(editedUserData);
      setIsEditing(false);

      await axios.post(
        `http://localhost/videogamestore/public/api/user_update/${userId}`,
        editedUserData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log('User information updated successfully');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleCancel = () => {
    setEditedUserData(userData);
    setIsEditing(false);
    setErrorMessages([]);
  };

  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledContainer>
      <h1>User Profile</h1>
      {userData && !isEditing ? (

        <StyledCard>
           <Card.Img variant="top" style={{ width: "100px", height: "100px", marginBottom: "10px"  }} src={"user.png"} />
          <Card.Body>
           
            <Card.Title>{userData.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {userData.email} <br />
              <strong>Address:</strong> {userData.address}<br />
              <strong>Phone Number:</strong> {userData.phone_number}
            </Card.Text>
            <StyledButton variant="primary" onClick={handleEdit}>
              Edit
            </StyledButton>
          </Card.Body>
        </StyledCard>
      ) : (
        <StyledForm>
          {errorMessages.length > 0 && (
            <Alert variant="danger">
              {errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </Alert>
          )}
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedUserData ? editedUserData.name : ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUserData ? editedUserData.email : ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Adrress</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={editedUserData ? editedUserData.address : ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="num"
              name="phone_number"
              value={editedUserData ? editedUserData.phone_number : ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <StyledButton  variant="primary" onClick={handleSave}>
            Save
          </StyledButton>
          <StyledButton variant="secondary" onClick={handleCancel}>
            Cancel
          </StyledButton>
        </StyledForm>
      )}
    </StyledContainer>
  );
}

export default Profile;

