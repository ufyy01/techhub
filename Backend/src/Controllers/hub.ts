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

    res.status(201).json({message:"Hub created successfully"})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

//Update hub
export const updateHub: RequestHandler = async (req, res) => {
  const {error} = validateHub(req.body)
  if (error) return res.status(400).send(error);

  const { id } = req.params

  try {
    const hub = await HubModel.findById(id)
    if (!hub) throw new Error("Hub does not exist")
    
    const newhub = await HubModel.findByIdAndUpdate(id, {...req.body})

    await newhub!.save()

    res.status(201).json({message:"Hub updated successfully"})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

//Delete hub
export const deleteHub: RequestHandler = async (req, res) => {
  const { id } = req.params

  try {
    const hub = await HubModel.findByIdAndDelete(id)
    if (!hub) throw new Error("Hub does not exist")
    
    res.status(201).json({message:"Hub deleted successfully"})
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
  const { id } = req.params
  try {
    const hub = await HubModel.findById(id).select("-password")
    if (!hub) throw new Error("Hub does not exist")
    
    res.status(200).json({message:"success", data: hub})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

//get all hubs 
export const getHubs: RequestHandler = async (req, res) => {
  try {
    const hubs = await HubModel.find().select("-password")
    if (!hubs) throw new Error("Can't load hubs")
    
    res.status(200).json({message:"success", data: hubs})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}