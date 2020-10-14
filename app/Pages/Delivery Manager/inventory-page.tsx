import React from 'react';
// import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import InventoryList from './inventory-list';
// import InventoryEdit from './inventory-edit'
// import InventoryAdd from './inventory-add'
// import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
// import {
//   setEditBuilding,
//   setEditingBuilding,
//   setEditingBuildingId,
//   setExistingBuilding,
//   setExistingRoomsForBuilding
// } from '../Buildings/buildings-slice'

const InventoryPage: React.FC = () => {
  // const dispatch = useDispatch()

  // dispatch(setEditBuilding(false))
  // dispatch(setEditingBuildingId(''))
  // dispatch(setEditingBuilding(null))
  // dispatch(setExistingBuilding(false))
  // dispatch(setExistingRoomsForBuilding(false))
  //
  // dispatch(setRoomUnavailability(false))
  // dispatch(setUnavailableRoom(null))

  // let route: any
  //
  // const editRoom = useSelector(
  //   (state: {
  //     rooms: any
  //     editRoom: boolean
  //   }) => state.rooms.editRoom
  // )

  // if (editRoom)
  //   route = (<InventoryEdit/>)
  // else
  //   route = (<InventoryAdd/>)

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
          <h1>Stock</h1>
        </Col>
      </Row>
      <div className='container'>
        {/*<Row>*/}
        {/*  <Col sm='4'*/}
        {/*       style={{*/}
        {/*         marginTop: '115px'*/}
        {/*       }}>*/}
        {/*    <div>*/}
        {/*      {*/}
        {/*        route*/}
        {/*      }*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*  <Col sm='8'>*/}
        <div>
          <InventoryList />
        </div>
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    </div>
  );
};

export default InventoryPage;
