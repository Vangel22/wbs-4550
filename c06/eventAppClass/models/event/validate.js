
const eventCreate = {
  title: "required|string",
  date: "required|date",
  location: "required|string",
  price: "required|numeric",
  ticketsAvailable: "required|integer",
};

const eventUpdate = {
  title: "string",
  date: "date",
  location: "string",
  price: "numeric",
  ticketsAvailable: "integer",
};

module.exports = {
  eventCreate,
  eventUpdate,
};
