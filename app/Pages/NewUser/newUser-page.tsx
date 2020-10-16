import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import {Redirect} from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import NewUsersList from './newUser-list';
import NewUserEdit from './newUser-edit';
import NewUserAdd from './newUser-add';
import { setEditingUser, setEditingUserId, setEditUser, setExistingUser, setUsers ,setLogin,setUserType,setUserName} from './newUser-slice';


const NewUsersPage: React.FC = () => {
  let route: any;

  const editUser = useSelector(
    (state: {
      newusers: any
      editUser: boolean
    }) => state.newusers.editUser
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

  if (editUser)
    route = (<NewUserEdit />);
  else
    route = (<NewUserAdd />);

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
              <NewUsersList />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewUsersPage;
