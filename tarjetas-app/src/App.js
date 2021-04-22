import React, { useState, useEffect} from "react";
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
  // Seccion de variables
  const [cards, setCards] = useState([]); 
  const [quantity,setQuantity] = useState(9);
  const [nombre, setNombre ] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad ] = useState("");
  const [quantityToAdd,setQuantityToAdd] = useState(1); //Agrego una vairable al estado del componenente home 

    // que es la cantidad a agregar

  //Seccion de funciones

  const search= ()=> {
    setCards(cards.filter(filter=>filter.name.first.toUpperCase()==nombre.toUpperCase() || filter.name.last.toUpperCase()==apellido.toUpperCase() || filter.dob.age== edad))
  
  }

  const filldata = () => {  fetch('https://randomuser.me/api/?results= ' +quantity)
  .then(response => response.json())
  .then(data => setCards(data.results)); };
  useEffect(() => {
  
  filldata();
     
  }
    ,[]);
   /**Sección de funciones del componente */
   const viewMore = () => { setQuantity(quantity +3); filldata(); }; //para ver tres mas cada vez que hacemos clik en ver mas
 
   const removeCard = uuid => {

       const cardsRemoved = cards.filter(card => card.login.uuid !== 
   uuid);
        setCards(cardsRemoved);
     };

     const addMore = ()=>{
       fetch('https://randomuser.me/api/?results= ' +quantityToAdd)
   .then(response => response.json())
   .then(data => {
     setCards([...cards,...data.results]);    
   }); 

     };

     const addQuantity = (value) => setQuantityToAdd(value);

     const orderByName = () => setCards(cards.sort((a,b)=>{
       console.log (a.name.first)
      if (a.name.first < b.name.first)
       return -1;
       if (a.name.first > b.name.first)
       return 1;
       return 0;
      
       
     }));

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
      <FormControl type="text" placeholder="Nombre" className="mr-sm-2" onChange={(e)=>setNombre(e.target.value)} />
      <FormControl type="text" placeholder="Apellido" className="mr-sm-2" onChange={(e)=>setApellido(e.target.value)} />
      <FormControl type="text" placeholder="Edad" className="mr-sm-2" onChange={(e)=>setEdad(e.target.value)}/>
      <Button variant="outline-success" onClick={()=> search()}>Search</Button> 
      <Button variant="outline-success" onClick={()=> orderByName()}> Order By Name </Button>
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
            <Home cards={cards} filldata={filldata} quantity={quantity} quantityToAdd={quantityToAdd} viewMore={viewMore} addMore={addMore} removeCard={removeCard} addQuantity={addQuantity}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





