import React, { useState, useContext } from "react";
import { MyContext } from "../Context";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

const StyledForm = styled(Form)`
  padding: 5%;
`;

const StyledAlert = styled(Alert)`
  color: white;
  background-color: #333;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5%;
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

const StyledModal = styled(Modal)`
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5%;

  .modal-content {
    background-color: #333;
    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 5%;
  }
`;

function EditUserForm(props) {
  const { token } = useContext(MyContext);
  const navigate = useNavigate();
  const id = props.id
  const [editedName, setEditedName] = useState(props.name);
  const [editedEmail, setEditedEmail] = useState(props.email);
  const [editedAddress, setEditedAddress] = useState(props.address);
  const [editedPhone_number, setEditedPhone_number] = useState(props.phone_number);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleEdit = () => {
    const emptyFields = [editedName, editedEmail, editedAddress, editedPhone_number].filter(value => value === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(editedPhone_number)) {
      setErrorMessages(['Please enter a valid phone number.']);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedEmail)) {
      setErrorMessages(['Please enter a valid email address.']);
      return;
    }
    const updatedUser = {
      id: id,
      name: editedName,
      email: editedEmail,
      address: editedAddress,
      phone_number: editedPhone_number
    };
    axios.post(`http://localhost/videogamestore/public/api/user_update/${id}`,
      updatedUser,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    ).then(response => {
      console.log('response');
      console.log(response);
      props.updateComponent();
      navigate("/videogamestore/public/UserList");
    }).catch(error => {
      console.log(error);
    });
    props.onHide();
  };

  return (
    <StyledModal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessages.length > 0 && (
          <StyledAlert variant="danger">
            {errorMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </StyledAlert>
        )}
        <StyledForm>
          <Form.Group controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={editedPhone_number}
              onChange={(e) => setEditedPhone_number(e.target.value)}
            />
          </Form.Group>
        </StyledForm>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton variant="secondary" onClick={props.onHide}>
          Close
        </StyledButton>
        <StyledButton variant="primary" onClick={handleEdit}>
          Save Changes
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
}

export default EditUserForm;
