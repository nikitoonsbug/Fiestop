import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../Context';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserPurchase() {
  const navigate = useNavigate();
  const { token, id } = useContext(MyContext);
  const userId = id;
  const [lends, setLends] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/videogamestore/public/login");
      return;
    }
    const fetchLends = async () => {
      try {
        const response = await axios.get('http://localhost/videogamestore/public/api/purchase_index', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setLends(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchLends();
  }, []);

  const handleViewAllLends = () => {

    navigate('/videogamestore/public/purchases');
  };

  if (!Array.isArray(lends)) {
    return <div>Error fetching purchases</div>;
  }

  const userPurchases = lends.filter(lend => lend.id_user === Number(userId));

  return (
    <>
      <Row>
        <Col>
          <Button variant="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleViewAllLends}>
            Apply for a lend
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3}>
        {UserPurchases.length === 0 ? (
          <Col>No lends for this user</Col>
        ) : (
          UserPurchases.map(purchase => (
            <Col key={purchase.id}>
              <Card style={{ margin: '10px' }}>
                <Card.Body>
                  <Card.Title>Lend ID: {purchase.id}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Date: {purchase.date}</ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default UserPurchase;
