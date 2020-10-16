import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { proxy } from '../../conf';
import { setExistingOrderSup } from './orderSup-slice';
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import routes from '../../constants/routes.json';

let errors_: string = '';


const GenerateInvoice: React.FC = () => {
  const dispatch = useDispatch();


  let orderSupList = useSelector(
    (state: {
      orderSup: any
    }) => state.orderSup.orderSup
  );

  const editingOrderSupId = useSelector(
    (state: {
      orderSup: any
      editingOrderSupId: string
    }) => state.orderSup.editingOrderSupId
  );

  const editingOrderSup = useSelector(
    (state: {
      orderSup: any
      editingOrderSup: any
    }) => state.orderSup.editingOrderSup
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [order, setOrder] = useState<{
    orderId: number,
    purchaseDate: string,
    requestedDate: string,
    deliveryDate: string,
    siteName: string,
    siteManager: string,
    supplierName: string,
    itemId: number,
    itemName: string,
    itemQuantity: string,
    totPrice: string,
    isRestricted: boolean,
    deliveryNote: string,
    status: string,
    invoiceId: string,
    supplierAmount: string
  }>({
    orderId: editingOrderSup.orderId,
    purchaseDate: editingOrderSup.purchaseDate,
    requestedDate: editingOrderSup.requestedDate,
    deliveryDate: editingOrderSup.deliveryDate,
    siteName: editingOrderSup.siteName,
    siteManager: editingOrderSup.siteManager,
    supplierName: editingOrderSup.supplierName,
    itemId: editingOrderSup.itemId,
    itemName: editingOrderSup.itemName,
    itemQuantity: editingOrderSup.itemQuantity,
    totPrice: editingOrderSup.totPrice,
    isRestricted: editingOrderSup.isRestricted,
    deliveryNote: editingOrderSup.deliveryNote,
    status: editingOrderSup.status,
    invoiceId: editingOrderSup.invoiceId,
    supplierAmount: editingOrderSup.supplierAmount

  });


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);


  const [invoiceId, setInvoiceId] = useState<string>('');
  const [supplierAmount, setSupplierAmount] = useState<string>('');

  useEffect(() => {
    setOrder(editingOrderSup);
    let a = order.orderId * 100;

    setInvoiceId(a);

  }, [editingOrderSup]);

  const handleSubmit = async (e: any) => {


    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);

    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingOrderSup(false));
    if (supplierAmount.trim() === '') {
      errors_ = 'Please enter a value for full amount';
      await dispatch(setExistingOrderSup(true));
      setLoading(false);
    }


    const finalObject = {
      deliveryDate: date,
      invoiceId,
      supplierAmount
    };

    console.log(finalObject);

    if (supplierAmount.trim() !== '') {
      try {

        const response = await fetch(`${proxy}/order/addInvoiceOrder/` + editingOrderSupId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        });
        const responseData = await response.json();
        console.log(responseData);
        setRenderRedirectTo(true);

      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }


    }
  };


  const handleChangeInvoiceId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInvoiceId(e.target.value);
    dispatch(setExistingOrderSup(false));
    setLoading(false);
  };


  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSupplierAmount(e.target.value);
    dispatch(setExistingOrderSup(false));
    setLoading(false);
  };


  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.PENDING_SUP_LIST} />;
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
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Generate Invoice</h1>
        </Col>
      </Row>
      <div className='container'>
        <div style={{
          borderRadius: '8px',
          padding: '3% 9% 3% 9%',
          border: '2px solid #007bff',
          maxWidth: 'fit-content'
        }}>


          <Form>
            <Form.Row style={{
              marginTop: '5%'
            }}>
              <Form.Group controlId='formRoomName'>
                <Form.Label>Order ID</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.orderId}
                              size='lg' />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formLocatedBuilding'>
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.siteManager}

                              size='lg'>

                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formRoomType'>
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.supplierName}

                              size='lg'>

                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formRoomCapacity'>
                <Form.Label>Invoice ID</Form.Label>
                <Form.Control type='text'
                              value={invoiceId}
                              disabled
                              size='lg' />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formLocatedBuilding'>
                <Form.Label>Full Amount</Form.Label>
                <Form.Control type='text'
                              value={supplierAmount}
                              onChange={handleChangeAmount}
                              placeholder='Enter Full Amount'
                              pattern='[0-9]+'
                              title='Please enter a valid room name.'
                              required
                              size='lg' />
              </Form.Group>
            </Form.Row>
            {
              loading && (
                <Spinner animation='border'
                         style={{
                           textAlign: 'center',
                           marginLeft: '50%'
                         }} />
              )
            }
            <Form.Row style={{
              marginTop: '10%'
            }}>

              <Form.Group>
                <Button variant='success'
                        type='submit'
                        onClick={handleSubmit}
                        style={{
                          marginLeft: '60%',
                          fontSize: 'large',
                          textTransform: 'uppercase'
                        }}>

                  Generate Invoice
                </Button>
              </Form.Group>
            </Form.Row>
            {
              errors_ && (
                <div style={{
                  color: 'red',
                  fontSize: '18px',
                  marginTop: '7px',
                  textAlign: 'center'
                }}>
                  {
                    errors_
                  }
                </div>
              )
            }
          </Form>

        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
