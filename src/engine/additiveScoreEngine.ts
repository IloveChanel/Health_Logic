const HIGH_RISK=[
"e102",
"e110",
"e250",
"bht",
"bha"
]

export function calculateAdditiveScore(ingredients:string[]){

let additiveScore=30
let highRiskFound=false

ingredients.forEach(i=>{

const name=i.toLowerCase()

if(HIGH_RISK.includes(name)){
additiveScore-=30
highRiskFound=true
}

})

if(additiveScore<0) additiveScore=0

return{additiveScore,highRiskFound}

}




