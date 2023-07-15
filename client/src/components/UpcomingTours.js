import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row } from "react-bootstrap";
import EditTicket from "./EditTicket";

function UpcomingTours() {
  const [stadium, setStadium] = useState(null);
  const [x, setX] = useState([]);
  const { loggedIn, user, loading } = useContext(UserContext);

  useEffect(() => {
    setX(user.tickets.filter((ticket) => ticket.upcoming_tours === true));
  }, [user]);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <h3>Your upcoming tours</h3>

        {user !== null && x.length > 0 ? (
          <Row>
            {user.tickets
              .filter((ticket) => ticket.upcoming_tours === true)
              .map((filteredTicket, index) => (
                <>
                  <Col md={3} sm={6} xs={12} className="mb-4" key={index}>
                    <Card className="modern-card">
                      <div className="card-image">
                        <Card.Img
                          variant="top"
                          src={filteredTicket.stadium.image_url}
                          alt="stadium image"
                        />
                      </div>
                      <Card.Body className="stadium-card-center">
                        <Card.Title>{filteredTicket.stadium.name}</Card.Title>
                        <Card.Title>
                          Date: {filteredTicket.tour.tour_date}
                        </Card.Title>
                        <Card.Title>
                          Time: {filteredTicket.tour.start_time}
                        </Card.Title>
                      </Card.Body>

                      {stadium === null ? (
                        <>
                          <Button onClick={() => setStadium(filteredTicket)}>
                            Edit booking
                          </Button>
                        </>
                      ) : (
                        <div className="calendar-overlay">
                          <div className="calendar-popup">
                            {
                              <EditTicket
                                setFilteredTicket={setStadium}
                                filteredTicket={stadium}
                              />
                            }
                          </div>
                        </div>
                      )}
                    </Card>
                  </Col>
                </>
              ))}
          </Row>
        ) : (
          <h3>You have no upcoming tours </h3>
        )}
      </>
    );
  }
}

export default UpcomingTours;
