import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/user";

function CreateReview({ setTourToAddReview, tourToAddReview }) {
  const [reviewInput, setReviewInput] = useState("");
  const [rating, setRating] = useState(0);

  const { addReview, error, setError, loggedIn, loading, user } =
    useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    addReview({
      review: reviewInput,
      rating: rating,
      tour_id: tourToAddReview.id,
      user_id: user.id,
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
        <div className="pb-2">Create Review</div>
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
                setTourToAddReview(null);
                setError([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
        {error.map((e) => {
          return <li className="error-text-color">{e}</li>;
        })}
      </>
    );
  }
}

export default CreateReview;
