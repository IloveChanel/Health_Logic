import { StyleSheet } from "react-native";

export const householdHubStyles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1A221E",
    backgroundColor: "rgba(20,24,22,0.88)",
    marginBottom: 16,
  },
  eyebrow: {
    color: "#00FF41",
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: 10,
    fontWeight: "800",
  },
  title: {
    color: "#F3FFF8",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#98ACA2",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,255,65,0.18)",
  },
  statLabel: {
    color: "#98ACA2",
    fontSize: 10,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statValue: {
    color: "#F3FFF8",
    fontSize: 20,
    fontWeight: "800",
  },
  sectionTitle: {
    color: "#F3FFF8",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  sectionSubtitle: {
    color: "#98ACA2",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 14,
  },
  emptyCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1A221E",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  emptyTitle: {
    color: "#F3FFF8",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  emptyText: {
    color: "#98ACA2",
    fontSize: 14,
  },
  profileList: {
    gap: 12,
  },
  profileCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1A221E",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  profileCardActive: {
    borderColor: "#00FF41",
    backgroundColor: "rgba(0,255,65,0.08)",
  },
  profileCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 8,
  },
  profileTextWrap: {
    flex: 1,
  },
  profileName: {
    color: "#F3FFF8",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  profileNameActive: {
    color: "#00FF94",
  },
  profileMeta: {
    color: "#98ACA2",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  profileMetaActive: {
    color: "#B8FFE0",
  },
  activeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#00FF41",
  },
  activeBadgeText: {
    color: "#08100D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  profileActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  actionPill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "#1A221E",
  },
  actionPillText: {
    color: "#F3FFF8",
    fontSize: 13,
    fontWeight: "700",
  },
  actionPillPrimary: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#00FF41",
    borderWidth: 1,
    borderColor: "#00FF41",
  },
  actionPillPrimaryText: {
    color: "#08100D",
    fontSize: 13,
    fontWeight: "800",
  },

  topBar: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBarButton: {
    paddingVertical: 4,
  },
  topBarButtonText: {
    color: "#00FF41",
    fontWeight: "800",
    letterSpacing: 1,
  },
  topBarButtonExit: {
    paddingVertical: 4,
  },
  topBarButtonExitText: {
    color: "#FF4D4D",
    fontWeight: "800",
    letterSpacing: 1,
  },
});




