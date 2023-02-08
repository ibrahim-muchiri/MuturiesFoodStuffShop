const express = require('express');
const itemsController = require("../controllers/itemsController");

const router = express.Router();

router.get("/getItems", itemsController.getItems);
router.post("/create", itemsController.createItem);

module.exports = router;