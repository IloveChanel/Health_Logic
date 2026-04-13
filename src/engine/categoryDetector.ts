export function detectCategory(product:any){

const ingredients=(product.ingredients||[]).join(" ").toLowerCase()

if(ingredients.match(/retinol|niacinamide|salicylic acid|benzoyl peroxide|ceramide/)){
return "beauty"
}

if(ingredients.match(/chicken|beef|dog|cat|pet food/)){
return "pet"
}

return "food"

}
