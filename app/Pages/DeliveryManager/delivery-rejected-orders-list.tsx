import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner, Table,Col, Row } from 'react-bootstrap';
import { FaBan, FaCheck } from 'react-icons/fa';
import { proxy } from '../../conf';

import NavBar from '../../components/NavBar/NavBar';

const DeliveryRejectedOrdersList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showApproved, setShowApproved] = useState<boolean>(false);
  const [showRejected, setShowRejected] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [orders, setOrdersList] = useState<any>([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/orderLists/getDeliveryRejectedDManager`, {
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

  const handleShowApproved = (orderId: string) => {
    setLoading(true);
    setOrderId(orderId);
    setShowApproved(true);
    setLoading(false);
  };

  const handleShowRejected = (orderId: string) => {
    setLoading(true);
    setOrderId(orderId);
    setShowRejected(true);
    setLoading(false);
  };

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
          <h1>Delivery Confirmed Orders</h1>
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

export default DeliveryRejectedOrdersList;
