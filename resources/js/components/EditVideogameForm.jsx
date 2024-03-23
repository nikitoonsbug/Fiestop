import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../Context";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function EditVideogameForm(props) {
  const { token } = useContext(MyContext);
  const navigate = useNavigate();

  const [editedVideogame, setEditedVideogame] = useState({
    name: props.name || "",
    description: props.description || "",
    image: props.image || "",
    release_date: props.release_date
      ? new Date(props.release_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    stock: props.stock || "",
    price: props.price || "",
    physical: props.physical || "",
    digital: props.digital || "",
    id_category: props.id_category || "",
    id_platform: props.id_platform || "",
    developer: props.developer || "",
    publisher: props.publisher || "",
  });
  
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost/videogamestore/public/api/category_index",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          "http://localhost/videogamestore/public/api/platform_index",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlatforms(response.data);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchCategories();
    fetchPlatforms();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVideogame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    const stock = parseInt(editedVideogame.stock, 10);
    const price = parseInt(editedVideogame.price, 10);

    const physical = parseInt(editedVideogame.physical ? 1 : 0, 10);
    const digital = parseInt(editedVideogame.digital ? 1 : 0, 10);

    const releaseDate = format(new Date(editedVideogame.release_date), "yyyy-MM-dd");

    const videogame = {
      name: editedVideogame.name,
      description: editedVideogame.description,
      image: editedVideogame.image,
      stock: stock,
      price: price,
      physical: physical,
      digital: digital,
      release_date: releaseDate,
      id_category: editedVideogame.id_category,
      id_platform: editedVideogame.id_platform,
      developer: editedVideogame.developer,
      publisher: editedVideogame.publisher,
    };
    try {
      const response = await axios.put(
        `http://localhost/videogamestore/public/api/game_update/${props.id}`,
        videogame,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      props.updateComponent();
      navigate("/videogamestore/public/ListCards");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Manejo específico para el error 401 (Unauthorized)
        console.error("Unauthorized access:", error.response.data);
        // Puedes mostrar un mensaje al usuario indicando que no tiene permisos para realizar la acción
      } else {
        console.error("An error occurred while updating the videogame:", error);
        // Puedes mostrar un mensaje genérico de error al usuario
      }
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Videogame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {errorMessages.length > 0 ? (
            <Alert variant="danger">
              {errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </Alert>
          ) : (
            <Alert variant="info">No error messages.</Alert>
          )}
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedVideogame.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedVideogame.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={editedVideogame.image}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRelease_date">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              name="release_date"
              value={editedVideogame.release_date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={editedVideogame.stock}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={editedVideogame.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={editedVideogame.id_category}
              onChange={handleInputChange}
              name="id_category"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPlatform">
            <Form.Label>Platform</Form.Label>
            <Form.Control
              as="select"
              value={editedVideogame.id_platform}
              onChange={handleInputChange}
              name="id_platform"
              required
            >
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.platform_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditVideogameForm;

