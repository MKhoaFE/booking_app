const express = require("express");
const { postTicket } = require("../controllers/ticket.controller");

const router = express.Router();

router.post("/ticket", postTicket);

module.exports = router;