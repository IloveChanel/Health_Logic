export function getPurchaseRecommendation(
score:number,
flags:string[]
){

let recommendation="BUY"

if(score<50){
recommendation="AVOID"
}
else if(score<80){
recommendation="CAUTION"
}

const reasons:string[]=[]

for(const f of flags){

const flag=f.toLowerCase()

if(flag.includes("msg") || flag.includes("additive")){
reasons.push("Contains additive ingredients")
}

if(flag.includes("salt") || flag.includes("sodium")){
reasons.push("High sodium ingredient")
}

if(flag.includes("sugar") || flag.includes("hfcs")){
reasons.push("High sugar ingredient")
}

if(flag.includes("ultra processed")){
reasons.push("Highly processed food")
}

}

return{
recommendation,
reasons:[...new Set(reasons)],
confidence: Math.min(100, flags.length * 20)
}

}
