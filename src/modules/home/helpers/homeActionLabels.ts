export function getHomeActionLabels(hasProfile: boolean) {
  return {
    scanLabel: hasProfile ? "Scan Products" : "Start Scanning Products Now",
    profileLabel: hasProfile ? "My Profiles" : "Start Your Profiles",
    subscriptionLabel: "Manage Subscription",
  };
}




