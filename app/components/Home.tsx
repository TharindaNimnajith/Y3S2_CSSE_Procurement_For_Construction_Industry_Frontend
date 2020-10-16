import React from 'react';
import UsersPage from '../Pages/LoginSignup/user-page';
import WelcomePage from '../Pages/Homepage/welcome-page';
import { useDispatch, useSelector } from 'react-redux';

export default function Home(): JSX.Element {

  var login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  if(login){
    return (
    <div>
      <WelcomePage />
      </div>
    );
  }
  else{
    return (
      <div>
        <UsersPage />
      </div>
    );
  }

}
