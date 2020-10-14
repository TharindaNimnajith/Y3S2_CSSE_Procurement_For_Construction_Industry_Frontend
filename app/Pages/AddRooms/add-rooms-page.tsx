import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import AddRoomsForm from './add-rooms-form';
import { setRoomUnavailability, setUnavailableRoom } from '../RoomsUnavailability/rooms-unavailability-slice';
import { setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom } from '../Rooms/rooms-slice';
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice';

const AddRoomsPage: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setEditRoom(false));
  dispatch(setEditingRoomId(''));
  dispatch(setEditingRoom(null));
  dispatch(setExistingRoom(false));

  dispatch(setEditBuilding(false));
  dispatch(setEditingBuildingId(''));
  dispatch(setEditingBuilding(null));
  dispatch(setExistingBuilding(false));
  dispatch(setExistingRoomsForBuilding(false));

  dispatch(setRoomUnavailability(false));
  dispatch(setUnavailableRoom(null));

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
          <h1>Add Preferred Rooms</h1>
        </Col>
      </Row>
      <div className='container'>
        <AddRoomsForm />
      </div>
    </div>
  );
};

export default AddRoomsPage;
