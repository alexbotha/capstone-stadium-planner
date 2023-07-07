import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import TicketForm from "./TicketForm";

function SeeToursBtn({ setShowTours, stadium }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [tourId, setTourId] = useState("");

  function handleDateSelect(date) {
    setSelectedDate(date);
    setError(null);
  }

  function renderTourDates() {
    if (!selectedDate) {
      return null;
    } else {
      if (error) {
        return <h3 className="error">{error}</h3>;
      }
      const selectedTourDates = stadium.tours.filter((tour) => {
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
            <div>
              <Link
                onClick={() => {
                  const x = tour.id;
                  const str = x.toString();
                  setTourId(str);
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
        <TicketForm tourId={tourId} />
      ) : (
        <div>
          <h1>Tour dates</h1>
          <Calendar
            value={new Date()}
            tileContent={({ date }) =>
              stadium.tours.some(
                (tour) =>
                  new Date(tour.tour_date).toDateString() ===
                  date.toDateString()
              )
            }
            onClickDay={handleDateSelect}
          />
          {renderTourDates()}
        </div>
      )}
      <div className="button-container">
        <Button onClick={() => setShowTours(false)}>Close</Button>
      </div>
    </div>
  );
}

export default SeeToursBtn;
