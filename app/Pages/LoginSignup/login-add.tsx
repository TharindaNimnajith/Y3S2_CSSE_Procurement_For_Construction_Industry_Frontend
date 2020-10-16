import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingUser, setEditingUserId, setEditUser, setExistingUser, setUsers ,setLogin,setUserType,setUserName} from './user-slice';
import routes from '../../constants/routes.json';
import { Redirect } from 'react-router-dom';
let errors_: string = '';



const Login: React.FC = () => {
  const dispatch = useDispatch();

  let userList = useSelector(
    (state: {
      users: any
    }) => state.users.users
  );

  const existingUser = useSelector(
    (state: {
      users: any
      existingUser: boolean
    }) => state.users.existingUser
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<{
    email: string,
    password: string,

  }>({
    email: '',
    password: ''

  });

  const [isRestricted1 , setIsRestricted1] = useState<string>('False');
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);

  useEffect(() => {



  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingUser(false));
    if (user.email.trim() === '') {
      errors_ = 'Please enter a value for email.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    } else if (user.password.trim() === '') {
      errors_ = 'Please enter a value for password.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    }
    if (user.email.trim() !== '' && user.password.trim() !== '' ) {
      try {
        const response = await fetch(`${proxy}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const responseData = await response.json();



        if(responseData.login === 1){
          await dispatch(setLogin(true));
          await dispatch(setUserType(responseData.type));
          await dispatch(setUserName(responseData.name));
          console.log(responseData.login);
          console.log(responseData.name);
          console.log(responseData.type);
         console.log(responseData.message);
         setRenderRedirectTo(true);



        }

        if(responseData.login === 0){

          console.log(responseData.login);
          console.log(responseData.message);
          errors_ = responseData.message;
          await dispatch(setLogin(false));
          await dispatch(setUserType(''));
          await dispatch(setUserName(''));

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_='';
    setLoading(true);
    setUser({ ...user, email: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_='';
    setLoading(true);
    setUser({ ...user, password: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };





  const resetValues = async () => {
    setLoading(true);

    user.email= '';
    user.password= '';

    setLoading(false);
  };


  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.HOME} />;
    }
    return null;
  };

  return (

    <div style={{
      borderRadius: '8px',
      padding: '3% 9% 3% 9%',
      border: '2px solid #007bff',
      maxWidth: 'fit-content'
    }}>
       {renderRedirect()}

      <Form>

        <Form.Row style={{
          marginTop: '5%'
        }}>

          <Form.Group controlId='formRoomName'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
                          value={user.email}
                          onChange={handleChangeEmail}
                          placeholder='Enter Your Email'
                          title='Please enter a valid email.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          value={user.password}
                          onChange={handleChangePassword}
                          placeholder='Enter Your Password'
                          title='Please enter a valid password.'
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
              Login
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
  );
};

export default Login;
