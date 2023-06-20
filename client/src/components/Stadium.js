import React, { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row, Container } from "react-bootstrap";

function Stadium() {
  const { stadiums, loading, loggedIn } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  if (loggedIn) {
    let stadium = stadiums.find((s) => s.id === parseInt(id));
    console.log("here", stadiums);

    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <Container className="container-padding-id">
        <Row>
          <Col md={6} className="mb-4">
            <Card className="specific-card">
              <div className="id-card">
                <Card.Img
                  variant="top"
                  src={stadium.image_url}
                  alt="stadium image"
                />
              </div>
              <Card.Body>
                <Card.Title className="stadium-name-id">
                  {stadium.name}
                </Card.Title>
                <Card.Text>{stadium.about}</Card.Text>
                <Card.Text>{stadium.address}</Card.Text>
                <Card.Text>{stadium.country}</Card.Text>
              </Card.Body>
              <br></br>
            </Card>
          </Col>
        </Row>
        <h3>Available tours</h3>
        {stadium.tours.map((tour) => (
          <div>
            <h3> Date: {tour.tour_date}</h3>
            <h3>Start time: {tour.start_time}</h3>
          </div>
        ))}
      </Container>
    );
  } else {
    return <h3>Please login</h3>;
  }
}

export default Stadium;
