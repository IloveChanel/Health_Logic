export type UniversalProductRoute = {
  domain: "food" | "beauty" | "pet" | "supplement" | "household" | "unknown";
  primarySource: "openFoodFacts" | "openBeautyFacts" | "petSafety" | "unknown";
  fallbackEligible: boolean;
};

export function inferDomainFromResult(result: any): UniversalProductRoute {
  const text = [
    result?.category,
    result?.categories,
    result?.product?.category,
    result?.product?.categories,
    result?.brand,
    result?.brandName,
    result?.productName,
    result?.name
  ]
    .filter((x) => typeof x === "string")
    .join(" ")
    .toLowerCase();

  if (text.match(/cosmetic|beauty|skincare|skin care|haircare|hair care|makeup|bodycare|body care|lotion|shampoo|cleanser/)) {
    return {
      domain: "beauty",
      primarySource: "openBeautyFacts",
      fallbackEligible: true
    };
  }

  if (text.match(/pet|dog|cat|canine|feline/)) {
    return {
      domain: "pet",
      primarySource: "petSafety",
      fallbackEligible: true
    };
  }

  if (text.match(/supplement|vitamin|capsule|tablet|protein|electrolyte/)) {
    return {
      domain: "supplement",
      primarySource: "unknown",
      fallbackEligible: true
    };
  }

  if (text.match(/cleaner|detergent|household|soap|disinfect|laundry/)) {
    return {
      domain: "household",
      primarySource: "unknown",
      fallbackEligible: true
    };
  }

  if (text.length > 0) {
    return {
      domain: "food",
      primarySource: "openFoodFacts",
      fallbackEligible: true
    };
  }

  return {
    domain: "unknown",
    primarySource: "unknown",
    fallbackEligible: true
  };
}
