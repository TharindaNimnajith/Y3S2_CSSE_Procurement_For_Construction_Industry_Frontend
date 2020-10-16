import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import { Redirect } from 'react-router';



const WelcomePage: React.FC = () => {
  const dispatch = useDispatch()


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
          <h1>Welcome Page</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='12'
               style={{
                 marginTop: '115px'
               }}>
            <div>
              Welcome to the system
            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default WelcomePage;
