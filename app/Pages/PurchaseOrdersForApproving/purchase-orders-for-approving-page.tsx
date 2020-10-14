import React from 'react';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import PurchaseOrdersForApprovingList from './purchase-orders-for-approving-list';

const PurchaseOrdersForApprovingPage: React.FC = () => {
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
          <h1>Purchase Orders for Approval</h1>
        </Col>
      </Row>
      <div className='container'>
        <PurchaseOrdersForApprovingList />
      </div>
    </div>
  );
};

export default PurchaseOrdersForApprovingPage;
