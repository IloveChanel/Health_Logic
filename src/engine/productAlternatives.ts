export function suggestAlternatives(score:number,category:string){

  if(score > 70) return []

  const suggestions:any = {
    "food":[
      "Plain oats",
      "Unsweetened yogurt",
      "Fresh fruit"
    ],
    "snack":[
      "Roasted nuts",
      "Fruit",
      "Dark chocolate 70%"
    ],
    "drink":[
      "Sparkling water",
      "Unsweetened tea",
      "Black coffee"
    ],
    "beauty":[
      "Fragrance-free moisturizer",
      "Ceramide cream",
      "Gentle cleanser"
    ]
  }

  return suggestions[category] || suggestions["food"] || []
}
