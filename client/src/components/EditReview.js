import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/user";

function EditReview({ setTourToEditReview, tourToEditReview }) {
  const [reviewInput, setReviewInput] = useState("");
  const [id, setId] = useState();
  const [rating, setRating] = useState(0);
  const [selectReview, setSelectReview] = useState([]);

  const {
    editReview,
    error,
    setError,
    loggedIn,
    loading,
    user,
    stadiums,
    setStadiums,
    setUser,
  } = useContext(UserContext);

  useEffect(() => {
    let selectedReview = user.reviews.find(
      (review) => review.tour_id === tourToEditReview.id
    );

    setReviewInput(selectedReview.review);
    setRating(selectedReview.rating);
    setId(selectedReview.id);
    setSelectReview(selectedReview);
  }, [user.reviews, tourToEditReview.id]);

  function handleSubmit(e) {
    e.preventDefault();
    editReview({
      review: reviewInput,
      rating: rating,
      tour_id: tourToEditReview.id,
      user_id: user.id,
      id: id,
    });
  }

  function handleDelete(review_id) {
    let findReview = user.reviews.filter((r) => r.id !== review_id);
    let updatedUserReviews = { ...user, reviews: findReview };

    let stadiumId = selectReview.stadium.id;

    let updatedStadiums = stadiums.map((stadium) => {
      if (stadium.id === stadiumId) {
        let updatedReviews = stadium.reviews.filter(
          (r) => r.id !== selectReview.id
        );
        stadium.reviews = updatedReviews;
      }
      return stadium;
    });

    fetch(`/reviews/${selectReview.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(updatedUserReviews);
        setStadiums(updatedStadiums);
      }
    });
  }

  function handleRating(e) {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue);

    //.min compares parsedValue and 5 and returns anything under 5. Anything over 5 will be capped at 5, and 5 will be returned. Math.max compares 0 and parsed value and does that opposite. Thus creating a minimum and maximum value input
    const newValue = Math.max(0, Math.min(5, parsedValue));

    setRating(newValue);
  }

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <div className="pb-2">Edit Review</div>
        <br />
        <Form className="form-style" onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            name="review"
            value={reviewInput}
            placeholder="Review"
            onChange={(e) => setReviewInput(e.target.value)}
          />
          <Form.Control
            type="number"
            name="rating"
            value={rating}
            placeholder="Rating"
            onChange={handleRating}
          />

          <Form.Control type="submit" />

          <div className="button-container">
            <Button
              onClick={() => {
                setTourToEditReview(null);
                setError([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setTourToEditReview(null);
                handleDelete(selectReview.id);
              }}
            >
              🗑️
            </Button>
          </div>
        </Form>
        {error}
      </>
    );
  }
}

export default EditReview;
