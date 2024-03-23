import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from "../Context";
import ReactDOM from 'react-dom/client';
import UserCard from './UserCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Stack, Spinner, Container, Row, Button, Form, Col } from 'react-bootstrap';

function UserList() {
  const [refresh, setRefresh] = useState(false);
  const { token, id_rol } = useContext(MyContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const updateComponent = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!token) {
      navigate("/videogamestore/public/login");
    }
    if (id_rol != 1) {
      navigate("/videogamestore/public/");
    }

    const getUsers = async () => {
      await axios.get("http://localhost/videogamestore/public/api/user_index", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          console.log(userData);
          setUserData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {

        });
    }
    getUsers()
  }, [token, navigate, refresh])

  if (!userData.length) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
  return (
    <>
      <Container >
        <Row>
          {userData.map((user) => (
            <UserCard key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              address={user.address}
              phone_number={user.phone_number}
              updateComponent={updateComponent}
            />
          ))}
        </Row>
      </Container>
    </>

  );

}


export default UserList;
