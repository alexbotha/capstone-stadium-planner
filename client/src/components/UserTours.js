import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

function UserTours({ users }) {
  const { loggedIn, loading, error } = useContext(UserContext);
  const params = useParams();

  if (loggedIn) {
    const foundUser = users.find(({ id }) => id === parseInt(params.id));

    if (!foundUser) {
      return (
        <div className="error-text-color">
          <h3>No user exists</h3>
        </div>
      );
    }

    return loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <div className="my-account-details">
        <h3>
          You're viewing the stadium tours booked for - {""}
          <em className="user-tour-name">{foundUser.username}</em>
        </h3>
        <Row>
          {foundUser.tours.map((tour) => {
            return (
              <Col md={3} sm={6} xs={12} className="mb-4">
                <Card className="modern-card">
                  <div className="card-image">
                    <Card.Img
                      variant="top"
                      src={tour.stadium.image_url}
                      alt="stadium image"
                    />
                  </div>
                  <Card.Body className="stadium-card-center">
                    <Link to={`/stadiums/${tour.stadium.id}`}>
                      {tour.stadium.name}
                    </Link>
                    <p>Date: {tour.tour_date}</p>
                    <p></p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  } else {
    return (
      <div className="error-text-color">
        <h3>{error}</h3>
      </div>
    );
  }
}

export default UserTours;
