import { scanProduct } from "./engine/scanPipeline"
import { scanBeautyProduct } from "./engine/scanBeautyPipeline"

export async function scanBarcode(barcode:string){

  const profile = {
    type:"adult",
    allergies:[],
    conditions:[]
  }

  const result = await scanProduct(barcode,profile)

  return {
    productName:"Scanned Food Product",
    brandName:"OpenFoodFacts",
    category:"food",
    overallScore: result.score,
    fitForUserScore: result.score,
    redFlags: (result.flags || []).flat(),
    benefits: [],
    ingredients: (result.ingredients || []).map((i:string)=>({
      name:i,
      normalizedName:i,
      purpose:"",
      benefits:[],
      concerns:[],
      personalizedFlags:[],
      recommendation:"unknown"
    })),
    explanation: result.nova?.label || "HealthLogic engine score",
    nova: result.nova,
    alternatives: result.alternatives || [],
    petToxins: result.petToxins || []
  }

}

export async function scanBeautyBarcode(barcode:string){
  return scanBeautyProduct(barcode)
}

export async function fetchBrandInfo(name:string){
  return {
    brandName:name,
    trustScore:80,
    notes:"Brand info placeholder"
  }
}

export async function submitCustomProfileOption(payload:any){
  return {
    ok:true,
    saved:true,
    value:payload.value
  }
}





