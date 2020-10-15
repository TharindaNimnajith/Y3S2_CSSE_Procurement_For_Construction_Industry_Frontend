import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingInventory, setEditingInventoryId, setEditInventory, setExistingInventory, setInventorys } from './inventory-slice';

let errors_: string = '';

const state = [
  'True',
  'False'
];

const InventorysAdd: React.FC = () => {
  const dispatch = useDispatch();

  let inventoryList = useSelector(
    (state: {
      inventorys: any
    }) => state.inventorys.inventorys
  );

  const existingInventory = useSelector(
    (state: {
      inventorys: any
      existingInventory: boolean
    }) => state.inventorys.existingInventory
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [inventory, setInventory] = useState<{
    itemId: string,
    itemName: string,
    unitPrice: string,
    unitsInStock: string,
    thresholdUnits: string,
    description: string,
    isRestricted: boolean
  }>({
    itemId: '',
    itemName: '',
    unitPrice: '',
    unitsInStock: '',
    thresholdUnits: '',
    description: '',
    isRestricted: false
  });

  const [isRestricted1 , setIsRestricted1] = useState<string>('False');


  useEffect(() => {



  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingInventory(false));
    if (inventory.itemName.trim() === '') {
      errors_ = 'Please enter a value for the item name.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.unitPrice.trim() === '') {
      errors_ = 'Please enter a value for the unit price.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.unitsInStock.trim() === '') {
      errors_ = 'Please enter a value for the units in stock.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.thresholdUnits.trim() === '') {
      errors_ = 'Please enter a value for the threshold units.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if ((inventory.description.trim()=== '')) {
      errors_ = 'Please enter a numerical value for the description.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    }
    if (inventory.itemName.trim() !== '' && inventory.unitPrice.trim() !== '' && inventory.unitsInStock.trim() !== ''
      && inventory.thresholdUnits.trim() !== '' && inventory.thresholdUnits.trim() !== '' ) {
      try {
        const response = await fetch(`${proxy}/inventory/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inventory)
        });
        const responseData = await response.json();
        inventoryList = { ...inventoryList, responseData };
        await dispatch(setInventorys(inventoryList));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingInventory(true));
        }
        await resetValues();
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangeItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, itemName: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeUnitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, unitPrice: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeUnitsInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, unitsInStock: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeThresholdUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, thresholdUnits: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, description: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };



  const handleChangeIsRestricted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    var a;
  if(e.target.value === 'True'){
      a = true;
  }
  else{
     a = false;
  }

    setInventory({ ...inventory, isRestricted: a });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };



  const resetValues = async () => {
    setLoading(true);

    inventory.itemName= '';
    inventory.unitPrice= '';
    inventory.unitsInStock= '';
    inventory.thresholdUnits= '';
    inventory.description= '';
    inventory.isRestricted = false;
    setLoading(false);
  };

  return (
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
            <Form.Label>Item Name</Form.Label>
            <Form.Control type='text'
                          value={inventory.itemName}
                          onChange={handleChangeItemName}
                          placeholder='Enter Item Name'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter a valid item name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control type='text'
                          value={inventory.unitPrice}
                          onChange={handleChangeUnitPrice}
                          placeholder='Enter Item Name'
                          pattern='[0-9]+'
                          title='Please enter a valid item name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Units In Stock</Form.Label>
            <Form.Control type='text'
                          value={inventory.unitsInStock}
                          onChange={handleChangeUnitsInStock}
                          placeholder='Enter Item Name'
                          pattern='[0-9]+'
                          title='Please enter a valid item name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Threshold Units</Form.Label>
            <Form.Control type='text'
                          value={inventory.thresholdUnits}
                          onChange={handleChangeThresholdUnit}
                          placeholder='Enter Item Name'
                          pattern='[0-9]+'
                          title='Please enter a valid item name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text'
                          value={inventory.description}
                          onChange={handleChangeDescription}
                          placeholder='Enter Item Name'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter a valid item name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId='formRoomType'>
            <Form.Label>isRestricted</Form.Label>
            <Form.Control as='select'
                          value={isRestricted1}
                          onChange={handleChangeIsRestricted}
                          title='Please select one option.'
                          size='lg'>
              <option value="">Select Option</option>
              {
                state.map((state: any) => {
                  return (
                    <option key={state}
                            value={state}>
                      {state}
                    </option>
                  );
                })
              }
            </Form.Control>
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
        <Form.Row>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '40%',
                      marginTop: '10%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaPlusCircle style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }} />
              Add Inventory
            </Button>
          </Form.Group>
        </Form.Row>
        {
          existingInventory && errors_ && (
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
  );
};

export default InventorysAdd;
