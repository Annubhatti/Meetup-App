const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  hostedBy: {
    type: String,
    required: true,
  },
  eventImageURL: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  additionalInfo: {
    dressCode: {
      type: String,
    },
    ageRestriction: {
      type: String,
    },
  },
  eventTags: [{ type: String }],
  sessionTiming: {
    fromDate: {
      type: Date, // Changed to Date type
      required: true,
    },
    fromTime: {
      type: String,
      required: true,
    },
    toDate: {
      type: Date, // Changed to Date type
      required: true,
    },
    toTime: {
      type: String,
      required: true,
    },
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  price: {
    type: String,
    required: function () {
      return this.isPaid; // Price required only if event is paid
    },
  },
  speakers: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  address: {
    location: { type: String },
    venue: { type: String },
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
