import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import {Redirect} from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import InventoriesList from './inventory-list';
import InventoriesEdit from './inventory-edit';
import InventoriesAdd from './inventory-add';

const InventoriesPage: React.FC = () => {
  let route: any;

  const editInventory = useSelector(
    (state: {
      inventories: any
      editInventory: boolean
    }) => state.inventories.editInventory
  );


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

  if (editInventory)
    route = (<InventoriesEdit />);
  else
    route = (<InventoriesAdd />);

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
          <h1>Stock Details</h1>
        </Col>
      </Row>
      <div>
        <Row style={{
          marginLeft: '15%',
          marginRight: '15%'
        }}>
          <Col sm='4'>
            <div>
              {
                route
              }
            </div>
          </Col>
          <Col sm='8'>
            <div>
              <InventoriesList />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InventoriesPage;
