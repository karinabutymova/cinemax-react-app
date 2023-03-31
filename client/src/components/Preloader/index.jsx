import React from 'react';
import { Col, Row } from 'styled-bootstrap-grid';
import { Box, Circle, ContainerBox } from './styled';

const Preloader = () => {
   return (
      <Row justifyContent='center'>
         <Col col="6">
            <Box>
               <ContainerBox>
                  <Circle/>
                  <Circle/>
                  <Circle/>
                  <Circle/>
               </ContainerBox>
            </Box>
         </Col>
      </Row>

   );
}
export default Preloader;