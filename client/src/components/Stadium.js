import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import { Card, Button, Col, Container } from "react-bootstrap";
import SeeToursBtn from "./SeeToursBtn";
import SeeReviewsBtn from "./SeeReviewsBtn";

function Stadium() {
  const [showTours, setShowTours] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { stadiums, loading, loggedIn } = useContext(UserContext);
  const { id } = useParams();

  if (loggedIn) {
    let stadium = stadiums.find((s) => s.id === parseInt(id));

    function handleSeeTours() {
      setShowTours(true);
    }

    function handleSeeReviews() {
      setShowReviews(true);
    }

    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <Container className="container-padding-id">
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

            {!showTours && !showReviews ? (
              <>
                <Button className="btn" onClick={handleSeeTours}>
                  Book tickets
                </Button>
                <br />
                <Button className="btn" onClick={handleSeeReviews}>
                  View reviews
                </Button>
              </>
            ) : null}

            {showTours && (
              <div className="calendar-overlay">
                <div className="calendar-popup">
                  <SeeToursBtn setShowTours={setShowTours} stadium={stadium} />
                </div>
              </div>
            )}

            {showReviews && (
              <div className="calendar-overlay">
                <div className="calendar-popup">
                  <SeeReviewsBtn
                    setShowReviews={setShowReviews}
                    stadium={stadium}
                  />
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Container>
    );
  } else {
    return null;
  }
}

export default Stadium;
