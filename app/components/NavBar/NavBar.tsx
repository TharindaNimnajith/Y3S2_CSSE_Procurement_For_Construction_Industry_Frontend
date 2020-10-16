import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import routes from '../../constants/routes.json';
import { useDispatch, useSelector } from 'react-redux';

import { setEditingUser, setEditingUserId, setEditUser, setExistingUser, setUsers ,setLogin,setUserType,setUserName} from '../../Pages/LoginSignup/user-slice';

//var user = "Procument Staff";
// var user = "Delivery Manager";
 //var user = "Manager";
// var user= "Admin";
// var user = "Supplier";


//var login = true ;
//var login = false ;





const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  var user1 = useSelector(
    (state: {
      users: any
      userType: string
    }) => state.users.userType
  );


  var login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );



  var handleLogout =() =>{
      dispatch(setLogin(false));
      dispatch(setUserType(''));
      dispatch(setUserName(''));



  }


  if(login){
    console.log(user1);
    if(user1 === ''){
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br />




               <NavLink to={routes.USER}>
               <Nav.Link href='#users'>
                 User Account
               </Nav.Link>
             </NavLink>

             <Nav.Link onClick={handleLogout}>
                  <Button
                    variant="outline-primary"
                    style={{
                      padding: "4px",
                      // margin: "4px 6px",
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

    if(user1 === "Procurement Staff"){
      return (

        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br />
      <NavLink to={routes.INVENTORY}>
      <Nav.Link href='#inventory'>
        Stock
      </Nav.Link>
    </NavLink>

    <NavDropdown title='Purchased Order Details'
    id='collasible-nav-dropdown'>
  <NavDropdown.Item href='#batches/pendingPS'>
  <NavLink to={routes.PURCHASE_ORDERS_FOR_APPROVING}>
  <Nav.Link href='#pendingPS'
       style={{
         color: 'black'
       }}>
  Purchase Orders for Approval
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  <NavDropdown.Divider/>
  <NavDropdown.Item href='#batches/confirmedPS'>
  <NavLink to={routes.CONFIRMED_PS_LIST}>
  <Nav.Link href='#confirmedPS'
       style={{
         color: 'black'
       }}>
  Approved Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  <NavDropdown.Divider/>
  <NavDropdown.Item href='#batches/rejectedPS'>
  <NavLink to={routes.REJECTED_PS_LIST}>
  <Nav.Link href='#rejectedPS'
       style={{
         color: 'black'
       }}>
  Rejected Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  </NavDropdown>


  <Nav.Link onClick={handleLogout}>
                  <Button
                    variant="outline-primary"
                    style={{
                      padding: "4px",
                      // margin: "4px 6px",
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                </Nav.Link>
  </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
    }


    if(user1 === "Supplier"){
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br />
      <NavDropdown title='Supplier Order Details'
      id='collasible-nav-dropdown'>
  <NavDropdown.Item href='#batches/pendingSUP'>
  <NavLink to={routes.PENDING_SUP_LIST}>
  <Nav.Link href='#pendingSUP'
         style={{
           color: 'black'
         }}>
  Pending Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  <NavDropdown.Divider/>
  <NavDropdown.Item href='#batches/confirmedSUP'>
  <NavLink to={routes.CONFIRMED_SUP_LIST}>
  <Nav.Link href='#confirmedSUP'
         style={{
           color: 'black'
         }}>
  Confirmed Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  <NavDropdown.Divider/>
  <NavDropdown.Item href='#batches/rejectedSUP'>
  <NavLink to={routes.REJECTED_SUP_LIST}>
  <Nav.Link href='#rejectedSUP'
         style={{
           color: 'black'
         }}>
  Rejected Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>

  </NavDropdown>

  <Nav.Link onClick={handleLogout}>
                  <Button
                    variant="outline-primary"
                    style={{
                      padding: "4px",
                      // margin: "4px 6px",
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                </Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );

        }

  if(user1 === "Delivery Manager"){
    return (
      <Navbar collapseOnSelect
              expand={false}
              bg='dark'
              variant='dark'
              style={{
                position: 'absolute',
                zIndex: 2,
                top: '7px'
              }}>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto float-left'
               style={{
                 height: '100vh'
               }}>
            <br />
    <NavDropdown title='Delivery Order Details'
    id='collasible-nav-dropdown'>
  <NavDropdown.Item href='#batches/pendingDM'>
  <NavLink to={routes.PENDING_DM_LIST}>
  <Nav.Link href='#pendingDM'
       style={{
         color: 'black'
       }}>
  Pending Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  <NavDropdown.Divider/>
  <NavDropdown.Item href='#batches/confirmedDM'>
  <NavLink to={routes.CONFIRMED_DM_LIST}>
  <Nav.Link href='#confirmedDM'
       style={{
         color: 'black'
       }}>
  Confirmed Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>
  <NavDropdown.Divider/>
  <NavDropdown.Item href='#batches/rejectedDM'>
  <NavLink to={routes.REJECTED_DM_LIST}>
  <Nav.Link href='#rejectedDM'
       style={{
         color: 'black'
       }}>
  Rejected Orders
  </Nav.Link>
  </NavLink>
  </NavDropdown.Item>

  </NavDropdown>

  <NavLink to={routes.PAYMENT_LIST}>
  <Nav.Link href='#paymentList'>
  Payment Details
  </Nav.Link>
  </NavLink>

  <Nav.Link onClick={handleLogout}>
                  <Button
                    variant="outline-primary"
                    style={{
                      padding: "4px",
                      // margin: "4px 6px",
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                </Nav.Link>
       </Nav>
       </Navbar.Collapse>
     </Navbar>
   );
  }



    if(user1 === "Manager"){
    return (
      <Navbar collapseOnSelect
              expand={false}
              bg='dark'
              variant='dark'
              style={{
                position: 'absolute',
                zIndex: 2,
                top: '7px'
              }}>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto float-left'
               style={{
                 height: '100vh'
               }}>
            <br />
            <NavLink to={routes.NEWUSERS}>
             <Nav.Link href='#newusers'>
               User Management
             </Nav.Link>
           </NavLink>

           <NavLink to={routes.INVENTORIES}>
             <Nav.Link href='#inventorys'>
               Inventory Management
             </Nav.Link>
           </NavLink>

            <NavLink to={routes.POLICY}>
            <Nav.Link href='#policy'>
              Policy Management
            </Nav.Link>
          </NavLink>






           <Nav.Link onClick={handleLogout}>
                  <Button
                    variant="outline-primary"
                    style={{
                      padding: "4px",
                      // margin: "4px 6px",
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );}
  }

  else{
    return (
      <Navbar collapseOnSelect
              expand={false}
              bg='dark'
              variant='dark'
              style={{
                position: 'absolute',
                zIndex: 2,
                top: '7px'
              }}>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto float-left'
               style={{
                 height: '100vh'
               }}>
            <br />




             <NavLink to={routes.USER}>
             <Nav.Link href='#users'>
               Login
             </Nav.Link>
           </NavLink>


          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

  }


};

export default NavBar;
