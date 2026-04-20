import axios from "axios";

export async function lookupBarcodeFallback(barcode:string){

  try{

    const url = "https://api.barcodelookup.com/v3/products";

    const response = await axios.get(url,{
      params:{
        barcode:barcode,
        formatted:"y",
        key:process.env.EXPO_PUBLIC_BARCODE_LOOKUP_KEY
      }
    });

    const product = response?.data?.products?.[0];

    if(!product) return null;

    return {
      name: product.product_name || product.title,
      brand: product.brand,
      ingredients: product.ingredients
    };

  }catch(err){

    return null;

  }

}
