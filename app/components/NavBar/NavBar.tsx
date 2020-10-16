import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import routes from '../../constants/routes.json';

// let user = 'Procurement Staff';
// let user = 'Delivery Manager';
// let user = 'Manager';
// let user = 'Supplier';
let user = 'Test';

const NavBar: React.FC = () => {
  if (user === 'Procurement Staff') {
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (user === 'Supplier') {
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (user === 'Delivery Manager') {
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (user === 'Manager') {
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
            <NavLink to={routes.POLICY}>
              <Nav.Link href='#policy'
                        style={{
                          color: 'black'
                        }}>
                Policy
              </Nav.Link>
            </NavLink>
            <NavLink to={routes.INVENTORIES}>
              <Nav.Link href='#inventorys'>
                Inventory Details
              </Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
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
            <NavLink to={routes.INVENTORIES}>
              <Nav.Link href='#inventories'>
                Inventory Details
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
              <NavDropdown.Divider />
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
            <NavLink to={routes.POLICY}>
              <Nav.Link href='#policy'>
                Policy
              </Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default NavBar;
