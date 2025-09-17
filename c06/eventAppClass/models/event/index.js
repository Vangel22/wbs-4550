const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema, "events");

const get = async () => {
  return await Event.find().populate({
    path: "attendees",
    select: "-_id email username",
  }).populate({
    path: "createdBy",
    select: "username"
  })
};

const getById = async (_id) => {
  return await Event.findOne({ _id });
};

const create = async (data) => {
  const newEvent = new Event(data);
  return await newEvent.save();
};

const update = async (_id, data) => {
  return await Event.updateOne({ _id }, data);
};

const remove = async (_id) => {
  return await Event.deleteOne({ _id });
};


const addAttendee = async (eventId, accountId) => {
  return await Event.updateOne(
    { _id: eventId },
    { $push: { attendees: accountId } } 
  );
};


module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  addAttendee,
};
