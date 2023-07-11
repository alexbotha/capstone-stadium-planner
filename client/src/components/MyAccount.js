import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";

import { Card, Button, Col, Row } from "react-bootstrap";

import UpcomingTours from "./UpcomingTours";
import PreviousTours from "./PreviousTours";

function MyAccount() {
  const [upComingTours, setUpcomingTours] = useState(true);

  const { loggedIn, loading, error } = useContext(UserContext);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <div>
        <h3 className="stadium-card-center">Your Profile</h3>
        <Button onClick={() => setUpcomingTours(true)}>Upcoming</Button>
        <Button onClick={() => setUpcomingTours(false)}>Previous</Button>

        {upComingTours ? <UpcomingTours /> : <PreviousTours />}
      </div>
    );
  } else {
    return (
      <div className="errorHandle">
        <h3>{error}</h3>;
      </div>
    );
  }
}

export default MyAccount;
