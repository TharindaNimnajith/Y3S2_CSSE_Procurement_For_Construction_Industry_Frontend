import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Spinner } from 'react-bootstrap';
import { FaBan, FaCheck } from 'react-icons/fa';
import { proxy } from '../../conf';

const PurchaseOrdersForApprovingList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [refresh, setRefresh] = useState<boolean>(true);
  const [showApproved, setShowApproved] = useState<boolean>(false);
  const [showRejected, setShowRejected] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  // const [room, setRoom] = useState<string>('');
  const [orders, setOrdersList] = useState<any>([]);
  // const [rooms, setRoomsList] = useState<any>([])
  // const [possibleRooms, setPossibleRoomsList] = useState<any>([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/orderLists/getPendingOrders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setOrdersList(responseData);
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
  };

  // const getRooms = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch(`${proxy}/roomsForOrders/rooms`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     const responseData = await response.json()
  //     setRoomsList(responseData)
  //     setLoading(false)
  //   } catch (errors) {
  //     errors_ = errors
  //     setLoading(false)
  //     console.log(errors)
  //   }
  // }

  // const setPossibleRoomsForOrders = async () => {
  //   setRefresh(false);
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${proxy}/roomsForOrders/setPossibleRoomsForOrders`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     await response.json();
  //     setLoading(false);
  //   } catch (errors) {
  //     errors_ = errors;
  //     setLoading(false);
  //     console.log(errors);
  //   }
  // };

  useEffect(() => {
    getOrders().then(() => {
    });
    // getRooms().then(() => {
    // })
    // if (refresh) {
    //   setPossibleRoomsForOrders().then(() => {
    //   });
    // }
  }, [orders]);

  const handleApproved = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/order/editOrderStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'pApproved'
        })
      });
      await response.json();
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
    setShowApproved(false);
  };

  const handleRejected = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/order/editOrderStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'pRejected'
        })
      });
      await response.json();
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
    setShowRejected(false);
  };

  // const getPossibleRoomsForOrder = async (id: string) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${proxy}/roomsForOrders/getPossibleRoomsForOrder/` + id, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const responseData = await response.json();
  //     // if (responseData.length === 0)
  //     //   setPossibleRoomsList(rooms)
  //     // else
  //     setPossibleRoomsList(responseData);
  //     setLoading(false);
  //   } catch (errors) {
  //     errors_ = errors;
  //     setLoading(false);
  //     console.log(errors);
  //   }
  // };

  // const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLoading(true);
  //   setRoom(e.target.value);
  //   setLoading(false);
  // };

  const handleClose = () => {
    setLoading(true);
    setShowApproved(false);
    setShowRejected(false);
    setLoading(false);
  };

  // const handleSubmit = () => {
  //   setLoading(true);
  //   // editOrder().then(() => setShow(false));
  //   setLoading(false);
  // };

  const handleShowApproved = (orderId: string) => {
    setLoading(true);
    // setRoom(roomRef);
    setOrderId(orderId);
    // getPossibleRoomsForOrder(orderId).then(() => {
    // });
    setShowApproved(true);
    setLoading(false);
  };

  const handleShowRejected = (orderId: string) => {
    setLoading(true);
    // setRoom(roomRef);
    setOrderId(orderId);
    // getPossibleRoomsForOrder(orderId).then(() => {
    // });
    setShowRejected(true);
    setLoading(false);
  };

  return (
    <div>
      <div style={{
        marginTop: '4%'
      }}>
        <Modal show={showApproved}
               onHide={handleClose}
               orderId={orderId}>
          <Modal.Header closeButton>
            <Modal.Title>Approve Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to approve this order?</Modal.Body>
          <Modal.Footer>
            <Button variant='success'
                    onClick={handleClose}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              No
            </Button>
            <Button variant='primary'
              onClick={handleApproved}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Yes
            </Button>
          </Modal.Footer>
          {
            loading && (
              <Spinner animation='border'
                       style={{
                         textAlign: 'center',
                         marginLeft: '50%'
                       }} />
            )
          }
        </Modal>
        <Modal show={showRejected}
               onHide={handleClose}
               orderId={orderId}>
          <Modal.Header closeButton>
            <Modal.Title>Reject Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to reject this order?</Modal.Body>
          <Modal.Footer>
            <Button variant='success'
                    onClick={handleClose}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              No
            </Button>
            <Button variant='danger'
                    onClick={handleRejected}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Yes
            </Button>
          </Modal.Footer>
          {
            loading && (
              <Spinner animation='border'
                       style={{
                         textAlign: 'center',
                         marginLeft: '50%'
                       }} />
            )
          }
        </Modal>
        {/*<Modal show={show}*/}
        {/*       onHide={handleClose}*/}
        {/*       orderId={orderId}>*/}
        {/*  <Modal.Header closeButton>*/}
        {/*    <Modal.Title style={{*/}
        {/*      textTransform: 'uppercase',*/}
        {/*      marginLeft: '36%'*/}
        {/*    }}>*/}
        {/*      Add Room*/}
        {/*    </Modal.Title>*/}
        {/*  </Modal.Header>*/}
        {/*  <Modal.Body>*/}
        {/*    <Form style={{*/}
        {/*      marginLeft: '10%'*/}
        {/*    }}>*/}
        {/*      <Form.Row style={{*/}
        {/*        marginTop: '3%'*/}
        {/*      }}>*/}
        {/*        <Form.Group controlId='formOrderId'>*/}
        {/*          <Form.Label>Order ID</Form.Label>*/}
        {/*          <Form.Control type='text'*/}
        {/*                        value={orderId}*/}
        {/*                        disabled*/}
        {/*                        size='lg' />*/}
        {/*        </Form.Group>*/}
        {/*      </Form.Row>*/}
        {/*      <Form.Row style={{*/}
        {/*        marginTop: '3%'*/}
        {/*      }}>*/}
        {/*        <Form.Group controlId='formRoomName'>*/}
        {/*          <Form.Label>Room Name</Form.Label>*/}
        {/*          <Form.Control as='select'*/}
        {/*                        value={room}*/}
        {/*                        onChange={handleChangeRoom}*/}
        {/*                        title='Please select the room.'*/}
        {/*                        required*/}
        {/*                        size='lg'>*/}
        {/*            <option value="">Select Room</option>*/}
        {/*            {*/}
        {/*              possibleRooms && possibleRooms.map((room: any) => {*/}
        {/*                return (*/}
        {/*                  <option key={room._id}*/}
        {/*                          value={room.roomName}>*/}
        {/*                    {room.roomName}*/}
        {/*                  </option>*/}
        {/*                );*/}
        {/*              })*/}
        {/*            }*/}
        {/*          </Form.Control>*/}
        {/*        </Form.Group>*/}
        {/*      </Form.Row>*/}
        {/*    </Form>*/}
        {/*  </Modal.Body>*/}
        {/*  <Modal.Footer>*/}
        {/*    <Button variant='primary'*/}
        {/*            onClick={handleClose}*/}
        {/*            style={{*/}
        {/*              textTransform: 'uppercase'*/}
        {/*            }}>*/}
        {/*      Close*/}
        {/*    </Button>*/}
        {/*    <Button variant='success'*/}
        {/*            onClick={handleSubmit}*/}
        {/*            style={{*/}
        {/*              textTransform: 'uppercase'*/}
        {/*            }}>*/}
        {/*      Submit*/}
        {/*    </Button>*/}
        {/*  </Modal.Footer>*/}
        {/*  {*/}
        {/*    loading && (*/}
        {/*      <Spinner animation='border'*/}
        {/*               style={{*/}
        {/*                 textAlign: 'center',*/}
        {/*                 marginLeft: '50%'*/}
        {/*               }} />*/}
        {/*    )*/}
        {/*  }*/}
        {/*</Modal>*/}
        <Table responsive
               striped
               bordered
               hover
               size='sm'
               style={{
                 border: 'solid darkblue 1px'
               }}>
          <thead style={{
            backgroundColor: '#0350a2'
          }}>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderLeft: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Order ID
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Item Name
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Quantity
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Amount
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Is Restricted
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Created Date
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Requested Date
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Site
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Site Manager
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Supplier
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Notes
          </th>
          <th colSpan={2}
              style={{
                borderBottom: 'solid darkblue 1px',
                borderRight: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px'
              }} />
          </thead>
          <tbody>
          {
            orders && orders.map((order: any) => {
              return (
                <tr key={order._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.orderId}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.itemName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.itemQuantity}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.totPrice}
                  </td>
                  {
                    order.isRestricted ? (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        True
                      </td>
                    ) : (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        False
                      </td>
                    )
                  }
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.purchaseDate}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.requestedDate}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.siteName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.siteManager}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.supplierName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.deliveryNote}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => handleShowApproved(order.orderId)}
                            style={{
                              color: 'darkgreen',
                              backgroundColor: 'transparent',
                              border: 'none'
                            }}>
                      <FaCheck size={20} />
                    </button>
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => handleShowRejected(order.orderId)}
                            style={{
                              color: 'red',
                              backgroundColor: 'transparent',
                              border: 'none'
                            }}>
                      <FaBan size={20} />
                    </button>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>
        {/*{*/}
        {/*  errors_ && (*/}
        {/*    <div style={{*/}
        {/*      color: 'red',*/}
        {/*      fontSize: '18px',*/}
        {/*      marginTop: '7px',*/}
        {/*      textAlign: 'center'*/}
        {/*    }}>*/}
        {/*      {*/}
        {/*        errors_*/}
        {/*      }*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*}*/}
      </div>
    </div>
  );
};

export default PurchaseOrdersForApprovingList;
