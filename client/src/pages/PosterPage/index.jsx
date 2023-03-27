import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
 
const PosterPage = () => {
   // const navigate = useNavigate();

   // useEffect(() => {

   // }, []);


   // const getUsers = async () => {
   //    try {
   //       const response = await axios.get('http://localhost:3001/users', {

   //       });
   //       // setUsers(response.data);
   //    } catch (error) {
   //       if (error.response) {
   //          console.log(error.response);
   //       }
   //    }

   // }

   return (
      <>
      <Header/>
         <Container>
            <Row>
               
            </Row>
         </Container>
      </>
   )
}
 
export default PosterPage;