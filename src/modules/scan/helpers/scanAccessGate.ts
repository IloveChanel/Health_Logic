export type ScanAccessDecision = {
  allowed: boolean;
  redirectRoute?: "Subscription";
};

export function getScanAccessDecision(hasActiveSubscription: boolean): ScanAccessDecision {
  if (hasActiveSubscription) {
    return { allowed: true };
  }

  return {
    allowed: false,
    redirectRoute: "Subscription",
  };
}




