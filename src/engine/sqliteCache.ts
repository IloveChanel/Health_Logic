import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveProduct(barcode:string,data:any){
  await AsyncStorage.setItem(
    "product_cache:" + barcode,
    JSON.stringify(data)
  )
}

export async function getProduct(barcode:string){
  const raw = await AsyncStorage.getItem("product_cache:" + barcode)
  return raw ? JSON.parse(raw) : null
}




