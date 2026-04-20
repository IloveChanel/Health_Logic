export function shouldShowResultScore(block: "summary" | "redFlags" | "petToxins" | "ingredients" | "alternatives") {
  return block === "summary";
}
