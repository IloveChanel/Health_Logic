import { useProfileStore } from "../../src/hooks/useProfileStore";

function printLine(label: string, value: boolean) {
  console.log(`${label.padEnd(56, " ")} ${value ? "TRUE" : "FALSE"}`);
}

async function main() {
  const storeAny = useProfileStore as any;
  if (typeof storeAny.getState !== "function") {
    throw new Error("useProfileStore.getState() not available");
  }

  const state0 = storeAny.getState();
  const save = state0.saveOrUpdateProfile;
  const deleteProfile = state0.deleteProfile;

  if (typeof save !== "function") throw new Error("saveOrUpdateProfile missing");
  if (typeof deleteProfile !== "function") throw new Error("deleteProfile missing");

  const prefix = `SMOKE_${Date.now()}`;
  const idsToDelete: string[] = [];

  const makeInput = (n: number) => ({
    id: null,
    label: `${prefix}_${n}`,
    type: "you",
    sex: "female",
  });

  for (let i = 1; i <= 5; i++) {
    const res = storeAny.getState().saveOrUpdateProfile(makeInput(i));
    if (!res?.ok) {
      throw new Error(`saveOrUpdateProfile failed at profile ${i}`);
    }
    const acct = storeAny.getState().account;
    const found = (acct?.profiles ?? []).find((p: any) => p?.label === `${prefix}_${i}`);
    if (found?.id) idsToDelete.push(found.id);
  }

  const acctAfter = storeAny.getState().account;
  const created = (acctAfter?.profiles ?? []).filter((p: any) => String(p?.label || "").startsWith(prefix));

  const fiveCreated = created.length === 5;
  const uniqueIds = new Set(created.map((p: any) => p?.id)).size === 5;
  const uniqueLabels = new Set(created.map((p: any) => p?.label)).size === 5;

  printLine("Created 5 profiles without overwrite", fiveCreated);
  printLine("All 5 created profiles have unique ids", uniqueIds);
  printLine("All 5 created profiles have unique labels", uniqueLabels);

  for (const id of idsToDelete) {
    storeAny.getState().deleteProfile(id);
  }

  const acctFinal = storeAny.getState().account;
  const cleaned = !(acctFinal?.profiles ?? []).some((p: any) => String(p?.label || "").startsWith(prefix));

  printLine("Smoke profiles cleaned back out", cleaned);

  const overall = fiveCreated && uniqueIds && uniqueLabels && cleaned;
  console.log("");
  console.log(`OVERALL_MULTI_PROFILE_SMOKE${" ".repeat(31)} ${overall ? "TRUE" : "FALSE"}`);

  if (!overall) process.exit(1);
}

main().catch((err) => {
  console.error("");
  console.error("MULTI PROFILE SMOKE CRASHED");
  console.error(err);
  process.exit(1);
});
