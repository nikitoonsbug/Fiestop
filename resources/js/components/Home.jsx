import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { MyContext } from "../Context";
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const StyledCarousel = styled(Carousel)`
  margin-bottom: 30px;
`;

const StyledCarouselItem = styled(Carousel.Item)`
  height: 400px;

  img {
    height: 400px;
    object-fit: cover;
  }

  .carousel-caption {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 10px;
  }

  h3 {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  p {
    color: #fff;
  }
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

const StyledCard = styled(Card)`
  background-color: #333;
  color: #fff;
  margin: 10px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const StyledCol = styled(Col)`
  color: white; /* Color del texto */

  margin-bottom: 10px;
  padding: 2%;
`;




function Home() {
  const { token } = useContext(MyContext);
  const navigate = useNavigate();
  const [videogameData, setVideogameData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/videogamestore/public/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/videogamestore/public/api/game_index", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        if (Array.isArray(response.data)) {
          setVideogameData(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, navigate]);

  return (
    <>
      <Container>
        <Row className="mt-5">
        
          <Col md={12} className="text-center">
            <StyledCarousel>
              <StyledCarouselItem>
                <img
                  className="d-block w-100"
                  src="https://www.desktopbackground.org/download/1366x768/2011/05/24/207897_the-megaforum-view-topic-desktop-derby_1920x1080_h.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Halo</h3>
                  <p>The series launched in 2001 with the first-person shooter video game Halo: Combat Evolved and its tie-in novel, The Fall of Reach.</p>
                </Carousel.Caption>
              </StyledCarouselItem>
              <StyledCarouselItem>
                <img
                  className="d-block w-100"
                  src="https://mobimg.b-cdn.net/v3/fetch/9d/9da81cc98000c2de52eed6aafeee61d4.jpeg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Super Smash Bros</h3>
                  <p>Super Smash Bros.[a] is a crossover platform fighting game series published by Nintendo. The series was created by Masahiro Sakurai, who has directed every game in the series.</p>
                </Carousel.Caption>
              </StyledCarouselItem>
              <StyledCarouselItem>
                <img
                  className="d-block w-100"
                  src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/08/mortal-kombat-1-cover-no-text-gold.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Mortal Kombat</h3>
                  <p>Mortal Kombat is an American media franchise centered on a series of fighting video games originally developed by Midway Games in 1992.</p>
                </Carousel.Caption>
              </StyledCarouselItem>
            </StyledCarousel>
          </Col>
        </Row>

        <Row className="my-5">
          {videogameData.map((videogame) => (
            <Col key={videogame.id} md={4} className="mb-4">
              <StyledCard >
                <Card.Img variant="top" src={videogame.image} />
                <Card.Body>
                  <Card.Title>{videogame.name}</Card.Title>
                  <StyledButton variant="dark" onClick={() => navigate(`/videogamestore/public/ListCards`)}>More</StyledButton>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;

