import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import StadiumItem from "./StadiumItem";
import { useNavigate } from "react-router-dom";
import { Row, Form, Col } from "react-bootstrap";

function StadiumContainer() {
  const [searchCountry, setSearchCountry] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const { loggedIn, stadiums, error, loading } = useContext(UserContext);

  // filterStadiums recieves the stadium object to then allow us to write our logic
  function filterStadiums(stadium) {
    // If our state of searchCountry is an empty string ("") then evaluate as true. This essentially bypasses the filtering which means all the stadium objects are returned in our new array
    // OR if our searchCountry is not empty, then return the stadium objects whos .country includes the value that searchCountry is currently set
    const matchCountry =
      searchCountry === "" ||
      stadium.country.toLowerCase().startsWith(searchCountry.toLowerCase());

    const matchName =
      searchName === "" ||
      stadium.name.toLowerCase().includes(searchName.toLowerCase());

    return matchCountry && matchName;
  }

  // we filter over stadiums, and instead of doing something with our stadium object in our filteredStadiums variable, we pass a callback function called filterStadiums. This helps keep code organized and readable and allows for reusability
  const filteredStadiums = stadiums.filter(filterStadiums);

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
          <p>There are {filteredStadiums.length} stadiums to choose from</p>
        </div>
        <Row>
          <Col className="input-col">
            <Form.Control
              type="text"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              placeholder="Country"
            />
            <Form.Control
              type="text"
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
              placeholder="Rating"
            />
            <Form.Control
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Name"
            />
          </Col>
        </Row>
        <Row>
          {filteredStadiums.length === 0 ? (
            <h3 className="no-stadiums">No stadiums found.</h3>
          ) : (
            filteredStadiums.map((stadium) => (
              <StadiumItem key={stadium.id} stadium={stadium} />
            ))
          )}
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
