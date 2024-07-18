import express from "express";
import { createHub, getHub, getHubs, updateHub, deleteHub } from "../Controllers/hub";

const router = express.Router();

//routes
router.post("/", createHub)
router.put("/:id", updateHub)
router.delete("/:id", deleteHub)

router.get("/:id", getHub)
router.get("/", getHubs)

export default router