const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

require("./pkg/db/config")();
const { getSection } = require("./pkg/config");
const { login, register, refreshToken } = require("./handlers/auth");
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, joinEvent } = require("../eventApp/handlers/events")

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  })
);

app.post("/auth/login", login);
app.post("/auth/register", register);
app.get("/auth/refresh-token", refreshToken);

// CRUD events

app.get("/events", getAllEvents);
app.get("event/:id", getEventById);
app.post("/event", createEvent);
app.put("/event/:id", updateEvent);
app.delete("/event/:id", deleteEvent);
app.post("/join/:id/:attendeeId", joinEvent);

app.listen(getSection("development").port, () => {
  console.log(`Server started at port: ${getSection("development").port}`);
});