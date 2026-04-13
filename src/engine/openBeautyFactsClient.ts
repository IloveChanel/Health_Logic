import axios from "axios"

export async function fetchOpenBeautyFacts(barcode:string){

  const url = "https://world.openbeautyfacts.org/api/v0/product/" + barcode + ".json"
  const response = await axios.get(url)
  return response.data

}
