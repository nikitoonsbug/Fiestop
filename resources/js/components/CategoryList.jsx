import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../Context';
import CategoryCard from './CategoryCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Spinner, Container, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

const AddCategoryButton = styled(Button)`
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

const RowCategory = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`;

function CategoryList() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);
  const [categoryData, setCategoryData] = useState([]);

  const updateComponent = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!token) {
      navigate("/videogamestore/public/login");
      return;
    }
  

    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost/videogamestore/public/api/category_index", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setCategoryData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, [token, navigate, refresh]);

  const handleAddCategoryClick = () => {
    navigate('/videogamestore/public/AddCategory');
  };

  if (!categoryData.length) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  return (
    <StyledContainer>
     
        <AddCategoryButton variant="primary" onClick={handleAddCategoryClick}>
          Add Category
        </AddCategoryButton>
     
      <RowCategory>
        {categoryData.map((category) => (
          <CategoryCard key={category.id}
            id={category.id}
            category_name={category.category_name}
            description={category.description}
            updateComponent={updateComponent}
          />
        ))}
      </RowCategory>
    </StyledContainer>
  );
}

export default CategoryList;
