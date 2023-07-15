import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";

import { Card, Button, Col } from "react-bootstrap";

function StadiumItem({ stadium }) {
  const { loading } = useContext(UserContext);
  const [selectedStadium, setSelectedStadium] = useState([]);

  useEffect(() => {
    setSelectedStadium(stadium);
  }, [stadium]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <>
      {selectedStadium.length !== 0 ? (
        <Col md={3} sm={6} xs={12} className="mb-4">
          <Card className="modern-card">
            <div className="card-image">
              <Card.Img
                variant="top"
                src={selectedStadium.image_url}
                alt="stadium image"
              />
            </div>
            <Card.Body className="stadium-card-center">
              <Card.Title>{selectedStadium.name}</Card.Title>
              <Card.Title>{selectedStadium.average_rating}/5</Card.Title>
              <Button as={Link} to={`/stadiums/${selectedStadium.id}`}>
                See more
              </Button>
            </Card.Body>
            <br />
          </Card>
        </Col>
      ) : null}
    </>
  );
}

export default StadiumItem;

// The button component in react bootstrap does not have a to prop for redirection. We use the as prop on the Button component and set it to Link which we import from react-router-dom. This allows the Button component to act "as" a link. This allows us to then use the "to" prop to navigate to the specific route we want upon clicking the button
