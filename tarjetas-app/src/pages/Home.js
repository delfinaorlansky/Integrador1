import React, { useState, useEffect } from 'react';
import {Container,Row,Col,Card, Button,Accordion} from 'react-bootstrap';
import {format} from 'date-fns';

export default function Home() {
    const [cards, setCards] = useState([]); 
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10')
  .then(response => response.json())
  .then(data => setCards(data.results));
      },[]);
    return (
     <Container>
       <Row>
       {cards.map((card) => (
              <Col className="p-3">
                <Accordion defaultActiveKey="0">
                <Card style={{ width: '18rem'}}>
                <Card.Img variant="top" src={card.picture.large}/>
                <Card.Body>
                  <Card.Title>{card.name.title} {card.name.first} {card.name.last} </Card.Title>
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
    </Container>

    
    
    );
    
  }

