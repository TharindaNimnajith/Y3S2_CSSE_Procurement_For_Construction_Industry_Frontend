/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './policies.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import { setPolicies } from './policiesSlice';
import { proxy } from '../../conf';

// noinspection DuplicatedCode
const policies: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  // const value = useSelector();
  // const policiesStore = useSelector(
  //   (state: { subjects: any }) => state.subjects
  // );
  // const policiesSelected = policiesStore.policies.find(
  //   (item) => item._id === id
  // );
  // console.log(policiesSelected);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );

  const [error, setError] = useState<string | null>(null);
  // const [value, setValue] = useState<string>(
  //   policiesSelected.value
  // );
  const [policyObject, setPolicyObject] = useState<any>(null);
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/policy/getPolicies/:id`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
          }
        );

        const responseData = await response.json();
        setPolicyObject(responseData);
        dispatch(setPolicies(responseData));
        console.log(responseData);

        if (!responseData) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, []);

  // const renderRedirectToView = () => {
  //   if (subjectsObject) {
  //     return <Redirect to={routes.SUBJECTS_LIST_VIEW} />;
  //     //   props.history.push(loginState.redirectTo);s
  //   }
  //   return null;
  // };

  const handleSubmit = async () => {

    if (value === '') {
      setError('Please enter an Subject Code !');
      return;
    }
    setError(null);

    const finalObject = {
      value
    };

    console.log('finalObject');
    console.log(finalObject);

    try {
      const response = await fetch(`${proxy}/policy/editPolicies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ finalObject, id: poli._id })
      });

      const responseData = await response.json();
      setRenderRedirectTo(true);
      // console.log(responseData.userDetails);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.SUBJECTS_LIST_VIEW} />;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeValue= (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

  };

  return (
    <div
      style={{
        backgroundColor: '#37474F', height: '100vh'
      }}
    >
      {renderRedirect()}
      <NavBar />
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{ backgroundColor: '#343a40', color: '#fff' }}
        >
          <h3>Policies</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 ${styles.tagsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Policy Amount</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{ borderWidth: '2.5px' }}
                    value={value}
                    onChange={handleChangeValue}
                    placeholder="ex:- 100000"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3} />
          </Row>
          <Row style={{ textAlign: 'center' }}>
            <Col md={12}>{error && <p className={` ${styles.workingDaysHoursError}`} style={{
              fontSize: '19px',
              textShadow: '1px 0 0 red, -1px 0 0 red, 0 1px 0 red, 0 -1px 0 red, 1px 1px red, -1px -1px 0 red, 1px -1px 0 red, -1px 1px 0 red'
            }}>{error}</p>}</Col>
          </Row>
          <Row className="mb-2 justify-content-md-center">
            <Col xs={0} md={9} />
            <Col xs={12} md={2}>
              <Button
                style={{ width: '160px', fontSize: '1.3em' }}
                onClick={handleSubmit}
              >
                Update Policy
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default policies;
