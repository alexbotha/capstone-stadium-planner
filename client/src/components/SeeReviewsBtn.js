import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SeeReviewsBtn({ setShowReviews, stadium }) {
  return (
    <>
      <div>Reviews for {stadium.name}</div>
      <div className="review-container">
        <ul className="review-list">
          {stadium.reviews.map((review) => {
            return (
              <li>
                <Link to={`/users/${review.user_id}`}>
                  {review.user_username}
                </Link>{" "}
                - {review.review} - {review.rating}/5
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        className="button-container"
        onClick={() => setShowReviews(false)}
      >
        Close
      </Button>
    </>
  );
}

export default SeeReviewsBtn;
