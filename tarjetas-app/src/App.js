import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; //Requerido para css de bootstrap//
import Home from "./pages/Home"
import Users from "./pages/Users"
import About from "./pages/About"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
export default function App() {
  
  return (

    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>  */}
        <Navbar className= "Navbar"  expand="lg">
  <Navbar.Brand  href="#home">
    <h2> MyWallet.com </h2>
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link ><Link to="/home" className="link"  >Home</Link></Nav.Link>
      <Nav.Link > <Link to="/about"className="link" >About</Link></Nav.Link>
      <Nav.Link> <Link to="/users"className="link" >Users</Link></Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





