const { get, getById, create, update, remove, addAttendee } = require("../models/event/index");
const { eventCreate, eventUpdate } = require("../models/event/validate")
const { validateSchema } = require("../helper/validation")

const getAllEvents = async (req, res) => {
  try {
    const events = await get();
    return res.status(200).send(events);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getById(id);
    if (!event) {
      return res.status(404).send("Event not found!");
    }

    return res.status(200).send(event);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const createEvent = async (req, res) => {
  try {
    await validateSchema(req.body, eventCreate);
    const { title, date, location, price, ticketsAvailable } = req.body;

    const data = {
      title,
      date,
      location,
      price,
      ticketsAvailable,
      createdBy: req.auth.id, 
    };

    const newEvent = await create(data);
    return res.status(200).send(newEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const updateEvent = async (req, res) => {
  try {
    await validateSchema(req.body, eventUpdate);
    const { id } = req.params;
    const updatedEvent = await update(id, req.body);
    return res.status(200).send(updatedEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Event with the id ${id} successfully deleted!`);
  }
};

const joinEvent = async (req, res) => {
  try {
    const { id, attendeeId } = req.params; 
    const userId = req.auth.id; 

    const event = await getById(id);

    if(!event) return res.status(404).send("Event not found!");

    if(event.createdBy.toString() !== userId.toString()) return res.status(400).send("You are not owner of this event");

    if(event.ticketsAvailable <= event.attendees.length) return res.status(400).send("Not enough tickets");

    await addAttendee(id, attendeeId);

    return res.status(200).send("Successfully joined the event!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent
};
