import express from "express";
import { createHub, getHub } from "../Controllers/hub";

const router = express.Router();

//routes
router.post("/", createHub)
router.get("/", getHub)

export default router