
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";

const EventDetails = () => {
  const [event, setEvent] = useState(undefined);
  const id = useParams();
  const navigate = useNavigate();

  const getEvent = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${id.eventId}`
      );
      if (!response.ok) {
        console.log("Failed to get event");
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent(id);
  }, [id]);

  console.log(event);

  return (
    <main className="bg-body-tertiary">
      {event && (
        <div className="container py-3 ">
          <img
            src={logo}
            alt="logo"
            style={{ height: "70px", margin: "0", padding: "0" }}
            onClick={() => navigate("/")}
          />
          <div className="float-end pt-4">
            <form>
              <div className="input-group ">
                <input
                  placeholder="⌕ Search by title and t..."
                  className="form-control"
                  type="text"
                />
              </div>
            </form>
          </div>
          <hr />

          <div className="row my-5">
            <div className="col-md-6">
              <h2 className="fw-bold">{event.eventName}</h2>
              <p className="fs-5 fw-normal pt-3 m-0 mb-0">Hosted By:</p>
              <p className="fs-5 fw-bold">{event.hostedBy}</p>

              <img
                alt={event.eventName}
                src={event.eventImageURL}
                className="img-fluid py-4"
              />
              <h3 className="fs-4 fw-bold py-2">Details: </h3>
              <p style={{ fontSize: "20px" }}>{event.details}</p>
              <h3 className="fs-4 fw-bold pt-2">Additional Information: </h3>
              <p style={{ fontSize: "17px", paddingTop: "5px" }}>
                <b>Dress Code: </b>
                {event.additionalInfo.dressCode}
              </p>
              <p style={{ fontSize: "17px" }}>
                <b>Age Restriction: </b>
                {event.additionalInfo.ageRestriction}
              </p>
              <h3 className="fs-4 fw-bold pt-2">Event Tags: </h3>

              {event.eventTags.map((tag) => (
                <p
                  key={tag}
                  className="btn btn-danger "
                  style={{ marginRight: "15px" }}>
                  {tag}
                </p>
              ))}
            </div>
            <div className="col-md-6">
              <div className="float-end">
                <div
                  style={{ backgroundColor: "white" }}
                  className="px-4 py-4 rounded">
                  <div className="d-flex">
                    <span style={{ paddingTop: "12px", paddingRight: "10px" }}>
                      <FaRegClock />
                    </span>
                    <div>
                      <p
                        className="m-0"
                        style={{
                          fontSize: "20px",
                        }}>{`${event.sessionTiming.fromDate} at ${event.sessionTiming.fromTime} to`}</p>
                      <p
                        style={{
                          fontSize: "20px",
                        }}
                        className="m-0">{`${event.sessionTiming.toDate} at ${event.sessionTiming.toTime}`}</p>
                    </div>
                  </div>
                  <div className="d-flex py-4">
                    <span style={{ paddingTop: "12px", paddingRight: "10px" }}>
                      <FaLocationDot />
                    </span>
                    <div>
                      <p
                        style={{
                          fontSize: "20px",
                        }}
                        className="m-0">{`${event.address.location}`}</p>
                      <p
                        style={{
                          fontSize: "20px",
                        }}
                        className="m-0">{`${event.address.venue}`}</p>
                    </div>
                  </div>
                  <div>
                    {event.isPaid ? (
                      <div className="d-flex">
                        <span style={{ paddingRight: "10px" }}>
                          <FaIndianRupeeSign />
                        </span>
                        <p
                          style={{
                            fontSize: "20px",
                          }}
                          className="m-0">{`${event.price}`}</p>
                      </div>
                    ) : (
                      <div className="d-flex">
                        <span style={{ paddingRight: "10px" }}>
                          <FaIndianRupeeSign />
                        </span>
                        <p
                          style={{
                            fontSize: "20px",
                          }}
                          className="m-0">{`Free`}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-4 ">
                  <h3 className="fs-4 fw-bold pt-2">
                    Speakers: ({event.speakers.length})
                  </h3>
                  <div className="row py-4">
                    {event.speakers.map((speaker) => (
                      <div
                        key={speaker.imageURL}
                        className="col-md-5 text-center rounded mx-3 card border-0 py-3"
                        style={{
                          backgroundColor: "white",
                        }}>
                        <div>
                          <span>
                            <img
                              alt={speaker.name}
                              src={speaker.imageURL}
                              style={{ width: "43%", height: "60px" }}
                              className="img-fluid rounded-circle"
                            />
                          </span>
                          <p className="fw-bold m-0">{speaker.name}</p>
                          <span>{speaker.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EventDetails;
