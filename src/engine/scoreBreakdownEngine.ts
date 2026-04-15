export function buildScoreBreakdown(
ingredients:string[],
nova:any,
graphRisk:any,
overrides:any
){

const breakdown:any[]=[]

if(graphRisk?.penalty){
breakdown.push({
reason:"Ingredient risk penalties",
impact:-graphRisk.penalty
})
}

if(nova?.novaScore>=3){
breakdown.push({
reason:"Ultra-processed food",
impact:-8
})
}

if(overrides?.bonus){
breakdown.push({
reason:"Preferred ingredients",
impact:overrides.bonus
})
}

if(overrides?.penalty){
breakdown.push({
reason:"Blocked ingredients",
impact:-overrides.penalty
})
}

return breakdown

}




