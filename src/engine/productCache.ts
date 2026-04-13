const CACHE:Record<string,any>={}

export function getCachedProduct(barcode:string){
  return CACHE[barcode]
}

export function saveCachedProduct(barcode:string,data:any){
  CACHE[barcode]=data
}
