import React, { useContext } from "react";
import { UserContext } from "../context/user";
import StadiumItem from "./StadiumItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

function StadiumContainer() {
  const { loggedIn, stadiums, error, loading } = useContext(UserContext);
  const navigate = useNavigate();

  // function createStadium() {
  //   navigate("/stadium/new");
  // }

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <div className="stadium-card-center">
          <h3>Stadiums</h3>
          {/* <button className="createHotel" onClick={createHotel}>
            Create new hotel
          </button> */}
          <br />
          <p className="amountOfHotels">
            There are {stadiums.length} stadiums to choose from
          </p>
        </div>
        <Row>
          {stadiums.map((stadium) => (
            <StadiumItem key={stadium.id} stadium={stadium} />
          ))}
        </Row>
      </>
    );
  } else {
    return (
      <div className="error-text-color">
        <h3>{error}</h3>
      </div>
    );
  }
}

export default StadiumContainer;
