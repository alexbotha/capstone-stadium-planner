import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { Card, Button, Col, Row } from "react-bootstrap";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";

function PreviousTours() {
  const [tourToAddReview, setTourToAddReview] = useState(null);
  const [tourToEditReview, setTourToEditReview] = useState(null);
  const [filteredTours, setFilteredTours] = useState([]);
  const { loggedIn, user, loading } = useContext(UserContext);

  useEffect(() => {
    setFilteredTours(
      user.tours.filter((tour) => tour.upcoming_tours === false)
    );
  }, [user]);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <h3 className="my-account-tours">Previous tours</h3>

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
                    {/* .some is used to iterate over our tour.reviews array, and checks to see if a review object exists for each tour object. It returns a boolean value dependant on the outcome which is returned in the new array created when we mapped over user.tours */}
                    {/* {const p = user.tours.map((tour) =>
    tour.reviews.map((review) => review.review)
  );} */}

                    {user.reviews
                      .map((review) => review.tour_id)
                      .includes(filteredTour.id) ? (
                      <Button onClick={() => setTourToEditReview(filteredTour)}>
                        Edit Review
                      </Button>
                    ) : (
                      <Button onClick={() => setTourToAddReview(filteredTour)}>
                        Create Review
                      </Button>
                    )}
                    {tourToEditReview === null ? null : (
                      <div className="calendar-overlay">
                        <div className="calendar-popup">
                          <EditReview
                            tourToEditReview={tourToEditReview}
                            setTourToEditReview={setTourToEditReview}
                          />
                        </div>
                      </div>
                    )}
                    {tourToAddReview === null ? null : (
                      <div className="calendar-overlay">
                        <div className="calendar-popup">
                          <CreateReview
                            setTourToAddReview={setTourToAddReview}
                            tourToAddReview={tourToAddReview}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        ) : (
          <h3>You haven't been on any tours yet.</h3>
        )}
      </>
    );
  }
}

export default PreviousTours;
