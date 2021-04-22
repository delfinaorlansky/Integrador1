import React, { useState, useEffect} from 'react';
import {Container,Row,Col,Card, Button,Accordion, Form} from 'react-bootstrap';
import {format} from 'date-fns';

export default function Home() {
    /** Sección de variables de estado */
    const [cards, setCards] = useState([]); 
    const [quantity,setQuantity] = useState(9);
    const [quantityToAdd,setQuantityToAdd] = useState(1); //Agrego una vairable al estado del componenente home 
    // que es la cantidad a agregar

    /**Sección de funciones del componente */
    const viewMore = () => { setQuantity(quantity +3); filldata(); }; //para ver tres mas cada vez que hacemos clik en ver mas
    const filldata = () => {  fetch('https://randomuser.me/api/?results= ' +quantity)
    .then(response => response.json())
    .then(data => setCards(data.results)); };
    useEffect(() => {
    
    filldata();
       
    }
      ,[]);
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

    return (
     <Container>
        <Row> 
          <Col>
          <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Ingrese Cantidad de tarjetas a agregar</Form.Label>
            <Form.Control type="number" min="1" max="100" placeholder="Ingrese cantidad" 
            onChange={(e)=>{
              if(e.target.value!='')
                setQuantityToAdd(e.target.value);
              }} />  
             {/* e= evento on change  */}
            <Button type="button" onClick={()=>addMore()}>Agregar</Button>
          </Form.Group>
          </Form>
          </Col>
        </Row>
       
          {/* <Row>
          <Col>
  </Col></Row> */}
       <Row>
       {cards.map((card) => (
              <Col className="p-3">
                <Accordion defaultActiveKey="1">
                <Card style={{ width: '18rem'}}>
                <Card.Img variant="top" src={card.picture.large}/>
                <Card.Body>
                  <Card.Title>{card.name.first} {card.name.last} <Button  onClick={() =>
removeCard(card.login.uuid)}>X</Button>
 </Card.Title>
                  <Card.Text> 
                  <a href={ "mailto:"+ card.email}>{card.email} </a>
                  <br></br> 
                  {format(new Date(card.dob.date),'dd/MM/yyyy')}  ({card.dob.age})
          
                  </Card.Text>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        View Detail
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                      <Card.Body>Location: {card.location.street.name} {card.location.street.number}, {card.location.city}, {card.location.postcode} 
                      <br></br> Register date: {format(new Date(card.registered.date),'dd/MM/yyyy')}  
                      <br></br> Phone: {card.phone}
                       </Card.Body>
                    </Accordion.Collapse>
                </Card.Body>
              </Card>
              </Accordion>

                
                
              </Col>
))}   
     </Row>
<Row>
    <Col>
      <Button type="button" onClick={viewMore} >Ver mas</Button>
     </Col>
</Row>
    


    </Container>


      );}