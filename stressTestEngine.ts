import { analyzeProduct } from "./src/engine/analyzeProduct"

const ingredientPool=[
"rice","sugar","salt","msg","corn starch",
"soy","peanut oil","sesame oil","citric acid",
"retinol","niacinamide","ceramide","xylitol",
"chocolate","garlic","onion"
]

function randomIngredients(){

const count=Math.floor(Math.random()*6)+2
const list:string[]=[]

for(let i=0;i<count;i++){
list.push(ingredientPool[Math.floor(Math.random()*ingredientPool.length)])
}

return [...new Set(list)]
}

let totalScore=0
let failures=0

for(let i=0;i<1000;i++){

const product={
ingredients:randomIngredients()
}

const profile={
type:"adult",
conditions:["hypertension","migraine"]
}

try{

const result=analyzeProduct(product,profile)

if(typeof result.score!=="number"){
failures++
}

totalScore+=result.score

}catch(e){
failures++
}

}

console.log("Products tested:",1000)
console.log("Failures:",failures)
console.log("Average score:",Math.round(totalScore/1000))
