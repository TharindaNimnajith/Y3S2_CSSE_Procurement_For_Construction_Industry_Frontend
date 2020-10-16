import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import { setEditingUser, setEditingUserId, setEditUser, setExistingUser, setUsers ,setLogin,setUserType,setUserName} from './user-slice';
import Login from './login-add'
import Signup from './signup-add'


const UsersPage: React.FC = () => {
  const dispatch = useDispatch()

  // dispatch(setEditBuilding(false))
  // dispatch(setEditingBuildingId(''))
  // dispatch(setEditingBuilding(null))
  // dispatch(setExistingBuilding(false))
  // dispatch(setExistingRoomsForBuilding(false))
  //
  // dispatch(setRoomUnavailability(false))
  // dispatch(setUnavailableRoom(null))



  const editUser = useSelector(
    (state: {
      users: any
      editUser: boolean
    }) => state.users.editUser
  )



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
          <h1>User Account</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='4'
               style={{
                 marginTop: '115px'
               }}>
            <div>

              <Login/>
            </div>
          </Col>
          <Col sm='4'
               style={{
                 marginTop: '115px'
               }}>
            <div>

              <Signup/>
            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default UsersPage;
