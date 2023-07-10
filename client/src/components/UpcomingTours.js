import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row } from "react-bootstrap";

function UpcomingTours() {
  const [stadium, setStadium] = useState(null);
  const { loggedIn, user, loading, stadiums, setStadiums, error } =
    useContext(UserContext);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <h3>Your upcoming tours</h3>

        <Row>
          {user.tours.map((tour) => (
            <>
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
                    <Card.Title>{tour.stadium.name}</Card.Title>
                    <Card.Title>Date: {tour.tour_date}</Card.Title>
                    <Card.Title>Time: {tour.start_time}</Card.Title>
                  </Card.Body>

                  {stadium === null ? (
                    <>
                      <Button onClick={() => setStadium(tour)}>
                        Edit booking
                      </Button>
                    </>
                  ) : (
                    <div className="calendar-overlay">
                      <div className="calendar-popup">
                        {/* <EditTicket
                          setStadium={setStadium}
                          stadium={stadium}
                        /> */}
                      </div>
                    </div>
                  )}
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </>
    );
  }
}

export default UpcomingTours;
