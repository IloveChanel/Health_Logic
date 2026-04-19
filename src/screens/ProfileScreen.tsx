import React, { useEffect, useMemo, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import ToggleSection from "../components/profile/ToggleSection";
import AppTopBar from "../components/AppTopBar";
import AppScreenShell from "../components/layout/AppScreenShell";
import { submitCustomProfileOption } from "../api";
import { useProfileStore } from "../hooks/useProfileStore";
import {
  AGE_OPTIONS,
  PET_TYPE_OPTIONS,
  PROFILE_SECTIONS,
  PROFILE_TYPE_OPTIONS,
  ProfileType,
  SEX_OPTIONS,
} from "../modules/profile/helpers/profileBuilderSections";
import {
  createInitialProfileOpenState,
  splitIngredientText,
  toggleInList,
} from "../modules/profile/helpers/profileScreenHelpers";
import ToggleChip from "../modules/profile/components/ToggleChip";
import { profileScreenStyles as styles } from "../modules/profile/styles/profileScreenStyles";
import { colors } from "../theme/theme";
import { buildProfileSaveInput } from "../modules/profile/helpers/buildProfileSaveInput";
import {
  loadCustomProfileOptions,
  mergeCustomOptions,
  saveCustomProfileOption,
} from "../modules/profile/helpers/customProfileOptions";
import { getProfileSelectionCount } from "../modules/profile/helpers/profileSelectionCount";

export default function ProfileScreen({ navigation, route }: { navigation: any; route?: { params?: { mode?: "create" | "edit"; profileId?: string | null } } }) {
  const { account, activeProfile, saveOrUpdateProfile } = useProfileStore();
  const isCreateMode = route?.params?.mode === "create";
  const isEditingExistingProfile = !isCreateMode && !!activeProfile?.id;

  const [profileType, setProfileType] = useState<ProfileType>("you");
  const [label, setLabel] = useState(isCreateMode ? "" : (activeProfile?.label ?? ""));
  const [ageGroup, setAgeGroup] = useState("Adult");
  const [sex, setSex] = useState("Female");
  const [petType, setPetType] = useState("Dog");

  const [dietPreferences, setDietPreferences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [skinConditions, setSkinConditions] = useState<string[]>([]);
  const [lifeStageFlags, setLifeStageFlags] = useState<string[]>([]);
  const [wellnessGoals, setWellnessGoals] = useState<string[]>([]);

  const [petBreedTypes, setPetBreedTypes] = useState<string[]>([]);
  const [petLifeStages, setPetLifeStages] = useState<string[]>([]);
  const [petDietaryNeed, setPetDietaryNeed] = useState<string[]>([]);
  const [petAllergies, setPetAllergies] = useState<string[]>([]);
  const [petHealthConditions, setPetHealthConditions] = useState<string[]>([]);
  const [petWellnessGoals, setPetWellnessGoals] = useState<string[]>([]);

  const [avoidIngredients, setAvoidIngredients] = useState("");
  const [preferIngredients, setPreferIngredients] = useState("");

  const [otherEntries, setOtherEntries] = useState<Record<string, string[]>>({});
  const [otherDrafts, setOtherDrafts] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<Record<string, boolean>>(createInitialProfileOpenState());
  const [customOptions, setCustomOptions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let mounted = true;

    (async () => {
      const loaded = await loadCustomProfileOptions();
      if (mounted) {
        setCustomOptions(loaded);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedCount = useMemo(() => {
    return getProfileSelectionCount({
      dietPreferences,
      allergies,
      healthConditions,
      skinTypes,
      skinConditions,
      lifeStageFlags,
      wellnessGoals,
      petBreedTypes,
      petLifeStages,
      petDietaryNeed,
      petAllergies,
      petHealthConditions,
      petWellnessGoals,
    });
  }, [
    dietPreferences,
    allergies,
    healthConditions,
    skinTypes,
    skinConditions,
    lifeStageFlags,
    wellnessGoals,
    petBreedTypes,
    petLifeStages,
    petDietaryNeed,
    petAllergies,
    petHealthConditions,
    petWellnessGoals,
  ]);

  const toggleSection = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
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

    await submitCustomProfileOption({
      category: section,
      value: rawValue,
    });

    const updatedCustomOptions = await saveCustomProfileOption(section, rawValue);
    setCustomOptions(updatedCustomOptions);

    setOtherEntries((prev) => ({
      ...prev,
      [section]: [...(prev[section] ?? []), rawValue],
    }));

    setOtherDrafts((prev) => ({
      ...prev,
      [section]: "",
    }));
  };

  const renderOther = (section: string) => (
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

  const handleSaveProfile = () => {
    const normalizedLabel = label.trim().toLowerCase();
    const isEditingExistingProfile = !!activeProfile?.id;
    const profileTypeForSave = profileType === "adult" ? "you" : profileType;

    const duplicateProfile = (account?.profiles ?? []).find((profile) => {
      if (isEditingExistingProfile && profile?.id === activeProfile?.id) {
        return false;
      }

      return (
        ((profile?.label ?? "").trim().toLowerCase() === normalizedLabel) &&
        profile?.type === profileTypeForSave
      );
    });

    if (duplicateProfile) {
      Alert.alert(
        "Profile already exists",
        "A profile with this name already exists for this profile type."
      );
      return;
    }

    if (!label.trim()) {
      Alert.alert("Name required", "Please add a profile name.");
      return;
    }

    const result = saveOrUpdateProfile(
      buildProfileSaveInput({
        activeProfileId: route?.params?.mode === 'create' ? null : route?.params?.profileId,
        label,
        profileType,
        ageGroup,
        sex,
        petType,
        dietPreferences,
        allergies,
        healthConditions,
        skinTypes,
        skinConditions,
        lifeStageFlags,
        wellnessGoals,
        petBreedTypes,
        petLifeStages,
        petDietaryNeed,
        petAllergies,
        petHealthConditions,
        petWellnessGoals,
        avoidIngredients: splitIngredientText(avoidIngredients),
        preferIngredients: splitIngredientText(preferIngredients),
        otherEntries,
      })
    );

    if (!result.ok) {
      Alert.alert("Could not save profile", "Please review the profile and try again.");
      return;
    }

    Alert.alert("Profile saved", "Profile saved successfully.");
    navigation.navigate("HouseholdHub");
  };

  return (
    <AppScreenShell>
      <AppTopBar navigation={navigation} />

      <View style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>HEALTH LOGIC PROFILE</Text>
          <Text style={styles.title}>Configure your scanning profile</Text>
          <Text style={styles.subtitle}>
            Open only the sections you want and save the profile for future scans.
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Selections</Text>
              <Text style={styles.statValue}>{selectedCount}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Profile</Text>
              <Text style={styles.statValue}>{label.trim() || "New"}</Text>
            </View>
          </View>
        </View>

        <ToggleSection
          title="Profile type"
          subtitle="You, Adult, Child, Pet"
          open={open.profile}
          onToggle={() => toggleSection("profile")}
        >
          <View style={styles.chipWrap}>
            {PROFILE_TYPE_OPTIONS.map((item) => (
              <ToggleChip
                key={item.id}
                label={item.label}
                selected={profileType === item.id}
                onPress={() => {
                  setProfileType(item.id);
                  if (item.id === "child") setOpen((prev) => ({ ...prev, details: true }));
                  if (item.id === "pet") setOpen((prev) => ({ ...prev, petProfile: true }));
                }}
              />
            ))}
          </View>
        </ToggleSection>

        <ToggleSection
          title="Core details"
          subtitle="Name, age group, sex, and pet type"
          open={open.details}
          onToggle={() => toggleSection("details")}
        >
          <Text style={styles.inlineLabel}>Profile name</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Enter profile name"
            placeholderTextColor={colors.secondaryText}
            style={styles.input}
          />

          <Text style={styles.inlineLabel}>Age group</Text>
          <View style={styles.chipWrap}>
            {AGE_OPTIONS[profileType].map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={ageGroup === item}
                onPress={() => setAgeGroup(item)}
              />
            ))}
          </View>

          {profileType !== "pet" ? (
            <>
              <Text style={styles.inlineLabel}>Sex</Text>
              <View style={styles.chipWrap}>
                {SEX_OPTIONS.map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={sex === item}
                    onPress={() => setSex(item)}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.inlineLabel}>Pet type</Text>
              <View style={styles.chipWrap}>
                {PET_TYPE_OPTIONS.map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petType === item}
                    onPress={() => setPetType(item)}
                  />
                ))}
              </View>
            </>
          )}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.diet.title}
          subtitle={PROFILE_SECTIONS.diet.subtitle}
          open={open.diet}
          onToggle={() => toggleSection("diet")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.diet.options, customOptions[PROFILE_SECTIONS.diet.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={dietPreferences.includes(item)}
                onPress={() => setDietPreferences(toggleInList(dietPreferences, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.diet.title)}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.allergies.title}
          subtitle={PROFILE_SECTIONS.allergies.subtitle}
          open={open.allergies}
          onToggle={() => toggleSection("allergies")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.allergies.options, customOptions[PROFILE_SECTIONS.allergies.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={allergies.includes(item)}
                onPress={() => setAllergies(toggleInList(allergies, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.allergies.title)}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.conditions.title}
          subtitle={PROFILE_SECTIONS.conditions.subtitle}
          open={open.conditions}
          onToggle={() => toggleSection("conditions")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.conditions.options, customOptions[PROFILE_SECTIONS.conditions.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={healthConditions.includes(item)}
                onPress={() => setHealthConditions(toggleInList(healthConditions, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.conditions.title)}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.skinTypes.title}
          subtitle={PROFILE_SECTIONS.skinTypes.subtitle}
          open={open.skinTypes}
          onToggle={() => toggleSection("skinTypes")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.skinTypes.options, customOptions[PROFILE_SECTIONS.skinTypes.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={skinTypes.includes(item)}
                onPress={() => setSkinTypes(toggleInList(skinTypes, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.skinTypes.title)}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.skinConditions.title}
          subtitle={PROFILE_SECTIONS.skinConditions.subtitle}
          open={open.skinConditions}
          onToggle={() => toggleSection("skinConditions")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.skinConditions.options, customOptions[PROFILE_SECTIONS.skinConditions.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={skinConditions.includes(item)}
                onPress={() => setSkinConditions(toggleInList(skinConditions, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.skinConditions.title)}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.lifeStage.title}
          subtitle={PROFILE_SECTIONS.lifeStage.subtitle}
          open={open.lifeStage}
          onToggle={() => toggleSection("lifeStage")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.lifeStage.options, customOptions[PROFILE_SECTIONS.lifeStage.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={lifeStageFlags.includes(item)}
                onPress={() => setLifeStageFlags(toggleInList(lifeStageFlags, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.lifeStage.title)}
        </ToggleSection>

        <ToggleSection
          title={PROFILE_SECTIONS.wellness.title}
          subtitle={PROFILE_SECTIONS.wellness.subtitle}
          open={open.wellness}
          onToggle={() => toggleSection("wellness")}
        >
          <View style={styles.chipWrap}>
            {mergeCustomOptions(PROFILE_SECTIONS.wellness.options, customOptions[PROFILE_SECTIONS.wellness.title] ?? []).map((item) => (
              <ToggleChip
                key={item}
                label={item}
                selected={wellnessGoals.includes(item)}
                onPress={() => setWellnessGoals(toggleInList(wellnessGoals, item))}
              />
            ))}
          </View>
          {renderOther(PROFILE_SECTIONS.wellness.title)}
        </ToggleSection>

        <ToggleSection
          title="Ingredient preferences"
          subtitle="Avoid and prefer ingredient notes"
          open={open.ingredients}
          onToggle={() => toggleSection("ingredients")}
        >
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
        </ToggleSection>

        {profileType === "pet" ? (
          <>
            <ToggleSection
              title="Pet profile"
              subtitle="Pet-specific sections"
              open={open.petProfile}
              onToggle={() => toggleSection("petProfile")}
            >
              <Text style={styles.sectionHint}>Open the pet sections below as needed.</Text>
            </ToggleSection>

            <ToggleSection
              title={PROFILE_SECTIONS.petBreed.title}
              subtitle={PROFILE_SECTIONS.petBreed.subtitle}
              open={open.petBreed}
              onToggle={() => toggleSection("petBreed")}
            >
              <View style={styles.chipWrap}>
                {PROFILE_SECTIONS.petBreed.options.map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petBreedTypes.includes(item)}
                    onPress={() => setPetBreedTypes(toggleInList(petBreedTypes, item))}
                  />
                ))}
              </View>
            </ToggleSection>

            <ToggleSection
              title={PROFILE_SECTIONS.petLifeStage.title}
              subtitle={PROFILE_SECTIONS.petLifeStage.subtitle}
              open={open.petLifeStage}
              onToggle={() => toggleSection("petLifeStage")}
            >
              <View style={styles.chipWrap}>
                {PROFILE_SECTIONS.petLifeStage.options.map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petLifeStages.includes(item)}
                    onPress={() => setPetLifeStages(toggleInList(petLifeStages, item))}
                  />
                ))}
              </View>
            </ToggleSection>

            <ToggleSection
              title={PROFILE_SECTIONS.petDiet.title}
              subtitle={PROFILE_SECTIONS.petDiet.subtitle}
              open={open.petDiet}
              onToggle={() => toggleSection("petDiet")}
            >
              <View style={styles.chipWrap}>
                {mergeCustomOptions(PROFILE_SECTIONS.petDiet.options, customOptions[PROFILE_SECTIONS.petDiet.title] ?? []).map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petDietaryNeed.includes(item)}
                    onPress={() => setPetDietaryNeed(toggleInList(petDietaryNeed, item))}
                  />
                ))}
              </View>
              {renderOther(PROFILE_SECTIONS.petDiet.title)}
            </ToggleSection>

            <ToggleSection
              title={PROFILE_SECTIONS.petAllergies.title}
              subtitle={PROFILE_SECTIONS.petAllergies.subtitle}
              open={open.petAllergies}
              onToggle={() => toggleSection("petAllergies")}
            >
              <View style={styles.chipWrap}>
                {mergeCustomOptions(PROFILE_SECTIONS.petAllergies.options, customOptions[PROFILE_SECTIONS.petAllergies.title] ?? []).map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petAllergies.includes(item)}
                    onPress={() => setPetAllergies(toggleInList(petAllergies, item))}
                  />
                ))}
              </View>
              {renderOther(PROFILE_SECTIONS.petAllergies.title)}
            </ToggleSection>

            <ToggleSection
              title={PROFILE_SECTIONS.petConditions.title}
              subtitle={PROFILE_SECTIONS.petConditions.subtitle}
              open={open.petConditions}
              onToggle={() => toggleSection("petConditions")}
            >
              <View style={styles.chipWrap}>
                {mergeCustomOptions(PROFILE_SECTIONS.petConditions.options, customOptions[PROFILE_SECTIONS.petConditions.title] ?? []).map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petHealthConditions.includes(item)}
                    onPress={() =>
                      setPetHealthConditions(toggleInList(petHealthConditions, item))
                    }
                  />
                ))}
              </View>
              {renderOther(PROFILE_SECTIONS.petConditions.title)}
            </ToggleSection>

            <ToggleSection
              title={PROFILE_SECTIONS.petWellness.title}
              subtitle={PROFILE_SECTIONS.petWellness.subtitle}
              open={open.petWellness}
              onToggle={() => toggleSection("petWellness")}
            >
              <View style={styles.chipWrap}>
                {mergeCustomOptions(PROFILE_SECTIONS.petWellness.options, customOptions[PROFILE_SECTIONS.petWellness.title] ?? []).map((item) => (
                  <ToggleChip
                    key={item}
                    label={item}
                    selected={petWellnessGoals.includes(item)}
                    onPress={() => setPetWellnessGoals(toggleInList(petWellnessGoals, item))}
                  />
                ))}
              </View>
              {renderOther(PROFILE_SECTIONS.petWellness.title)}
            </ToggleSection>
          </>
        ) : null}

        <View style={styles.saveSpacer} />
        <PrimaryButton title="Save Profile" onPress={handleSaveProfile} />
      </View>
    </AppScreenShell>
  );
}














