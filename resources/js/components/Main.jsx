import React from "react";
import ListCards from "./ListCards";
import Menu from "./Menu";
import Login from "./Login";
import { Navigate, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import UserList from "./UserList";
import AddVideogameForm from "./AddVideogameForm";
import Profile from "./Profile";
import Home from "./Home";
import CategoryList from "./CategoryList";
import AddCategoryForm from "./AddCategoryForm";
import Videogames from "../../../public/background.png";
import { Image } from "react-bootstrap";

function Main() {
  return (
    <>
    <Image
        src={Videogames}
        fluid
        style={{
          position: "fixed",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          backgroundSize: "cover",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100%",
          flex: "1 1 auto",
          zIndex: "-1",
        }}
      />
    <Routes>
      <Route path="/videogamestore/public/" element={<Menu />}>
        <Route path="" element={<Home />} />
        <Route path="ListCards" element={<ListCards />} />
        <Route path="CategoryList" element={<CategoryList />} />
        <Route path="UserList" element={<UserList />} />
        <Route path="AddCategory" element={<AddCategoryForm />} />
        <Route path="AddVideogame" element={<AddVideogameForm />} />
      
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>

      <Route path="/videogamestore/public/login" element={<Login />} />

      <Route
        path="/videogamestore/public/register"
        element={<RegistrationForm />}
      />
    </Routes>
    </>
  );
}

export default Main;
