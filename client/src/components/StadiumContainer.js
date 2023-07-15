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



  // Our call back function recieves the stadium object from filteredStadiums
  function filterStadiums(stadium) {
    // If searchCountry is empty - true - return all stadiums
    // If searchCountry is not empty, then return the stadium objects whos .country includes the value that searchCountry is currently set
    const matchCountry =
      searchCountry === "" ||
      stadium.country.toLowerCase().startsWith(searchCountry.toLowerCase());

    const matchName =
      searchName === "" ||
      stadium.name.toLowerCase().includes(searchName.toLowerCase());

    const matchRating =
      searchRating === "" || stadium.average_rating === parseInt(searchRating);

    // return the variables
    return matchCountry && matchName && matchRating;
  }

  // Filter over stadiums and recieve the callback
  const filteredStadiums = stadiums.filter(filterStadiums);

  //  Set constructor recieves our array and creates a new set object in memory containing non duplicated values.
  // we call 'new' which will create a new instance of the set object in memory containing our non duplicated values.
  // we can now interact with the instance and do stuff with it.
  function getUniqueValues(array) {
    return [...new Set(array)];
  }

  const uniqueCountries = getUniqueValues(
    stadiums.map((stadium) => stadium.country)
  );
  const uniqueNames = getUniqueValues(stadiums.map((stadium) => stadium.name));

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
            <Form.Select
              type="text"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              type="text"
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
              placeholder="Rating"
            >
              <option value="">Select Rating</option>
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            >
              <option value="">Select Name</option>
              {uniqueNames.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </Form.Select>
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
