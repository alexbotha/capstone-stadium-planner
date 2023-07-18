import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row } from "react-bootstrap";
import EditTicket from "./EditTicket";

function UpcomingTours() {
  const [stadium, setStadium] = useState(null);
  const [filteredTours, setFilteredTours] = useState([]);
  const { loggedIn, user, loading, setUser } = useContext(UserContext);

  useEffect(() => {
    setFilteredTours(user.tours.filter((tour) => tour.upcoming_tours === true));
  }, [user]);

  if (loggedIn) {
    function handleDelete(filteredTour) {
      let ticketId = filteredTour.tickets
        .filter((ticket) => ticket.user_id === user.id)
        .map((id) => parseInt(id.id));

      fetch(`/tickets/${ticketId}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          res.json().then((updatedUser) => {
            setUser(updatedUser);
          });
        }
      });
    }

    console.log(
      "filteredTours",
      filteredTours.map((filteredTour) => filteredTour.id)
    );

    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <h3 className="my-account-tours">Upcoming tours</h3>

        {user !== null && filteredTours.length > 0 ? (
          <Row>
            {filteredTours.map((filteredTour) => (
              <React.Fragment key={filteredTour.id}>
                <Col md={3} sm={6} xs={12} className="mb-4">
                  <Card className="modern-card">
                    <div className="card-image">
                      <Card.Img
                        variant="top"
                        src={filteredTour.stadium.image_url}
                        alt="stadium image"
                      />
                    </div>
                    <Card.Body className="stadium-card-center">
                      <Card.Title>{filteredTour.stadium.name}</Card.Title>
                      <Card.Title>Date: {filteredTour.tour_date}</Card.Title>
                      <Card.Title>Time: {filteredTour.start_time}</Card.Title>
                    </Card.Body>

                    {stadium === null ? (
                      <>
                        <Button onClick={() => setStadium(filteredTour)}>
                          Edit booking
                        </Button>
                        <div
                          className="handle-delete"
                          onClick={() => {
                            setStadium(null);
                            handleDelete(filteredTour);
                          }}
                        >
                          🗑️
                        </div>
                      </>
                    ) : (
                      <div className="calendar-overlay">
                        <div className="calendar-popup">
                          {
                            <EditTicket
                              setFilteredTour={setStadium}
                              filteredTour={stadium}
                            />
                          }
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              </React.Fragment>
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
