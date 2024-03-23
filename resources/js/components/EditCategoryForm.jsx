import { useState, useContext } from "react";
import { MyContext } from "../Context";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';



const  StyledForm = styled(Form)`
  padding: 5%;
`;

const StyledAlert = styled(Alert)`
  color: white; /* Color del texto */
  background-color: #333; /* Fondo oscuro */
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
  color: white; /* Color del texto */
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5%;

  .modal-content {
    background-color: #333; /* Fondo oscuro */
    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 5%;
  }

`;



function EditCategoryForm(props) {
  const { token } = useContext(MyContext);
  const navigate = useNavigate();
  const id = props.id
  const [editedCategory_name, setEditedCategory_name] = useState(props.category_name);
  const [editedDescription, setEditedDescription] = useState(props.description);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleEdit = () => {
    const emptyFields = [editedCategory_name, editedDescription].filter(value => value === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }
    const updatedCategory = {
      id: id,
      category_name: editedCategory_name,
      description: editedDescription,
    };
    axios.post("http://localhost/videogamestore/public/api/category_update",
      updatedCategory,
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
    }).catch(error => {
      console.log(error);
    });
    props.onHide();
  };

  return (
    <StyledModal show={props.show} onHide={props.onHide}>
     
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >Edit Category</Modal.Title>
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
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editedCategory_name}
              onChange={(e) => setEditedCategory_name(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
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

export default EditCategoryForm;
