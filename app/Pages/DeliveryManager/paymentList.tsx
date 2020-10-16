import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import { proxy } from '../../conf';
import NavBar from '../../components/NavBar/NavBar';

const PaymentList: React.FC = () => {
  const dispatch = useDispatch();

  var login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [showApproved, setShowApproved] = useState<boolean>(false);
  const [showRejected, setShowRejected] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [pay, setPayment] = useState({});

  const [payments, setPaymentsList] = useState<any>([]);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);


  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/payment/getPayments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log(responseData);
      setPaymentsList(responseData.payments);

      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
  };

  useEffect(() => {
    getPayments().then(() => {
    });

    console.log(login);
    if(!login){
      setRenderRedirectToLogin(true);
    }

  });


  const deletePayment = async () => {
    console.log(id);
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/payment/deletePayments`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      await response.json();


      setLoading(false);
    } catch (errors) {

      setLoading(false);
      console.log(errors);
    }
    setShowApproved(false);
  };


  const handleClose = () => {
    setLoading(true);
    setShowApproved(false);
    setShowRejected(false);
    setLoading(false);
  };

  const handleShowApproved = (paymentId: string, id: string, payment: any) => {
    setLoading(true);
    setPaymentId(paymentId);
    setId(id);
    setPayment(payment);
    setShowApproved(true);
    setLoading(false);
  };

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
          <h1>Payment Details</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          <div style={{
            marginTop: '4%'
          }}>
            <Modal show={showApproved}
                   onHide={handleClose}
                   paymentId={paymentId}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Record</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
              <Modal.Footer>
                <Button variant='success'
                        onClick={handleClose}
                        style={{
                          textTransform: 'uppercase'
                        }}>
                  No
                </Button>
                <Button variant='primary'
                        onClick={deletePayment}
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
                Payment ID
              </th>
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
                Invoice ID
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
                Payment Method
              </th>

              <th
                style={{
                  borderBottom: 'solid darkblue 1px',
                  borderRight: 'solid darkblue 1px',
                  borderTop: 'solid darkblue 1px'
                }} />
              </thead>
              <tbody>
              {

                payments && payments.map((payment: any) => {

                  return (
                    <tr key={payment._id}>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.paymentId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.orderId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.invoiceId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.supplier}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.amount}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.paymentMethod}
                      </td>

                      <td style={{
                        textAlign: 'center'
                      }}>
                        <button onClick={() => handleShowApproved(payment.paymentId, payment._id, payment)}
                                style={{
                                  color: 'darkgreen',
                                  backgroundColor: 'transparent',
                                  border: 'none'
                                }}>
                          <FaTrashAlt size={20} />
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

export default PaymentList;
