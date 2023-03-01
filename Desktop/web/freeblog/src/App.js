import './App.css';
import React from "react";
import Login from "./Login";
import IndexPage from "./IndexPage";
import Register from "./Register";
import Layout from "./Layout";
import Create from "./Create";
import PostPage from "./PostPage";
import {DetailsProvider}  from './DetailsProvider';
import { Routes, Route,} from 'react-router-dom';
import EditPost from './EditFile';
function App() {
  return (
    <DetailsProvider>
   <Routes>
    <Route path = "/" element = {<Layout />}>
      <Route index element = {<IndexPage/>} />
      <Route path = "/login" element = {<Login />}/>
      <Route path = "/register" element = {<Register />} />
      <Route path = "/create" element = {<Create />} />
      <Route path = "/posts/:id" element = {<PostPage />} />
      <Route path = "/edit/:pageId" element = {<EditPost/>} />
    </Route>
   </Routes>
   </DetailsProvider>
  );
}

export default App;
