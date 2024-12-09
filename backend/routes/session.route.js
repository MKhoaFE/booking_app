const express = require("express");
const sessionController = require("../controllers/session.controller");
const {
    createSessionAndRedirect

} = require("../controllers/session.controller");
const isAuth = require("../middlewares/authentication.mdw");
const router = express.Router();

// Route để tạo session
router.post('/seats', createSessionAndRedirect);


module.exports = router;
