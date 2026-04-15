export function debugProfileScreenRender(payload: {
  activeProfileId?: string | null;
  label: string;
  profileType: string;
}) {
  console.log("[ProfileScreenDebug]", {
    activeProfileId: payload.activeProfileId ?? null,
    label: payload.label,
    profileType: payload.profileType,
  });
}




