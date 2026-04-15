import { useProfileStore } from "../../src/hooks/useProfileStore";

type SmokeResult = {
  name: string;
  saved: boolean;
  presentInProfiles: boolean;
  activated: boolean;
};

function getStoreApi() {
  const hookAny = useProfileStore as any;
  if (typeof hookAny.getState !== "function") {
    throw new Error("useProfileStore.getState() not available");
  }
  return hookAny;
}

function printLine(name: string, value: boolean) {
  console.log(`${name.padEnd(42, " ")} ${value ? "TRUE" : "FALSE"}`);
}

async function main() {
  const storeApi = getStoreApi();
  const initialState = storeApi.getState();

  if (typeof initialState.saveOrUpdateProfile !== "function") {
    throw new Error("saveOrUpdateProfile() not found on store");
  }

  if (typeof initialState.setActiveProfileId !== "function") {
    throw new Error("setActiveProfileId() not found on store");
  }

  const stamp = Date.now();

  const cases = [
    {
      name: "YOU profile",
      payload: {
        label: `SMOKE_YOU_${stamp}`,
        type: "you",
        sex: "female" as const,
      },
    },
    {
      name: "CHILD profile",
      payload: {
        label: `SMOKE_CHILD_${stamp}`,
        type: "child",
        sex: "female" as const,
      },
    },
    {
      name: "PET profile",
      payload: {
        label: `SMOKE_PET_${stamp}`,
        type: "pet",
        sex: "pet" as const,
        petType: "Dog",
      },
    },
  ];

  const results: SmokeResult[] = [];

  for (const testCase of cases) {
    const before = storeApi.getState();
    const beforeProfiles = before.account?.profiles ?? [];

    const saveResult = before.saveOrUpdateProfile(testCase.payload);
    const afterSave = storeApi.getState();
    const afterProfiles = afterSave.account?.profiles ?? [];

    const saved = !!saveResult?.ok && afterProfiles.length >= beforeProfiles.length;

    const found = afterProfiles.find((p: any) => p?.label === testCase.payload.label);
    const presentInProfiles = !!found;

    let activated = false;
    if (found?.id) {
      afterSave.setActiveProfileId(found.id);
      const afterActivate = storeApi.getState();
      activated = afterActivate.activeProfile?.id === found.id;
    }

    results.push({
      name: testCase.name,
      saved,
      presentInProfiles,
      activated,
    });
  }

  console.log("");
  console.log("=== PROFILE SAVE SMOKE TEST ===");

  let allPass = true;

  for (const result of results) {
    const saveKey = `${result.name} saved`;
    const presentKey = `${result.name} in account.profiles`;
    const activeKey = `${result.name} can be activated`;

    printLine(saveKey, result.saved);
    printLine(presentKey, result.presentInProfiles);
    printLine(activeKey, result.activated);

    if (!result.saved || !result.presentInProfiles || !result.activated) {
      allPass = false;
    }
  }

  console.log("");
  if (allPass) {
    console.log("OVERALL_PROFILE_SAVE_SMOKE              TRUE");
    process.exit(0);
  } else {
    console.log("OVERALL_PROFILE_SAVE_SMOKE              FALSE");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("");
  console.error("PROFILE SAVE SMOKE TEST CRASHED");
  console.error(err);
  process.exit(1);
});
