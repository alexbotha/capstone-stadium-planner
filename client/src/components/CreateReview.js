import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function CreateReview({ setStadium, stadium }) {
  const [reviewInput, setReviewInput] = useState("");

  const { addReview, error, setError, loggedIn, loading, user } =
    useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    addReview({
      review: reviewInput,
      tour_id: stadium.id,
      user_id: user.id,
    });
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

          <Form.Control type="submit" />

          <div className="button-container">
            <Button
              onClick={() => {
                setStadium(null);
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
