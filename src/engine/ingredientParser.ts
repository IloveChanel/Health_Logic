import { normalizeIngredient } from "./ingredientNormalizer"

export function parseIngredients(text:string){

if(!text) return []

// remove brackets but keep inner ingredients
text = text.replace(/\(/g,",").replace(/\)/g,"")

// split on commas
let parts = text.split(",")

const results:string[] = []

for(let p of parts){

p = normalizeIngredient(p)

if(!p) continue

// split compound phrases
const sub = p.split(/ and | with /)

for(let s of sub){
s = s.trim()
if(s.length>1){
results.push(s)
}
}

}

return [...new Set(results)]

}




