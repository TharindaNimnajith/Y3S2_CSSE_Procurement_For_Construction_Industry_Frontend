import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';

const HomePage: React.FC = () => {
  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);

  useEffect(() => {
    if (!login) {
      setRenderRedirectToLogin(true);
    }
  }, [login]);

  const renderRedirectLogin = () => {
    if (renderRedirectToLogin) {
      return <Redirect to={routes.USER} />;
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
          <h1>HomePage</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          Home
        </div>
      </div>
    </div>
  );
};

export default HomePage;
