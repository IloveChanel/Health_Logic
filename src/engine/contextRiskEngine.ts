export function calculateContextRisk(
ingredients:string[],
profile:any
){

let penalty=0
const flags:string[]=[]

if(!profile?.conditions) return {penalty,flags}

for(const ingredient of ingredients){

if(profile.conditions.includes("diabetes")){
if(ingredient==="sugar"){
penalty+=15
flags.push("High sugar risk for diabetes")
}
}

if(profile.conditions.includes("hypertension")){
if(ingredient==="salt"){
penalty+=15
flags.push("High sodium risk for hypertension")
}
}

if(profile.conditions.includes("migraine")){
if(ingredient==="msg"){
penalty+=10
flags.push("MSG migraine trigger")
}
}

if(profile.type==="child"){
if(ingredient==="caffeine"){
penalty+=10
flags.push("Caffeine not recommended for children")
}
}

}

return {penalty,flags}

}
