import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../Context';
import Card_C from './Card_C';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Spinner, Container, Row, Button, Form, Col } from 'react-bootstrap';
import styled from 'styled-components';

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


function ListCards() {



  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);
  const [videogameData, setVideogameData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [platformFilter, setPlatformFilter] = useState('');
  const [publisherFilter, setPublisherFilter] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const updateComponent = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!token) {
      navigate("/videogamestore/public/login");
      return;
    }

    const getVideogames = async () => {
  try {
    const response = await axios.get("http://localhost/videogamestore/public/api/game_index", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    // Verificar si response.data es un array antes de asignarlo a videogameData
    if (Array.isArray(response.data)) {
      setVideogameData(response.data);
    } else {
      console.error("Response data is not an array:", response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost/videogamestore/public/api/category_index', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPlatforms = async () => {
      try {
        const response = await axios.get('http://localhost/videogamestore/public/api/platform_index', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlatforms();
    fetchCategories();
    getVideogames()
  }, [token, navigate, refresh])

  const handleAddVideogameClick = () => {
    navigate('/videogamestore/public/AddVideogame');
  };

  if (!videogameData.length) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
  const filteredVideogames = videogameData.filter((videogame) => {
    return (
      (categoryFilter === '' || videogame.id_category.toString() === categoryFilter) &&
      (platformFilter === '' || videogame.id_platform.toString() === platformFilter) &&
      (publisherFilter === '' || videogame.publisher.toLowerCase().includes(publisherFilter.toLowerCase())) &&
      (developerFilter === '' || videogame.developer.toLowerCase().includes(developerFilter.toLowerCase())) &&
      (nameFilter === '' || videogame.name.toLowerCase().includes(nameFilter.toLowerCase()))
    );
  });
  return (
    <>
    
      <Container >
        <Form className="form-inline">
          <Row>
            <Col md={3} className="mb-2">
              <Form.Group controlId="formCategoryFilter">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" size="sm" onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="">All</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={3} className="mb-2">
              <Form.Group controlId="formPlatformFilter">
                <Form.Label>Platform</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  onChange={(e) => setPlatformFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.platform_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={3} className="mb-2">
              <Form.Group controlId="formPublisherFilter">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter publisher"
                  size="sm"
                  onChange={(e) => setPublisherFilter(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3} className="mb-2">
              <Form.Group controlId="formDeveloperFilter">
                <Form.Label>Developer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter developer"
                  size="sm"
                  onChange={(e) => setDeveloperFilter(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3} className="mb-2">
              <Form.Group controlId="formNameFilter">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  size="sm"
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <hr />
        {id_rol == '1' && (
          <StyledButton variant="primary" onClick={handleAddVideogameClick}>
            Add Videogame
          </StyledButton>
        )}
        <Row>
          {filteredVideogames.map((videogame) => (
            <Card_C key={videogame.id}
              id={videogame.id}
              id_category={videogame.id_category}
              id_platform={videogame.id_platform}
              name={videogame.name}
              description={videogame.description}
              publisher={videogame.publisher}
              developer={videogame.developer}
              image={videogame.image}
              price={videogame.price}
              release_date={videogame.release_date}
              stock={videogame.stock}
              physical={videogame.physical}
              digital={videogame.digital}
              updateComponent={updateComponent}
            />
          ))}
        </Row>
      </Container>
    </>

  );

}


export default ListCards;
