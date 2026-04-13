const ULTRA_PROCESSED_MARKERS = [
  "maltodextrin",
  "corn syrup",
  "high fructose corn syrup",
  "artificial flavor",
  "artificial colour",
  "emulsifier",
  "hydrolyzed protein",
  "modified starch",
  "invert sugar",
  "glucose syrup"
]

const PROCESSED_MARKERS = [
  "salt",
  "sugar",
  "oil",
  "vinegar"
]

export function classifyNOVA(ingredients:string[]){

  let ultraCount = 0
  let processedCount = 0

  ingredients.forEach(i=>{
    const name = i.toLowerCase()
    if(ULTRA_PROCESSED_MARKERS.some(m=>name.includes(m))){
      ultraCount++
    }
    if(PROCESSED_MARKERS.some(m=>name.includes(m))){
      processedCount++
    }
  })

  if(ultraCount >= 2){
    return { novaScore:4, label:"Ultra-processed food" }
  }

  if(ultraCount === 1){
    return { novaScore:3, label:"Processed food" }
  }

  if(processedCount > 0){
    return { novaScore:2, label:"Processed culinary ingredient" }
  }

  return { novaScore:1, label:"Unprocessed food" }
}
