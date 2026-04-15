export function getProfileGreeting(activeProfile: any, firstName: string) {
  const name = ((activeProfile?.label ?? firstName ?? "") + "").trim();
  return name ? `Hello, ${name}` : "Hello there";
}




