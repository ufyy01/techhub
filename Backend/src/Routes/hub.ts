import express from "express";
import { createHub, getHub, getHubs, updateHub, deleteHub, hubsNearMe, claimHub } from "../Controllers/hub";

const router = express.Router();

//routes
router.get("/near-me", hubsNearMe)
router.post("/claim", claimHub)

router.post("/", createHub)
router.patch("/:id", updateHub)
router.delete("/:id", deleteHub)

router.get("/:id", getHub)
router.get("/", getHubs)

export default router