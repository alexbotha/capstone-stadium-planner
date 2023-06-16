import React, { useContext } from "react";
import { UserContext } from "../context/user";

import { Card, Button, Col } from "react-bootstrap";

function StadiumItem({ stadium }) {
  const { loading } = useContext(UserContext);
  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <Col md={3} sm={6} xs={12}>
      <Card className="modern-card">
        <div className="card-image">
          <Card.Img variant="top" src={stadium.image_url} alt="stadium image" />
        </div>
        <Card.Body>
          <Card.Title>{stadium.name}</Card.Title>
          <Card.Text>{stadium.about}</Card.Text>
          <Button to={`/stadium/${stadium.id}`}>See more</Button>
        </Card.Body>
        <br></br>
      </Card>
    </Col>
  );
}

export default StadiumItem;
