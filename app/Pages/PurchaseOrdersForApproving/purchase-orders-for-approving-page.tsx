import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import {Redirect} from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import PurchaseOrdersForApprovingList from './purchase-orders-for-approving-list';

const PurchaseOrdersForApprovingPage: React.FC = () => {

  var login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);

  useEffect(() => {
    console.log(login);
    if(!login){
      setRenderRedirectToLogin(true);
    }
  }, [login]);


  const renderRedirectLogin = () => {
    if (renderRedirectToLogin) {
      return <Redirect to={routes.USER}/>;
    }
    return null;
  };

  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar />
      {renderRedirectLogin()}
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
