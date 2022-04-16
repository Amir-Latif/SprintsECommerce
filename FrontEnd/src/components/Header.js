import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button, NavItem, NavLink } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/home" className='pe-1'>Sprints Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="Activities" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/products">Products</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Item></Nav.Item>
    
                        </Nav>

                        <Form className="d-flex">
                            <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-secondary"><i className="fas fa-magnifying-glass"></i></Button>
                            <NavItem> <NavLink> <i className="fas fa-cart-shopping"></i> </NavLink> </NavItem>
                        </Form>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
        </header>
    );
  }
  
  export default Header;