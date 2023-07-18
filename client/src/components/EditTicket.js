import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import EditTicketForm from "./EditTicketForm";

function EditTicket({ filteredTour, setFilteredTour }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);

  const [ticket, setTicket] = useState(false);
  const [tourId, setTourId] = useState("");
  const [foundStadium, setFoundStadium] = useState("");

  const { stadiums } = useContext(UserContext);

  function handleDateSelect(date) {
    setSelectedDate(date);
    setError(null);
  }

  useEffect(() => {
    setFoundStadium(
      stadiums.find((stadium) => stadium.id === filteredTour.stadium.id)
    );
  }, [filteredTour, stadiums]);

  function renderTourDates() {
    if (!selectedDate) {
      return null;
    } else {
      if (error) {
        return <h3 className="error">{error}</h3>;
      }
      const selectedTourDates = foundStadium.tours.filter((tour) => {
        const tourDate = new Date(tour.tour_date);
        return tourDate.toDateString() === selectedDate.toDateString();
      });
      if (selectedTourDates.length === 0) {
        setError("Date not available.");
      }

      return (
        <div>
          <h3>{selectedDate.toDateString()}</h3>
          {selectedTourDates.map((tour) => (
            <div key={tour.id}>
              <Link
                onClick={() => {
                  const selectedTourId = tour.id;
                  const tourIdString = selectedTourId.toString();
                  setTourId(tourIdString);
                  setTicket(true);
                }}
              >
                {tour.start_time}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      {ticket ? (
        <EditTicketForm
          tourId={tourId}
          filteredTour={filteredTour}
          setFilteredTour={setFilteredTour}
        />
      ) : (
        <div>
          <h1>Select a new tour date</h1>
          <Calendar
            value={new Date()}
            // tileContent={({ date }) =>
            //   // foundStadium.tours.some(
            //   //   (tour) =>
            //   //     new Date(tour.tour_date).toDateString() ===
            //   //     date.toDateString()
            //   // )
            // }
            onClickDay={handleDateSelect}
          />
          {renderTourDates()}
        </div>
      )}
      <div className="button-container">
        <Button onClick={() => setFilteredTour(null)}>Close</Button>
      </div>
    </div>
  );
}

export default EditTicket;
