import { useProfileStore } from "../../src/hooks/useProfileStore";

function printLine(label: string, value: boolean) {
  console.log(`${label.padEnd(62, " ")} ${value ? "TRUE" : "FALSE"}`);
}

async function main() {
  const storeAny = useProfileStore as any;
  if (typeof storeAny.getState !== "function") throw new Error("useProfileStore.getState missing");

  const state = storeAny.getState();
  const account = state.account ?? {};
  const profiles = account.profiles ?? [];

  console.log("");
  console.log("=== CURRENT SUBSCRIPTION SNAPSHOT ===");
  console.log(`hasActiveSubscription: ${String(!!account.hasActiveSubscription)}`);
  console.log(`profileCount: ${profiles.length}`);
  console.log(`humanCount: ${profiles.filter((p: any) => p?.type !== "pet").length}`);
  console.log(`petCount: ${profiles.filter((p: any) => p?.type === "pet").length}`);
  console.log(`subscription fields: ${Object.keys(account).sort().join(", ")}`);

  const hasAnyPlanField =
    "subscriptionTier" in account ||
    "plan" in account ||
    "planId" in account ||
    "billingPeriod" in account ||
    "subscription" in account;

  printLine("Account appears to store plan metadata", hasAnyPlanField);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
