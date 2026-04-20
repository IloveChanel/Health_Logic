export function getScoreMeaning(score:number){

  if(score >= 90){
    return {label:"Excellent",color:"#00E676"}
  }

  if(score >= 70){
    return {label:"Moderate",color:"#FFD54F"}
  }

  return {label:"Poor",color:"#FF5252"}
}
