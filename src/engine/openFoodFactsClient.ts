import axios from "axios"

export async function fetchOpenFoodFacts(barcode:string){

  const url = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json"
  const response = await axios.get(url)
  return response.data

}




