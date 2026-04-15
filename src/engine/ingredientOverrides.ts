export function applyIngredientOverrides(
ingredients:string[],
profile:any
){

let bonus=0
let penalty=0

for(const i of ingredients){

if(profile.preferredIngredients?.includes(i)){
bonus+=3
}

if(profile.blockedIngredients?.includes(i)){
penalty+=10
}

}

return{bonus,penalty}

}




