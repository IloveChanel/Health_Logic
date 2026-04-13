import { evaluateProduct } from "./src/platform/decisionEngine"

const request={
ingredients:["sugar","salt","msg"],
profile:{
type:"adult",
conditions:["hypertension","migraine"]
}
}

console.log(evaluateProduct(request))
