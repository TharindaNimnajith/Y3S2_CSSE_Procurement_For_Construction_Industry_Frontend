import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import InventorysList from './inventory-list';
import InventorysEdit from './inventory-edit';
import InventorysAdd from './inventory-add';


const InventorysPage: React.FC = () => {
  const dispatch = useDispatch();

  // dispatch(setEditBuilding(false))
  // dispatch(setEditingBuildingId(''))
  // dispatch(setEditingBuilding(null))
  // dispatch(setExistingBuilding(false))
  // dispatch(setExistingRoomsForBuilding(false))
  //
  // dispatch(setRoomUnavailability(false))
  // dispatch(setUnavailableRoom(null))

  let route: any;

  const editInventory = useSelector(
    (state: {
      inventorys: any
      editInventory: boolean
    }) => state.inventorys.editInventory
  );

  if (editInventory)
    route = (<InventorysEdit />);
  else
    route = (<InventorysAdd />);

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
          <h1>Stock Details</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='4'
               style={{
                 marginTop: '115px'
               }}>
            <div>
              {
                route
              }
            </div>
          </Col>
          <Col sm='8'>
            <div>
              <InventorysList />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InventorysPage;
