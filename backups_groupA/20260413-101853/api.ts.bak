import { ProductAnalysis } from "./types/domain";

export async function scanBarcode(barcode: string): Promise<ProductAnalysis> {
  return {
    productName: "Sample Product",
    brandName: "Demo Brand",
    category: "food",
    overallScore: 72,
    fitForUserScore: 65,
    redFlags: ["High sodium"],
    benefits: ["Protein source"],
    ingredients: [],
    explanation: `Demo barcode result for ${barcode} until backend is connected.`,
  };
}

export async function fetchBrandInfo(name: string) {
  return {
    brandName: name,
    trustScore: 80,
    notes: "Brand data placeholder",
  };
}
