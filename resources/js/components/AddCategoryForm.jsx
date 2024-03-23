import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from "../Context";
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'; // Import styled-components

// Styled components from EditCategoryForm
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

// Function to add category form
function AddCategoryForm() {
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);
  const [formData, setFormData] = useState({
    category_name: '',
    description: '',
  });
  useEffect(() => {

    if (!token) {
      navigate("/videogamestore/public/login");
      return;
    }
    if (id_rol != 1) {
      navigate("/videogamestore/public/")
    }
  }, []);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    const emptyFields = Object.keys(formData).filter(key => formData[key] === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost/videogamestore/public/api/category_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate('/videogamestore/public/CategoryList');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessageString = error.response.data.error;
        const errorMessagesArray = errorMessageString.split('\n').filter((line) => line.trim() !== '');
        setErrorMessages(errorMessagesArray);
      } else {
        setErrorMessages(['An error occurred while adding the book.']);
      }
    }
  };

  return (
    <StyledForm>
      <h2 style={{color: 'white'}}>Add Category</h2>
      {errorMessages.length > 0 && (
        <StyledAlert variant="danger"> {/* Apply styled Alert */}
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </StyledAlert>
      )}
      <Form.Group controlId="formCategoryName">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          name="category_name"
          value={formData.category_name}
          onChange={handleInputChange}
          placeholder="Enter name of category"
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter a description"
        />
      </Form.Group>
      <StyledButton variant="primary" onClick={handleAddCategory}> {/* Apply styled Button */}
        Add Category
      </StyledButton>
    </StyledForm>
  );
}

export default AddCategoryForm;
