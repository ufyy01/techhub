import { validateHub } from "../Models/hub"
import HubModel from '../Models/hub'
import { RequestHandler } from "express"
import { getLocation } from "../util/location"
import { SortOrder } from "mongoose"

//create hub & sign up
export const createHub: RequestHandler = async (req, res) => {
  const {error} = validateHub(req.body)
  if (error) return res.status(400).send(error);

  const { name, username, password, instagram, twitter, tiktok, website, phone, images, description, address, state, schedule, notice} = req.body

  let geoLocation;

  try {
    const hub = await HubModel.findOne({ name: req.body.name })
    if (hub) throw new Error("Hub already exist")

    const hubEmail = await HubModel.findOne({ name: req.body.email })
    if (hubEmail) throw new Error("Hub with this email already exist")

    geoLocation = await getLocation(address)
    if(!geoLocation) throw new Error("Location not found")

    const { lat, lng } = geoLocation

    const location = {
      type: "Point",
      coordinates: [lng, lat]
    }

    await HubModel.create({ name, username, password, instagram, twitter, tiktok, website, phone, images, description, address, state, schedule, notice, location})

    res.status(201).json({message:"Hub created successfully"})
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
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
    const hub = await HubModel.findById(id)
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
    let { sort, order, page, limit } = req.query as {
      sort?: string;
      order?: string;
      page?: number;
      limit?: number;
    }

    sort = sort || 'name';
    order = order || 'asc';
    page = page ? page : 1;
    limit = limit ? limit : 10;

    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({message: "Invalid order value. Must be 'asc' or 'desc'."})
    }

    const offset = (page - 1) * limit;

    const sortObj: { [key: string]: SortOrder } = {}
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const hubs = await HubModel.find().sort(sortObj).skip(offset).limit(limit);
    if (!hubs) throw new Error("Can't load hubs")

    const totalStores = await HubModel.countDocuments();
    
    res.status(200).json({message:"success", data: hubs, pagination: {
      total: totalStores,
      page,
      limit,
      pages: Math.ceil(totalStores / limit)
    }})

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

//get hub close to me
export const hubsNearMe: RequestHandler = async (req, res) => {
  try {
    const {lng, lat} = req.query

    if(typeof lng !== "string" || typeof lat !== "string" ) throw new Error("Coordinates must be a string")

    const hubsNear = await HubModel.aggregate([ 
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        key: "location",
        maxDistance: 1000 * 1609,
        distanceField: "dist.calculated",
        spherical: true
      }
    }
  ])
    res.send(200).json({success: true, message: "Hub near you fetched successfully", data: hubsNear})

  } catch(error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

export const claimHub: RequestHandler = async (req, res) => {
  res.send('Claimed')
}