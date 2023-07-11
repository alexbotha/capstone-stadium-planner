import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

function EditTicket({ setStadium, stadium }) {
  return (
    <>
      <h3>Hello</h3>
      <Button onClick={() => setStadium(null)}>Close</Button>
    </>
  );
}

export default EditTicket;
