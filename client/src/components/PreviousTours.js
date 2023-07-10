import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row } from "react-bootstrap";
import CreateReview from "./CreateReview";

function PreviousTours() {
  const [tourState, setTourState] = useState(null);
  const { loggedIn, user, loading, stadiums, setStadiums, error } =
    useContext(UserContext);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <h3>Your previous tours</h3>

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
                  {/* .some is used to iterate over our tour.reviews array, and checks to see if a review object exists for each tour object. It returns a boolean value dependant on the outcome which is returned in the new array created when we mapped over user.tours */}
                  {tour.reviews.some((review) => review) ? (
                    <Button>Edit Review</Button>
                  ) : (
                    <Button>Create Review</Button>
                  )}
                  {/* {tourState === null ? (
                    <>
                      <Button onClick={() => setTourState(tour)}>
                        Create a review
                      </Button>
                    </>
                  ) : (
                    <div className="calendar-overlay">
                      <div className="calendar-popup">
                        <CreateReview
                          setTourState={setTourState}
                          tourState={tourState}
                        />
                      </div>
                    </div>
                  )} */}
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </>
    );
  }
}

export default PreviousTours;
