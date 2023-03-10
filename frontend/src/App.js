import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useRef, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ContactUs from './screens/ContactUs';
import GooglePay from './screens/GooglePayScreen';
import TermsofService from './screens/TermsofService';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Refund from './screens/Refund';
import LoadingBar from 'react-top-loading-bar';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    toast.success('Logout Successfully' || 5000);
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    setProgress(40);
    setTimeout(() => {
      setProgress(500);
    }, 40);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <LoadingBar height={5} color="#f11946" progress={progress} />
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>VashishthMart</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-cart-plus" />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>
              {/* <Link className="linkstyle" to="/contactus">
                Contact Us
              </Link>
              &nbsp; */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  {/* <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link> */}
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/googlepay" element={<GooglePay />} />
              <Route path="/termsofservice" element={<TermsofService />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/refund" element={<Refund />} />

              {/* <Route path="/chat" element={<Chat />} /> */}

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/map" element={<ProtectedRoute></ProtectedRoute>} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <MDBFooter
            bgColor="light"
            className="text-center text-lg-start text-muted"
          >
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
              </div>

              <div>
                <Link
                  to="https://www/facebook.com/vashishthmart"
                  className="me-4 text-reset "
                >
                  <MDBIcon fab icon="facebook-f" />
                </Link>
                <Link
                  to="https://www.twitter.com/vashishthmart"
                  className="me-4 text-reset"
                >
                  <MDBIcon fab icon="twitter" />
                </Link>
                <Link
                  to="https://www.vashishthmart.onrender.com"
                  className="me-4 text-reset"
                >
                  <MDBIcon fab icon="google" />
                </Link>
                <Link
                  to="https://www.instagram.com/vashishthmart"
                  className="me-4 text-reset"
                >
                  <MDBIcon fab icon="instagram" />
                </Link>
                <Link
                  to="https://www.linkedin.com/vashishthmart"
                  className="me-4 text-reset"
                >
                  <MDBIcon fab icon="linkedin" />
                </Link>
                <Link
                  to="https://www.github.com/vashishthmart"
                  className="me-4 text-reset"
                >
                  <MDBIcon fab icon="github" />
                </Link>
              </div>
            </section>

            <section className="">
              <MDBContainer className="text-center text-md-start mt-5">
                <MDBRow className="mt-3">
                  <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      <MDBIcon icon="gem" className="me-3" />
                      VashishthMart
                    </h6>
                    <p>VashishthMart -- Shopping Website</p>
                  </MDBCol>

                  <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      VashishthMart Service
                    </h6>
                    <p>
                      <Link
                        to="/termsofservice"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        Terms of Service
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/privacypolicy"
                        className="text-reset  linkstyle"
                        onClick={handleClick}
                      >
                        Privacy Policy
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/refund"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        Cancellation and Refund Policy
                      </Link>
                    </p>
                    {/* <p>
                      <Link
                        to="/russian"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        Russian
                      </Link>
                    </p> */}
                  </MDBCol>

                  <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      Useful links
                    </h6>
                    <p>
                      <Link
                        to="/signin"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        Signin
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/profile"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        User Settings
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/orderhistory"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        Orders
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/contactus"
                        className="text-reset linkstyle"
                        onClick={handleClick}
                      >
                        Help
                      </Link>
                    </p>
                  </MDBCol>

                  <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                    <p>
                      <MDBIcon icon="home" className="me-2" />
                      Panipat, PN 132103, INDIA
                    </p>
                    <p>
                      <MDBIcon icon="envelope" className="me-3" />
                      main.vashishthmart@gmail.com
                    </p>
                    <p>
                      <MDBIcon icon="phone" className="me-3" /> +919870000000
                      (VIP NUMBER)
                    </p>
                    <p>
                      <MDBIcon icon="print" className="me-3" />{' '}
                      <Link to="/contactus" onClick={handleClick}>
                        {' '}
                        Contact Us
                      </Link>
                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>

            <div
              className="text-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              ?? 2023 VashishthMart - All Rights Reserved || Powered by
              Vashishthweb
            </div>
          </MDBFooter>
          {/* <div
            className="text-center p-3"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            Copyright ?? 2023. VashishthMart -- All Rights Reserved || POWERED BY
            VASHISHTHWEB
          </div> */}
        </footer>
      </div>
      <div></div>
    </BrowserRouter>
  );
}

export default App;
