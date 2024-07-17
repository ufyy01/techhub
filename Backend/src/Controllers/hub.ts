import { validateHub } from "../Models/hub"
import HubModel from '../Models/hub'
import { RequestHandler } from "express"

//create hub
export const createHub: RequestHandler = async (req, res) => {
  const {error} = validateHub(req.body)
  if (error) return res.status(400).send(error);

  const { name, username, email, password, instagram, twitter, tiktok, website, phone, images, description, address, state, schedule, notice } = req.body

  try {
    const hub = await HubModel.findOne({ name: req.body.name })
    if (hub) throw new Error("Hub already exist")
    
    const newhub = await HubModel.create({ name, username, email, password, instagram, twitter, tiktok, website, phone, images, description, address, state, schedule, notice})

    res.status(201).json({message:"Hub created successfully", data: newhub})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

//get hub
export const getHub: RequestHandler = async (req, res) => {
  res.send("TESTING")
}