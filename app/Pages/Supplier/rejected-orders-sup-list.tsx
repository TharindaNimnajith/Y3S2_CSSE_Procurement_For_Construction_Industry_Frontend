import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import {Redirect} from 'react-router-dom';
import { proxy } from '../../conf';
import NavBar from '../../components/NavBar/NavBar';

const RejectedOrdersSupList: React.FC = () => {
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
  const [orderId, setOrderId] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [order, setOrder] = useState({});

  const [orders, setOrdersList] = useState<any>([]);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);


  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/orderLists/getRejectedOrdersSupplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'supplierName': 'Jagath' })
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
    console.log(login);
    if(!login){
      setRenderRedirectToLogin(true);
    }
  }, [orders , login]);

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
          <h1>Supplier Rejected Orders</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          <div style={{
            marginTop: '4%'
          }}>

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
                Vendor Name
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

export default RejectedOrdersSupList;
