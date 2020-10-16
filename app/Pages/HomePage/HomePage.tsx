import React from 'react';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';

const HomePage: React.FC = () => {
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
          <h1>Home</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          Home
        </div>
      </div>
    </div>
  );
};

export default HomePage;
