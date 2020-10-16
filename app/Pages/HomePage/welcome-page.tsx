import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';



const WelcomePage: React.FC = () => {
  const dispatch = useDispatch()




  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar />
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Welcome Page</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='12'
               style={{
                 marginTop: '115px'
               }}>
            <div>
              Welcome to the system
            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default WelcomePage;
