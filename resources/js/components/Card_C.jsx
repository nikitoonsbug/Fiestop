import { useState, useEffect, useContext } from "react";
import { MyContext } from "../Context";
import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditVideogameForm from "./EditVideogameForm";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos necesarios de FontAwesome

const StyledCard = styled(Card)`
  background-color: #333;
  color: #fff;
  margin: 10px;
`;

const Image = styled.img`
width: 100%;
height: 200px;
object-fit: cover;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
  background-color: #333;
  color: #fff;
  border-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #fff;
    color: #333;
    border-color: #333;
  }
`;

function Card_C(props) {
  const { token, id_rol } = useContext(MyContext);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const [categoryName, setCategoryName] = useState('');
  const [platformName, setPlatforms] = useState('');
  const id = props.id
  const name = props.name
  const description = props.description
  const price = props.price
  const image = props.image
  const release_date = props.release_date; // Cambiar a release_date
  const stock = props.stock
  const physical = props.physical
  const digital = props.digital
  const id_category = props.id_category
  const id_platform = props.id_platform
  const developer = props.developer
  const publisher = props.publisher
  const [errorMessages, setErrorMessages] = useState([]);

  const updateComponent = () => {
    props.updateComponent();
  };

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost/videogamestore/public/api/category_index", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        );
        const categoryDetails = response.data;

        const categoryName = categoryDetails.find((category) => category.id === props.id_category).category_name;

        setCategoryName(categoryName);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          'http://localhost/videogamestore/public/api/platform_index', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        );
        const PlatformDetail = response.data;

        const PlatformName = PlatformDetail.find((Platform) => Platform.id === props.id_platform).platform_name;
        setPlatforms(PlatformName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryDetails();
    fetchPlatforms();
  }, [props.id_category] || [props.id_platform]);



  const handleDelete = () => {
    axios.post("http://localhost/videogamestore/public/api/game_delete",
      { id: id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    ).then(response => {
      console.log('response');
      console.log(response);
      updateComponent();
    }).catch(error => {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessageString = error.response.data.error;
        const errorMessagesArray = errorMessageString.split('\n').filter((line) => line.trim() !== '');
        setErrorMessages(errorMessagesArray);
      } else {
        setErrorMessages(['An error occurred while adding the videogame.']);
      }
    });
  };

  return (
    <StyledCard className="text-center" style={{ width: "18rem" }}>
      {errorMessages.length > 0 && (
        <Alert variant="danger">
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Alert>
      )}
      <Card.Body>
        <Image src={props.image} />
        <Card.Subtitle>Name: {props.name}</Card.Subtitle>
        <hr />
        <Card.Text>
          Developer: {props.developer} <br />
          Publisher: {props.publisher}<br />
          Category: {categoryName}<br />
          Platform: {platformName}<br />
          Description: {props.description}<br />
          Physical: {props.physical}<br />
          Digital: {props.digital}<br />
          Price: {props.price}<br />
          Publication Year: {props.release_date}<br />
          Stock: {props.stock}<br />
        </Card.Text>
      </Card.Body>
      {id_rol == "1" && (
        <>
          <StyledButton variant="primary" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </StyledButton>
          <StyledButton variant="danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </StyledButton>
        </>
      )}
      <EditVideogameForm
        show={showEditModal}
        onHide={handleEditModalClose}
        id={props.id}
        name={props.name}
        description={props.description}
        price={props.price}
        image={props.image}
        release_date={props.release_date}
        stock={props.stock}
        physical={props.physical}
        digital={props.digital}
        id_category={props.id_category}
        id_platform={props.id_platform}
        developer={props.developer}
        publisher={props.publisher}
        updateComponent={updateComponent}
      />
    </StyledCard>
  );
};

export default Card_C;
