import { SOURCE_REGISTRY } from "../../src/engine/sourceRegistry";
import { lookupPetProductFallback } from "../../src/engine/petProductFallbackBridge";
import { lookupSupplementFallback } from "../../src/engine/supplementFallbackBridge";
import { lookupHouseholdFallback } from "../../src/engine/householdFallbackBridge";
import { enrichProductWithAi } from "../../src/engine/aiEnrichmentBridge";

async function main() {
  console.log("SOURCE REGISTRY COUNT:", SOURCE_REGISTRY.length);
  console.log("SOURCE REGISTRY OK:", SOURCE_REGISTRY.length >= 8 ? "TRUE" : "FALSE");

  const pet = await lookupPetProductFallback("000");
  const supp = await lookupSupplementFallback("000");
  const house = await lookupHouseholdFallback("000");
  const ai = await enrichProductWithAi({ barcode: "000", productName: "Test Product" });

  console.log("PET BRIDGE STATUS:", pet.status);
  console.log("SUPPLEMENT BRIDGE STATUS:", supp.status);
  console.log("HOUSEHOLD BRIDGE STATUS:", house.status);
  console.log("AI BRIDGE STATUS:", ai.status);

  const pass =
    pet.status === "unconfigured" &&
    supp.status === "unconfigured" &&
    house.status === "unconfigured" &&
    ai.status === "unconfigured";

  console.log("");
  console.log("UNIVERSAL SOURCE BRIDGES PASS:", pass ? "TRUE" : "FALSE");

  if (!pass) {
    process.exit(1);
  }
}

void main();
