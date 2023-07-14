import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row } from "react-bootstrap";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";

function PreviousTours() {
  const [tourState, setTourState] = useState(null);
  const [edit, setEdit] = useState(null);

  const { loggedIn, user, loading } = useContext(UserContext);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <h3>Your previous tours</h3>

        {user !== null ? (
          <Row>
            {user.tickets
              .filter((ticket) => ticket.upcoming_tours === false)
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
                      {/* .some is used to iterate over our tour.reviews array, and checks to see if a review object exists for each tour object. It returns a boolean value dependant on the outcome which is returned in the new array created when we mapped over user.tours */}
                      {/* {const p = user.tours.map((tour) =>
    tour.reviews.map((review) => review.review)
  );} */}

                      {user.reviews
                        .map((review) => review.tour_id)
                        .includes(filteredTicket.tour.id) ? (
                        <Button onClick={() => setEdit(filteredTicket)}>
                          Edit Review
                        </Button>
                      ) : (
                        <Button onClick={() => setTourState(filteredTicket)}>
                          Create Review
                        </Button>
                      )}
                      {edit === null ? null : (
                        <div className="calendar-overlay">
                          <div className="calendar-popup">
                            <EditReview setEdit={setEdit} edit={edit} />
                          </div>
                        </div>
                      )}
                      {tourState === null ? null : (
                        <div className="calendar-overlay">
                          <div className="calendar-popup">
                            <CreateReview
                              setTourState={setTourState}
                              tourState={tourState}
                            />
                          </div>
                        </div>
                      )}
                    </Card>
                  </Col>
                </>
              ))}
          </Row>
        ) : (
          <h3>not tours avail</h3>
        )}
      </>
    );
  }
}

export default PreviousTours;
