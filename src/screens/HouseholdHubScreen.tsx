import React from "react";
import { Alert, BackHandler, Platform, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/PrimaryButton";
import AppScreenShell from "../components/layout/AppScreenShell";
import AppCard from "../components/ui/AppCard";
import { useProfileStore } from "../hooks/useProfileStore";
import { HOUSEHOLD_COPY } from "../modules/household/helpers/householdHubContent";
import { profileTypeLabel } from "../modules/household/helpers/householdHubScreenHelpers";
import { householdHubStyles as styles } from "../modules/household/styles/householdHubStyles";

export default function HouseholdHubScreen({ navigation }: { navigation: any }) {
  const { account, activeProfile, setActiveProfileId, deleteProfile } = useProfileStore();
  const profiles = account?.profiles ?? [];

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }
    navigation?.reset?.({ index: 0, routes: [{ name: "Home" }] });
  };

  const handleExitApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
      return;
    }
    Alert.alert("Exit App", "Exit is Android-only in this build.");
  };

  const handleEditProfile = (profileId: string) => {
    setActiveProfileId(profileId);
    navigation.navigate("Profile", { mode: "edit", profileId });
  };

  const handleDeleteProfile = (profileId: string, label: string) => {
    Alert.alert("Delete profile", `Remove ${label}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteProfile(profileId) },
    ]);
  };

  return (
    <AppScreenShell>
      <View style={styles.topBar}>
        <Pressable onPress={handleBack} style={styles.topBarButton}>
          <Text style={styles.topBarButtonText}>BACK</Text>
        </Pressable>
        <Pressable onPress={handleExitApp} style={styles.topBarButtonExit}>
          <Text style={styles.topBarButtonExitText}>EXIT</Text>
        </Pressable>
      </View>

      <LinearGradient
        colors={["rgba(20,24,22,0.92)", "rgba(12,16,14,0.96)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.eyebrow}>{HOUSEHOLD_COPY.eyebrow}</Text>
        <Text style={styles.title}>{HOUSEHOLD_COPY.title}</Text>
        <Text style={styles.subtitle}>{HOUSEHOLD_COPY.subtitle}</Text>
        <Text style={styles.subtitle}>{HOUSEHOLD_COPY.body}</Text>

        <View style={styles.heroStats}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Profiles</Text>
            <Text style={styles.statValue}>{profiles.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{HOUSEHOLD_COPY.activeProfileTitle}</Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {activeProfile?.label ?? "None"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <AppCard>
        <Text style={styles.sectionTitle}>{HOUSEHOLD_COPY.savedTitle}</Text>
        <Text style={styles.sectionSubtitle}>{HOUSEHOLD_COPY.savedSubtitle}</Text>

        {profiles.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>{HOUSEHOLD_COPY.emptyTitle}</Text>
            <Text style={styles.emptyText}>{HOUSEHOLD_COPY.emptyText}</Text>
          </View>
        ) : (
          <View style={styles.profileList}>
            {profiles.map((profile) => {
              const isActive = activeProfile?.id === profile.id;

              return (
                <View key={profile.id} style={[styles.profileCard, isActive && styles.profileCardActive]}>
                  <View style={styles.profileCardTop}>
                    <View style={styles.profileTextWrap}>
                      <Text style={[styles.profileName, isActive && styles.profileNameActive]} numberOfLines={1}>
                        {profile.label}
                      </Text>
                      <Text style={[styles.profileMeta, isActive && styles.profileMetaActive]}>
                        {profileTypeLabel(profile.type)}
                      </Text>
                    </View>

                    {isActive ? (
                      <View style={styles.activeBadge}>
                        <Text style={styles.activeBadgeText}>ACTIVE</Text>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.profileActions}>
                    {!isActive ? (
                      <Pressable onPress={() => setActiveProfileId(profile.id)} style={styles.actionPill}>
                        <Text style={styles.actionPillText}>Set Active</Text>
                      </Pressable>
                    ) : null}

                    <Pressable onPress={() => handleEditProfile(profile.id)} style={styles.actionPillPrimary}>
                      <Text style={styles.actionPillPrimaryText}>Edit</Text>
                    </Pressable>

                    <Pressable onPress={() => handleDeleteProfile(profile.id, profile.label)} style={styles.actionPill}>
                      <Text style={styles.actionPillText}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>{HOUSEHOLD_COPY.createTitle}</Text>
        <PrimaryButton title={HOUSEHOLD_COPY.createTitle} onPress={() => navigation.navigate("Profile", { mode: "create" })} />
      </AppCard>
    </AppScreenShell>
  );
}



