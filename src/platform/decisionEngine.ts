import { analyzeProduct } from "../engine/analyzeProduct"

export function evaluateProduct(input:any){

const product={
ingredients:input.ingredients || [],
nutrition:input.nutrition || {},
labels:input.labels || []
}

const profile=input.profile || {type:"adult"}

const result=analyzeProduct(product,profile)

return{
score:result.score,
flags:result.flags,
category:result.category,
alternatives:result.alternatives,
breakdown:result.breakdown
}

}
