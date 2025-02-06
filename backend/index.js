const express = require("express");

const app = express();

app.use(express.json());

const { initializeDatabase } = require("./db/db.connection");
const Event = require("./models/event.model");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

initializeDatabase();

app.get("/", async (req, res) => {
  res.send("This is all about meetup App!!");
});

const createEvent = async (event) => {
  try {
    const newEvent = new Event(event);
    const savedEvent = await newEvent.save();
    console.log(savedEvent);
    return savedEvent;
  } catch (error) {
    throw error;
  }
};

app.post("/api/events", async (req, res) => {
  try {
    console.log("Incoming request:", req.body);
    const savedEvent = await createEvent(req.body);
    res.status(201).json({ message: "Event added successfully", event: savedEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: `Failed to add event: ${error.message}` });
  }
});


const readAllEvents = async () => {
  try {
    const allEvent = await Event.find();
    return allEvent;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Events not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get events: ${error}` });
  }
});

const readEventsByTitleAndTags = async (title) => {
  try {
    // Searching by eventName (partial match allowed)
    const events = await Event.find({
      eventName: { $regex: title, $options: "i" },
    });

    if (events.length > 0) {
      return events;
    } else {
      // Searching by eventTags if no eventName match is found
      const tagEvents = await Event.find({
        eventTags: { $regex: title, $options: "i" },
      });
      return tagEvents;
    }
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/search/:title", async (req, res) => {
  const title = req.params.title;
  if (!title) {
    return res.status(400).json({ error: "Title parameter is required" });
  }
  try {
    const events = await readEventsByTitleAndTags(title);
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get searched event: ${error}` });
  }
});

const readEventsByType = async (type) => {
  try {
    const events = await Event.find({ eventType: type });
    return events;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/types/:type", async (req, res) => {
  try {
    const events = await readEventsByType(req.params.type);
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Events not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get events: ${error}` });
  }
});

const updateImageUrl = async (id, data) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
        return updatedEvent;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

// Use PUT method instead of POST for updating
app.put("/events/:id", async (req, res) => {
    try {
        const updatedEvent = await updateImageUrl(req.params.id, req.body);
        if (updatedEvent) {
            res.json({
                message: "Event image URL updated successfully",
                event: updatedEvent,
            });
        } else {
            res.status(404).json({ error: "Event not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update event: ${error}` });
    }
});

const readEventById = async (id) => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/:id", async (req, res) => {
  try {
    const event = await readEventById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get event" });
  }
});

const deleteEventById = async (id) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    return deletedEvent;
  } catch (error) {
    console.log(error);
  }
};

app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await deleteEventById(req.params.id);
    if (deletedEvent) {
      res.json({ message: "Event deleted successfully", event: deletedEvent });
    } else {
      res.status(404).json({ error: "Event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to Delete Event: ${error.message}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
