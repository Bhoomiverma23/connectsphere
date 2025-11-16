import express from "express";
import { getEvents } from "../controllers/eventController.js";

const router = express.Router();

// FULL ROUTE = /api/events/upcoming
router.get("/upcoming", getEvents);

export default router;
