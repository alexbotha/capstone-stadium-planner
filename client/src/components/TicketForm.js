import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import { Container, Form, Button } from "react-bootstrap";

function TicketForm({ tourId }) {
  const [quantity, setQuantity] = useState("");
  const [errorsList, setErrorsList] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: quantity,
        tour_id: tourId,
      }),
    })
      .then((res) => res.json())
      .then((ticket) => {
        if (!ticket.errors) {
          navigate("/myaccount");
        } else {
          const errorLis = ticket.errors.map((e) => <li>{e}</li>);
          setErrorsList(errorLis);
        }
      });
  }

  function handleInputChange(e) {
    const inputValue = e.target.value;
    const newValue = Math.max(0, parseInt(inputValue));

    setQuantity(newValue);
  }

  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center vh-50">
        <div>
          <h3 className="pb-2">Ticket quantity</h3>

          <Form className="form-style" onSubmit={handleSubmit}>
            <Form.Control
              type="number"
              name="quantity"
              onChange={handleInputChange}
              placeholder="Quantity"
              value={quantity}
            />
            <div className="d-flex justify-content-center">
              <Form.Control type="submit" />
            </div>
            <ul className="error-text-color">{errorsList}</ul>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default TicketForm;
