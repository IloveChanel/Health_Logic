import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import {
  ALLERGIES,
  DIET_PREFERENCES,
  HEALTH_CONDITIONS,
  LIFE_STAGE_FLAGS,
  SKIN_CONDITIONS,
  SKIN_TYPES,
  WELLNESS_GOALS,
} from "../constants/profileOptions";
import { submitCustomProfileOption } from "../api";
import { colors, spacing, typography } from "../theme/theme";
import { useProfileStore } from "../hooks/useProfileStore";
import { defaultUserProfile, SubscriptionTier } from "../types/domain";

type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

type ToggleChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function ToggleChip({ label, selected, onPress }: ToggleChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function toggleInList(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function tierLabel(subscriptionTier: SubscriptionTier) {
  switch (subscriptionTier) {
    case "single_monthly":
      return "Single Monthly";
    case "family_monthly":
      return "Family Monthly";
    case "single_annual":
      return "Single Annual";
    case "family_annual":
      return "Family Annual";
  }
}

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const {
    account,
    activeProfile,
    tierLimits,
    setSubscriptionTier,
    saveOrUpdateProfile,
    deleteProfile,
    setActiveProfileId,
  } = useProfileStore();

  const [profileType, setProfileType] = useState<"you" | "child" | "pet">("you");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ageGroup, setAgeGroup] = useState("Adult");
  const [sex, setSex] = useState("Female");

  const [dietPreferences, setDietPreferences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [skinConditions, setSkinConditions] = useState<string[]>([]);
  const [lifeStageFlags, setLifeStageFlags] = useState<string[]>([]);
  const [wellnessGoals, setWellnessGoals] = useState<string[]>([]);
  const [avoidIngredients, setAvoidIngredients] = useState("");
  const [preferIngredients, setPreferIngredients] = useState("");

  const [petType, setPetType] = useState("Dog");
  const [petLifeStage, setPetLifeStage] = useState("Adult");
  const [petDietaryNeed, setPetDietaryNeed] = useState<string[]>([]);

  const [customCategory, setCustomCategory] = useState("");
  const [customEntry, setCustomEntry] = useState("");

  const [otherEntries, setOtherEntries] = useState<Record<string, string[]>>({
    "Diet preferences": [],
    "Allergies and sensitivities": [],
    "Health conditions": [],
    "Skin type": [],
    "Skin concerns": [],
    "Life stage": [],
    "Wellness goals": [],
  });

  const [otherDrafts, setOtherDrafts] = useState<Record<string, string>>({
    "Diet preferences": "",
    "Allergies and sensitivities": "",
    "Health conditions": "",
    "Skin type": "",
    "Skin concerns": "",
    "Life stage": "",
    "Wellness goals": "",
  });

  useEffect(() => {
    if (!activeProfile) return;

    setProfileType(activeProfile.type);
    setFirstName(activeProfile.label ?? "");
    setEmail(activeProfile.email ?? "");
    setZipCode(activeProfile.zipCode ?? "");
    setSex(
      activeProfile.sex === "male"
        ? "Male"
        : activeProfile.sex === "pet"
        ? "Pet"
        : "Female"
    );

    const p = activeProfile.profile ?? defaultUserProfile;

    setAgeGroup(
      p.ageGroup === "under18" ? "Under 18" :
      p.ageGroup === "mature" ? "Mature" :
      "Adult"
    );

    setDietPreferences(p.dietPreferences ?? []);
    setAllergies(p.allergies ?? []);
    setHealthConditions(p.healthConditions ?? []);
    setSkinTypes(p.skinTypes ?? []);
    setSkinConditions(p.skinConditions ?? []);
    setLifeStageFlags([
      ...(p.pregnancyMode ? ["Pregnancy"] : []),
      ...(p.breastfeedingMode ? ["Breastfeeding"] : []),
      ...(p.customFlags ?? []).filter(
        (item) => item !== "Pregnancy" && item !== "Breastfeeding"
      ),
    ]);
    setWellnessGoals([]);
    setAvoidIngredients((p.avoidIngredients ?? []).join(", "));
    setPreferIngredients((p.preferIngredients ?? []).join(", "));
    setPetType(activeProfile.petType ?? "Dog");
    setPetLifeStage(activeProfile.petLifeStage ?? "Adult");
    setPetDietaryNeed(activeProfile.petDietaryNeed ?? []);
  }, [activeProfile]);

  const selectedCount = useMemo(() => {
    return (
      dietPreferences.length +
      allergies.length +
      healthConditions.length +
      skinTypes.length +
      skinConditions.length +
      lifeStageFlags.length +
      wellnessGoals.length +
      petDietaryNeed.length
    );
  }, [
    dietPreferences,
    allergies,
    healthConditions,
    skinTypes,
    skinConditions,
    lifeStageFlags,
    wellnessGoals,
    petDietaryNeed,
  ]);

  const handleBack = () => {
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleExitApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
      return;
    }
    Alert.alert("Exit App", "Exit is Android-only in this build.");
  };

  const handleSaveCustom = async () => {
    if (!customCategory.trim() || !customEntry.trim()) {
      Alert.alert("Missing info", "Please fill in both Category and Other.");
      return;
    }

    await submitCustomProfileOption({
      category: customCategory.trim(),
      value: customEntry.trim(),
    });

    Alert.alert("Saved", `${customEntry.trim()} was sent to the backend learning hook.`);
    setCustomCategory("");
    setCustomEntry("");
  };

  const setOtherDraft = (section: string, value: string) => {
    setOtherDrafts((prev) => ({ ...prev, [section]: value }));
  };

  const addSectionOther = async (section: string) => {
    const rawValue = (otherDrafts[section] ?? "").trim();

    if (!rawValue) {
      Alert.alert("Other required", `Please type an item for ${section.toLowerCase()}.`);
      return;
    }

    const exists = (otherEntries[section] ?? []).some(
      (item) => item.toLowerCase() === rawValue.toLowerCase()
    );

    if (exists) {
      Alert.alert("Already added", "That item is already saved in this section.");
      return;
    }

    await submitCustomProfileOption({
      category: section,
      value: rawValue,
    });

    setOtherEntries((prev) => ({
      ...prev,
      [section]: [...(prev[section] ?? []), rawValue],
    }));

    setOtherDrafts((prev) => ({
      ...prev,
      [section]: "",
    }));

    Alert.alert("Saved", `${rawValue} was added to ${section}.`);
  };

  const handleSaveProfile = () => {
    if (!firstName.trim()) {
      Alert.alert("Name required", "Please add at least a first name for this profile.");
      return;
    }

    const result = saveOrUpdateProfile({
      id: activeProfile?.id ?? null,
      label: firstName.trim(),
      type: profileType,
      sex: sex === "Male" ? "male" : sex === "Pet" ? "pet" : "female",
      email: email.trim(),
      zipCode: zipCode.trim(),
      petType,
      petLifeStage,
      petDietaryNeed,
      profilePatch: {
        allergies,
        healthConditions,
        dietPreferences,
        skinTypes,
        skinConditions,
        avoidIngredients: avoidIngredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        preferIngredients: preferIngredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        ageGroup:
          ageGroup === "Under 18" ? "under18" :
          ageGroup === "Mature" ? "mature" :
          "adult",
        pregnancyMode: lifeStageFlags.includes("Pregnancy"),
        breastfeedingMode: lifeStageFlags.includes("Breastfeeding"),
        customFlags: lifeStageFlags.filter(
          (item) => item !== "Pregnancy" && item !== "Breastfeeding"
        ),
      },
    });

    if (!result.ok) {
      if (result.reason === "PET_LIMIT") {
        Alert.alert(
          "Pet not included",
          "Only annual subscriptions include 1 pet."
        );
        return;
      }

      if (result.reason === "PROFILE_LIMIT") {
        Alert.alert(
          "Profile limit reached",
          account.subscriptionTier === "single_monthly" || account.subscriptionTier === "single_annual"
            ? "This plan supports 1 human profile."
            : "This plan supports up to 5 human or child profiles."
        );
        return;
      }
    }

    Alert.alert(
      "Profile saved",
      activeProfile ? "Your profile was updated." : "Your profile was saved."
    );
  };

  const handleDeleteActiveProfile = () => {
    if (!activeProfile?.id) {
      Alert.alert("Nothing to delete", "There is no saved profile selected.");
      return;
    }

    deleteProfile(activeProfile.id);
    Alert.alert("Profile deleted", `${activeProfile.label} was removed.`);
  };

  const renderSectionOther = (section: string) => (
    <View style={styles.otherWrap}>
      <Text style={styles.inlineLabel}>Other</Text>
      <TextInput
        value={otherDrafts[section] ?? ""}
        onChangeText={(value) => setOtherDraft(section, value)}
        placeholder={`Add your own ${section.toLowerCase()} item`}
        placeholderTextColor={colors.secondaryText}
        style={styles.input}
      />
      <SecondaryButton
        title={`Add Other to ${section}`}
        onPress={() => {
          void addSectionOther(section);
        }}
      />
      {(otherEntries[section] ?? []).length > 0 ? (
        <View style={styles.chipWrap}>
          {(otherEntries[section] ?? []).map((item) => (
            <ToggleChip
              key={`${section}-${item}`}
              label={item}
              selected={true}
              onPress={() => {}}
            />
          ))}
        </View>
      ) : null}
    </View>
  );

  const ageOptions =
    profileType === "child"
      ? ["Baby", "Toddler", "Child", "Teen"]
      : profileType === "pet"
      ? ["Young", "Adult", "Senior"]
      : ["Under 18", "Adult", "Mature", "Senior"];

  const humanCount = account.profiles.filter((item) => item.type !== "pet").length;
  const petCount = account.profiles.filter((item) => item.type === "pet").length;

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#F7FBF8", "#EDF6F1", "#F8FBFA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bg}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <View style={styles.topBarRow}>
              <Pressable onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
              </Pressable>
              <Pressable onPress={handleExitApp} style={styles.exitButton}>
                <Text style={styles.exitButtonText}>Exit</Text>
              </Pressable>
            </View>
          </View>

          <LinearGradient
            colors={["#EEF8F2", "#F9FCFA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <Text style={styles.eyebrow}>Health Logic Profile</Text>
            <Text style={styles.title}>Build a smarter household filter</Text>
            <Text style={styles.subtitle}>
              Personalize ingredient scanning for food, supplements, vitamins, and beauty products.
            </Text>

            <View style={styles.heroStats}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Selections</Text>
                <Text style={styles.statValue}>{selectedCount}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Subscription</Text>
                <Text style={styles.statValue}>{tierLabel(account.subscriptionTier)}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Subscription access</Text>
            <Text style={styles.planText}>
              {account.subscriptionTier === "single_monthly" && `Single monthly active • ${humanCount}/1 person used • no pet included`}
              {account.subscriptionTier === "family_monthly" && `Family monthly active • ${humanCount}/5 profiles used • no pet included`}
              {account.subscriptionTier === "single_annual" && `Single annual active • ${humanCount}/1 person used • ${petCount}/1 pet included`}
              {account.subscriptionTier === "family_annual" && `Family annual active • ${humanCount}/5 profiles used • ${petCount}/1 pet included`}
            </Text>
            <View style={styles.planButtons}>
              <SecondaryButton title="Single Monthly" onPress={() => setSubscriptionTier("single_monthly")} />
              <SecondaryButton title="Family Monthly" onPress={() => setSubscriptionTier("family_monthly")} />
              <PrimaryButton title="Single Annual" onPress={() => setSubscriptionTier("single_annual")} />
              <PrimaryButton title="Family Annual" onPress={() => setSubscriptionTier("family_annual")} />
            </View>
          </View>

          {account.profiles.length > 0 ? (
            <View style={styles.savedProfilesCard}>
              <Text style={styles.savedProfilesTitle}>Saved profiles</Text>
              <View style={styles.chipWrap}>
                {account.profiles.map((item) => (
                  <ToggleChip
                    key={item.id}
                    label={item.label}
                    selected={activeProfile?.id === item.id}
                    onPress={() => setActiveProfileId(item.id)}
                  />
                ))}
              </View>
              <View style={styles.savedProfileActions}>
                <SecondaryButton title="Delete Active Profile" onPress={handleDeleteActiveProfile} />
              </View>
            </View>
          ) : null}

          <Section title="Profile type" subtitle="Create profiles for yourself, your child, or your pet.">
            <View style={styles.chipWrap}>
              {["You", "Child", "Pet"].map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={
                    (item === "You" && profileType === "you") ||
                    (item === "Child" && profileType === "child") ||
                    (item === "Pet" && profileType === "pet")
                  }
                  onPress={() =>
                    setProfileType(item === "You" ? "you" : item === "Child" ? "child" : "pet")
                  }
                />
              ))}
            </View>
          </Section>

          <Section title="Your details" subtitle="Only first name is required. Email and ZIP are optional.">
            <Text style={styles.inlineLabel}>Required</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name *"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />

            <Text style={styles.inlineLabel}>Optional</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email (optional)"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              value={zipCode}
              onChangeText={setZipCode}
              placeholder="ZIP code (optional)"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
              keyboardType="number-pad"
            />

            <Text style={styles.inlineLabel}>Age group</Text>
            <View style={styles.chipWrap}>
              {ageOptions.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={ageGroup === item}
                  onPress={() => setAgeGroup(item)}
                />
              ))}
            </View>

            <Text style={styles.inlineLabel}>Sex</Text>
            <View style={styles.chipWrap}>
              {["Female", "Male", "Pet"].map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={sex === item}
                  onPress={() => setSex(item)}
                />
              ))}
            </View>
          </Section>

          {profileType === "pet" ? (
            <Section title="Pet profile" subtitle="Set pet-specific ingredient filters and dietary needs.">
              <Text style={styles.inlineLabel}>Pet type</Text>
              <View style={styles.chipWrap}>
                {["Dog", "Cat", "Other Pet"].map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petType === item}
                    onPress={() => setPetType(item)}
                  />
                ))}
              </View>

              <Text style={styles.inlineLabel}>Life stage</Text>
              <View style={styles.chipWrap}>
                {["Young", "Adult", "Senior"].map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petLifeStage === item}
                    onPress={() => setPetLifeStage(item)}
                  />
                ))}
              </View>

              <Text style={styles.inlineLabel}>Dietary needs</Text>
              <View style={styles.chipWrap}>
                {["Sensitive Stomach", "Weight Control", "Skin & Coat", "Grain Free", "Renal Support"].map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petDietaryNeed.includes(item)}
                    onPress={() => setPetDietaryNeed(toggleInList(petDietaryNeed, item))}
                  />
                ))}
              </View>
            </Section>
          ) : null}

          <Section title="Diet preferences" subtitle="These help score foods, supplements, and ingredient compatibility.">
            <View style={styles.chipWrap}>
              {DIET_PREFERENCES.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={dietPreferences.includes(item)}
                  onPress={() => setDietPreferences(toggleInList(dietPreferences, item))}
                />
              ))}
            </View>
            {renderSectionOther("Diet preferences")}
          </Section>

          <Section title="Allergies and sensitivities">
            <View style={styles.chipWrap}>
              {ALLERGIES.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={allergies.includes(item)}
                  onPress={() => setAllergies(toggleInList(allergies, item))}
                />
              ))}
            </View>
            {renderSectionOther("Allergies and sensitivities")}
          </Section>

          <Section title="Health conditions">
            <View style={styles.chipWrap}>
              {HEALTH_CONDITIONS.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={healthConditions.includes(item)}
                  onPress={() => setHealthConditions(toggleInList(healthConditions, item))}
                />
              ))}
            </View>
            {renderSectionOther("Health conditions")}
          </Section>

          <Section title="Skin type">
            <View style={styles.chipWrap}>
              {SKIN_TYPES.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={skinTypes.includes(item)}
                  onPress={() => setSkinTypes(toggleInList(skinTypes, item))}
                />
              ))}
            </View>
            {renderSectionOther("Skin type")}
          </Section>

          <Section title="Skin concerns">
            <View style={styles.chipWrap}>
              {SKIN_CONDITIONS.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={skinConditions.includes(item)}
                  onPress={() => setSkinConditions(toggleInList(skinConditions, item))}
                />
              ))}
            </View>
            {renderSectionOther("Skin concerns")}
          </Section>

          <Section title="Life stage">
            <View style={styles.chipWrap}>
              {LIFE_STAGE_FLAGS.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={lifeStageFlags.includes(item)}
                  onPress={() => setLifeStageFlags(toggleInList(lifeStageFlags, item))}
                />
              ))}
            </View>
            {renderSectionOther("Life stage")}
          </Section>

          <Section title="Wellness goals">
            <View style={styles.chipWrap}>
              {WELLNESS_GOALS.map((item) => (
                <ToggleChip
                  key={item}
                  label={item}
                  selected={wellnessGoals.includes(item)}
                  onPress={() => setWellnessGoals(toggleInList(wellnessGoals, item))}
                />
              ))}
            </View>
            {renderSectionOther("Wellness goals")}
          </Section>

          <Section title="Ingredient preferences" subtitle="List anything you want to avoid or actively look for.">
            <TextInput
              value={avoidIngredients}
              onChangeText={setAvoidIngredients}
              placeholder="Ingredients to avoid"
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, styles.multilineInput]}
              multiline
            />
            <TextInput
              value={preferIngredients}
              onChangeText={setPreferIngredients}
              placeholder="Ingredients you prefer"
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, styles.multilineInput]}
              multiline
            />
          </Section>

          <Section title="Other" subtitle="Add anything not listed so it can feed the backend learning hook.">
            <TextInput
              value={customCategory}
              onChangeText={setCustomCategory}
              placeholder="Category"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />
            <TextInput
              value={customEntry}
              onChangeText={setCustomEntry}
              placeholder="Type your custom issue, allergy, ingredient concern, skin issue, or preference"
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, styles.multilineInput]}
              multiline
            />
            <SecondaryButton title="Add Other to Profile" onPress={handleSaveCustom} />
          </Section>

          <View style={styles.bottomActionCard}>
            <Pressable onPress={handleBack} style={styles.bottomHomeButton}>
              <Text style={styles.bottomHomeButtonText}>Back</Text>
            </Pressable>

            <View style={styles.bottomExitWrap}>
              <Pressable onPress={handleExitApp} style={styles.exitButton}>
                <Text style={styles.exitButtonText}>Exit</Text>
              </Pressable>
            </View>
          </View>

          <PrimaryButton title="Save Profile" onPress={handleSaveProfile} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  bg: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  topBar: { marginBottom: spacing.md },
  topBarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: { ...typography.bodySecondary, color: colors.primaryText },
  exitButton: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  exitButtonText: { ...typography.bodySecondary, color: colors.primaryText },
  hero: {
    borderRadius: 28,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryDark,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
    marginBottom: spacing.sm,
    fontSize: 34,
    lineHeight: 40,
  },
  subtitle: {
    ...typography.body,
    color: colors.secondaryText,
    lineHeight: 30,
    marginBottom: spacing.lg,
  },
  heroStats: { flexDirection: "row", gap: spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    ...typography.caption,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  statValue: { ...typography.h3, color: colors.primaryText },
  planCard: {
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  planTitle: { ...typography.h3, color: colors.primaryText, marginBottom: spacing.sm },
  planText: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    lineHeight: 28,
    marginBottom: spacing.md,
  },
  planButtons: { gap: spacing.sm },
  savedProfilesCard: {
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  savedProfilesTitle: { ...typography.h3, color: colors.primaryText, marginBottom: spacing.md },
  savedProfileActions: { marginTop: spacing.md },
  section: {
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: { ...typography.h3, color: colors.primaryText, marginBottom: spacing.xs },
  sectionSubtitle: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    lineHeight: 28,
    marginBottom: spacing.md,
  },
  inlineLabel: {
    ...typography.caption,
    color: colors.secondaryText,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "rgba(243,249,245,0.92)",
    color: colors.primaryText,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    ...typography.body,
  },
  multilineInput: { minHeight: 100, textAlignVertical: "top" },
  otherWrap: { marginTop: spacing.md, gap: spacing.sm },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    backgroundColor: "rgba(245,250,247,0.95)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.bodySecondary, color: colors.primaryText },
  chipTextSelected: { color: colors.white },
  bottomActionCard: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  bottomHomeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  bottomHomeButtonText: { ...typography.bodySecondary, color: colors.primaryText },
  bottomExitWrap: { alignSelf: "stretch" },
});
