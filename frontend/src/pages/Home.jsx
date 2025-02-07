import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const [type, setType] = useState("Both");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response =
        type === "Both"
          ? await fetch("http://localhost:3000/events")
          : await fetch(`http://localhost:3000/events/types/${type}`);

      if (!response.ok) {
        console.log("Failed to fetch events.");
        return;
      }

      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.log("Failed to get data", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [type]);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredEvents(events);
      setNotFound(false);
      return;
    }

    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredEvents(filtered);
    setNotFound(filtered.length === 0);
  };

  return (
    <div className="container py-3">
      <Header onSearch={handleSearch} />

      <div className="float-end py-2">
        <select className="form-select" onChange={(e) => setType(e.target.value)}>
          <option value="Both">Select Event Type</option>
          <option value="Offline">Offline</option>
          <option value="Online">Online</option>
        </select>
      </div>

      <h1 className="fw-bold">Meetup Events</h1>

      {notFound && <h2 className="text-center fw-semibold">Event Not Found</h2>}

      <div className="row">
        {filteredEvents.length > 0 &&
          filteredEvents.map((event) => (
            <div
              key={event._id}
              style={{ cursor: "pointer" }}
              className="col-md-4 my-3"
              onClick={() => navigate(`/${event._id}`)}
            >
              <span className="position-absolute z-3 bg-light rounded p-1 m-2 fw-semibold">
                {`${event.eventType} Event`}
              </span>
              <div className="card border-0 bg-body-tertiary">
                <img
                  className="card-img-top rounded img-fluid event-image"
                  alt={event.eventName}
                  src={event.eventImageURL}
                />
                <p className="fw-normal fs-6 p-0 m-0">
                  {`${event.sessionTiming.fromDate} • ${event.sessionTiming.fromTime} IST`}
                </p>
                <h4 className="fw-bold fs-4">{event.eventName}</h4>
              </div>
            </div>
          ))}
      </div>

      <style>{`
        .event-image {
          width: 100%; /* Make sure the image fills its container */
          height: 250px; /* Set a fixed height */
          object-fit: cover; /* Crop images while maintaining aspect ratio */
          border-radius: 10px; /* Optional: Rounded corners */
        }
      `}</style>
    </div>
  );
};

export default Home;
