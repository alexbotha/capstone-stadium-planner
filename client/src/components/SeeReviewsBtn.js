import React from "react";
import { Button } from "react-bootstrap";

function SeeReviewsBtn({ setShowReviews, stadium }) {
  return (
    <>
      <div>Reviews for {stadium.name}</div>
      <div className="review-container">
        <ul className="review-list">
          {stadium.reviews.map((review) => {
            return (
              <li>
                <em>{review.user_username}</em> - {review.review}
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
