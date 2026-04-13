import { scanProduct } from "./src/engine/scanPipeline"

const profile={
  type:"adult",
  allergies:[]
}

scanProduct("737628064502",profile).then(r=>{
  console.log(r)
})
