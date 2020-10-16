import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';

const HomePage: React.FC = () => {
  var login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);

  useEffect(() => {
    console.log(login);
    if(!login){
      setRenderRedirectToLogin(true);
    }
  }, [login]);


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
