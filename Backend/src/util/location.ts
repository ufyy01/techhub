import axios from 'axios'
import "dotenv/config"

export const getLocation = async (address: string) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.API_KEY}`);

  const data = response.data

  if(!data || data.status === 'ZERO_RESULT') throw new Error("Location not found")
  
  const coordinates = data.results[0].geometry.location
  
  return coordinates
}
