import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {FaArrowAltCircleLeft, FaEdit} from 'react-icons/fa'
import {proxy} from '../../conf'
import {setOrderDM,setExistingOrderDM,setEditOrderDM,setEditingOrderDMId,setEditingOrderDM} from './orderDM-slice'
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

let errors_: string = ''
const methodList = ['Cash','Card'];

const MakePayment: React.FC = () => {
  const dispatch = useDispatch()


  let orderDMList = useSelector(
    (state: {
      orderDM: any
    }) => state.orderDM.orderDM
  )

  const editingOrderDMId = useSelector(
    (state: {
      orderDM: any
      editingOrderDMId: string
    }) => state.orderDM.editingOrderDMId
  )

  const editingOrderDM = useSelector(
    (state: {
      orderDM: any
      editingOrderDM: any
    }) => state.orderDM.editingOrderDM
  )

  const [loading, setLoading] = useState<boolean>(false)

  const [order, setOrder] = useState<{
    orderId: number,
    purchaseDate:string,
    requestedDate:string,
    deliveryDate:string,
    siteName:string,
    siteManager:string,
    supplierName:string,
    itemId: number,
    itemName:string,
    itemQuantity:string,
    totPrice:string,
    isRestricted:boolean,
    deliveryNote:string,
    status:string,
    invoiceId: string,
    supplierAmount:string
  }>({
    orderId: editingOrderDM.orderId,
    purchaseDate: editingOrderDM.purchaseDate,
    requestedDate: editingOrderDM.requestedDate,
    deliveryDate:editingOrderDM.deliveryDate,
    siteName: editingOrderDM.siteName,
    siteManager: editingOrderDM.siteManager,
    supplierName: editingOrderDM.supplierName,
    itemId:editingOrderDM.itemId,
    itemName: editingOrderDM.itemName,
    itemQuantity: editingOrderDM.itemQuantity,
    totPrice: editingOrderDM.totPrice,
    isRestricted:editingOrderDM.isRestricted,
    deliveryNote: editingOrderDM.deliveryNote,
    status: editingOrderDM.status,
    invoiceId: editingOrderDM.invoiceId,
    supplierAmount:editingOrderDM.supplierAmount

  })


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);


  const [paymentMethod, setPaymentMethod] = useState<string>('');

  useEffect(() => {
    setOrder(editingOrderDM)

  }, [editingOrderDM])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await dispatch(setExistingOrderDM(false))
     if (paymentMethod.trim() === '') {
      errors_ = 'Please select a value for payment method'
      await dispatch(setExistingOrderDM(true))
      setLoading(false)
    }

    const finalObjectGroup = {
    orderId: order.orderId,
    purchaseDate: order.purchaseDate,
    requestedDate: order.requestedDate,
    deliveryDate:order.deliveryDate,
    siteName: order.siteName,
    siteManager: order.siteManager,
    supplierName: order.supplierName,
    itemId:order.itemId,
    itemName: order.itemName,
    itemQuantity: order.itemQuantity,
    totPrice: order.totPrice,
    isRestricted:order.isRestricted,
    deliveryNote: order.deliveryNote,
    status: "paid",
    invoiceId: order.invoiceId,
    supplierAmount:order.supplierAmount
    };

    const finalObjectWithID = {
      orders: finalObjectGroup,
      id: editingOrderDMId
    };

    const finalObject = {
      invoiceId:order.invoiceId,
      orderId:order.orderId,
      paymentMethod,
      supplier:order.supplierName,
      amount:order.supplierAmount,
    };

    if (paymentMethod.trim() !== '') {

      try {
        await dispatch(setEditOrderDM(true))
        const response = await fetch(`${proxy}/order/editOrders`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectWithID)
        })
        const responseData = await response.json()
        if (responseData.exists) {
          errors_ = responseData.message
          await dispatch(setExistingOrderDM(true))
        }
        setRenderRedirectTo(true);
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }


      try {

        const response = await fetch(`${proxy}/payment/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        })
        const responseData = await response.json()
       console.log(responseData)
       setRenderRedirectTo1(true);
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    }
  }



  const handleChangePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setPaymentMethod(e.target.value);
    dispatch(setExistingOrderDM(false))
    setLoading(false)
  }


  const renderRedirect = () => {
    if (renderRedirectTo && renderRedirectTo1) {
      return <Redirect to={routes.TAGS_LIST_VIEW} />;
    }
    return null;
  };


  const handleBack = async () => {
    setLoading(true)
    await dispatch(setEditOrderDM(false))
    await dispatch(setEditingOrderDMId(''))
    await dispatch(setEditingOrderDM(null))
    await dispatch(setExistingOrderDM(false))
    setLoading(false)
  }

  return (
    <div style={{
      borderRadius: '8px',
      padding: '3% 9% 3% 9%',
      border: '2px solid #007bff',
      maxWidth: 'fit-content'
    }}>
      {renderRedirect()}
      <NavBar />
      <Form>
        <Form.Row style={{
          marginTop: '5%'
        }}>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control type='text'
                          value={order.invoiceId}
                  size='lg'/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formLocatedBuilding'>
            <Form.Label>Order ID</Form.Label>
            <Form.Control type='text'
                          value={order.orderId}

                          size='lg'>

            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomType'>
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control type='text'
                          value={order.supplierName}

                          size='lg'>

            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomCapacity'>
            <Form.Label>Amount</Form.Label>
            <Form.Control type='text'
                          value={order.supplierAmount}

                          size='lg'/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formLocatedBuilding'>
            <Form.Label>Payment Method</Form.Label>
            <Form.Control as='select'
                          value={paymentMethod}
                          onChange={handleChangePaymentMethod}
                          title='Please select the payment method.'
                          required
                          size='lg'>
               <option>Select</option>
                    {methodList?.map((method, index) => (
                      <option>{method}</option>
                    ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        {
          loading && (
            <Spinner animation='border'
                     style={{
                       textAlign: 'center',
                       marginLeft: '50%'
                     }}/>
          )
        }
        <Form.Row style={{
          marginTop: '10%'
        }}>
          <Form.Group>
            <Button variant='primary'
                    type='button'
                    onClick={handleBack}
                    style={{
                      marginLeft: '30%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaArrowAltCircleLeft style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }}/>
              Back
            </Button>
          </Form.Group>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '60%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>

             Make Payment
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
  )
}

export default MakePayment
