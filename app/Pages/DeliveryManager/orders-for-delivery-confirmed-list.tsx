import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { FaBan, FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { proxy } from '../../conf';
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import routes from '../../constants/routes.json';
import { setEditingOrderDM, setEditingOrderDMId, setEditOrderDM, setExistingOrderDM } from './orderDM-slice';

const OrdersForDeliveryConfirmedList: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [showApproved, setShowApproved] = useState<boolean>(false);
  const [showRejected, setShowRejected] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [order, setOrder] = useState({});

  const [orders, setOrdersList] = useState<any>([]);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);


  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/orderLists/getDeliveryOrdersDManager`, {
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

  useEffect(() => {
    getOrders().then(() => {
    });
  }, [orders]);

  const handleApproved = async () => {
    console.log(order);
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/order/editOrderStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'deliveryConfirmed'
        })
      });
      await response.json();
      await dispatch(setExistingOrderDM(false));
      await dispatch(setEditingOrderDMId(id));
      await dispatch(setEditingOrderDM(order));
      await dispatch(setEditOrderDM(true));
      setRenderRedirectTo(true);
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
          status: 'deliveryRejected'
        })
      });
      await response.json();
      setRenderRedirectTo1(true);
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
    setShowRejected(false);
  };

  const handleClose = () => {
    setLoading(true);
    setShowApproved(false);
    setShowRejected(false);
    setLoading(false);
  };

  const handleShowApproved = (orderId: string, id: string, order: any) => {
    setLoading(true);
    setOrderId(orderId);
    setId(id);
    setOrder(order);
    setShowApproved(true);
    setLoading(false);
  };

  const handleShowRejected = (orderId: string) => {
    setLoading(true);
    setOrderId(orderId);
    setShowRejected(true);
    setLoading(false);
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.MAKE_PAYMENT} />;
    }
    return null;
  };

  const renderRedirect1 = () => {
    if (renderRedirectTo1) {
      return <Redirect to={routes.REJECTED_DM_LIST} />;
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
      {renderRedirect()}
      {renderRedirect1()}
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Orders for Delivery Confirmed</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          <div style={{
            marginTop: '4%'
          }}>
            <Modal show={showApproved}
                   onHide={handleClose}
                   orderId={orderId}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delivery</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to confrim this order?</Modal.Body>
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
                Estimated Amount
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Invoice Amount
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
                Delivery Date
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
                Supplier
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
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.supplierAmount}
                      </td>
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
                        {order.deliveryDate}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.siteName}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.supplierName}
                      </td>

                      <td style={{
                        textAlign: 'center'
                      }}>
                        <button onClick={() => handleShowApproved(order.orderId, order._id, order)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersForDeliveryConfirmedList;
