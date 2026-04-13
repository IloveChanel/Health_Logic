export function getIngredientCard(name:string){

const cards:any={

"sugar":{
short:"Simple carbohydrate sweetener",
details:"High intake may contribute to blood sugar spikes and metabolic disease."
},

"salt":{
short:"Sodium chloride seasoning",
details:"Excess sodium intake is associated with hypertension."
},

"corn starch":{
short:"Thickening starch derived from corn",
details:"High glycemic carbohydrate with little nutritional value."
}

}

return cards[name.toLowerCase()] || null

}
