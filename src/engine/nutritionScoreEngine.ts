export function calculateNutritionScore(nutrition:any){

let score=100

if(nutrition.sugar>20) score-=20
if(nutrition.saturatedFat>5) score-=15
if(nutrition.sodium>300) score-=10

if(nutrition.fiber>3) score+=5
if(nutrition.protein>5) score+=5

if(score>100) score=100
if(score<0) score=0

return score

}




