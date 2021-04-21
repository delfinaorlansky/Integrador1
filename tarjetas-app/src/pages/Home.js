import React, { useState, useEffect} from 'react';
import {Container,Row,Col,Card, Button,Accordion} from 'react-bootstrap';
import {format} from 'date-fns';

export default function Home() {
    const [cards, setCards] = useState([]); 
    const [quantity,setQuantity] = useState(9);
    const viewMore = () => { setQuantity(quantity +3); filldata(); };
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
    



    return (

     <Container>
          {/* <Row><Col><Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  </Form>
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

     <Row> <Col><Button type="button" onClick={viewMore} >Ver mas</Button></Col></Row>
    


    </Container>


      );}