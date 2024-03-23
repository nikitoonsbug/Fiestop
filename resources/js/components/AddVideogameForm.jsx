import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../Context";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

function AddVideogameForm(props) {
  const { token } = useContext(MyContext);

  const [newVideogame, setNewVideogame] = useState({
    name: "",
    description: "",
    image: "",
    release_date: new Date().toISOString().split("T")[0],
    stock: "",
    price: "",
    physical: "",
    digital: "",
    id_category: "",
    id_platform: "",
    developer: "",
    publisher: "",
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
    setNewVideogame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const stock = parseInt(newVideogame.stock, 10);
    const price = parseInt(newVideogame.price, 10);

    const physical = parseInt(newVideogame.physical ? 1 : 0, 10);
    const digital = parseInt(newVideogame.digital ? 1 : 0, 10);

    const releaseDate = newVideogame.release_date;

    const videogame = {
      name: newVideogame.name,
      description: newVideogame.description,
      image: newVideogame.image,
      stock: stock,
      price: price,
      physical: physical,
      digital: digital,
      release_date: releaseDate,
      id_category: newVideogame.id_category,
      id_platform: newVideogame.id_platform,
      developer: newVideogame.developer,
      publisher: newVideogame.publisher,
    };

    try {
      const response = await axios.post(
        "http://localhost/videogamestore/public/api/game_store",
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
      props.onHide(); // Ocultar el formulario después de crear el videojuego
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages(Object.values(error.response.data.error));
      } else {
        setErrorMessages(["An error occurred while creating the videogame."]);
      }
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Videogame</Modal.Title>
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
          {/* Aquí van los campos del formulario */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create Videogame
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddVideogameForm;
