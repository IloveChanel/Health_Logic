import React, { useEffect, useState } from "react";
import ScoreGauge from "../components/ui/ScoreGauge";
import ResultReveal from "../components/effects/ResultReveal";
import { Text, View, Image } from "react-native";
import GlassCard from "../components/GlassCard";
import Divider from "../components/Divider";
import IngredientCard from "../components/IngredientCard";
import AppTopBar from "../components/AppTopBar";
import AppScreenShell from "../components/layout/AppScreenShell";
import { useProfileStore } from "../hooks/useProfileStore";
import { RESULT_SCREEN_COPY } from "../modules/result/helpers/resultScreenContent";
import { isAcceptedIngredient, normalizeIngredientName } from "../modules/result/helpers/resultScreenHelpers";
import { resultScreenStyles as styles } from "../modules/result/styles/resultScreenStyles";
import { shouldShowResultScore } from "../modules/result/helpers/resultScoreVisibility";
import { extractIngredientTextFromImage, type IngredientOcrResult } from "../engine/ingredientOcrBridge";
import { getResultDebugSummary } from "../modules/result/helpers/resultDebugSummary";

export default function ResultScreen({ route, navigation }: any) {
  const { activeProfile } = useProfileStore();
  const analysis = route?.params?.analysis;
  const scanMode = route?.params?.scanMode;
  const imageUri = route?.params?.imageUri;

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<IngredientOcrResult | null>(null);

  const debugSummary = getResultDebugSummary(analysis);

  const preferredIngredients = (activeProfile?.profile?.preferIngredients ?? []).map((x: string) =>
    normalizeIngredientName(x)
  );

  const isCameraOnly = scanMode === "camera" && !analysis;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!isCameraOnly || !imageUri) return;

      setOcrLoading(true);
      const result = await extractIngredientTextFromImage(imageUri);

      if (!cancelled) {
        setOcrResult(result);
        setOcrLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [isCameraOnly, imageUri]);

  return (
    <AppScreenShell>
      <AppTopBar navigation={navigation} />

      <View style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{RESULT_SCREEN_COPY.eyebrow}</Text>
          <Text style={styles.title}>{RESULT_SCREEN_COPY.title}</Text>
          <Text style={styles.subtitle}>
            {isCameraOnly
              ? "Ingredient label captured"
              : analysis?.productName ?? RESULT_SCREEN_COPY.emptyBody}
          </Text>
        </View>

        <View style={{ padding: 12, marginBottom: 12, backgroundColor: "#111", borderRadius: 12 }}>
          <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 6 }}>DEBUG SUMMARY</Text>
          <Text style={{ color: "#fff" }}>productName: {String(debugSummary.productName)}</Text>
          <Text style={{ color: "#fff" }}>brandName: {String(debugSummary.brandName)}</Text>
          <Text style={{ color: "#fff" }}>ingredientCount: {String(debugSummary.ingredientCount)}</Text>
          <Text style={{ color: "#fff" }}>ingredientsPreview: {JSON.stringify(debugSummary.ingredientsPreview)}</Text>
          <Text style={{ color: "#fff" }}>explanation: {String(debugSummary.explanation)}</Text>
        </View>

        {isCameraOnly ? (
          <>
            <ResultReveal><GlassCard>
              <View style={styles.cardBlock}>
                <Text style={styles.cardTitle}>Camera ingredient scan received</Text>
                <Text style={styles.body}>
                  The ingredient image was captured successfully and passed into camera scan mode.
                </Text>
                <Text style={styles.body}>
                  OCR bridge status: {ocrLoading ? "processing" : (ocrResult?.status ?? "idle")}
                </Text>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: "100%", height: 320, marginTop: 16, borderRadius: 16 }}
                    resizeMode="contain"
                  />
                ) : null}
              </View>
            </GlassCard></ResultReveal>

            <ResultReveal><GlassCard>
              <View style={styles.cardBlock}>
                <Text style={styles.cardTitle}>OCR extraction</Text>

                {ocrLoading ? (
                  <Text style={styles.body}>Extracting ingredient text from image…</Text>
                ) : (
                  <>
                    <Text style={styles.body}>
                      {ocrResult?.explanation ?? "OCR has not started."}
                    </Text>

                    {ocrResult?.rawText ? (
                      <>
                        <Divider />
                        <Text style={styles.cardTitle}>Raw text</Text>
                        <Text style={styles.body}>{ocrResult.rawText}</Text>
                      </>
                    ) : null}

                    {ocrResult?.ingredients?.length ? (
                      <>
                        <Divider />
                        <Text style={styles.cardTitle}>Extracted ingredients</Text>
                        {ocrResult.ingredients.map((ingredient: string, idx: number) => (
                          <Text key={idx} style={styles.body}>• {ingredient}</Text>
                        ))}
                      </>
                    ) : null}
                  </>
                )}
              </View>
            </GlassCard></ResultReveal>
          </>
        ) : !analysis ? (
          <ResultReveal><GlassCard>
            <View style={styles.cardBlock}>
              <Text style={styles.cardTitle}>{RESULT_SCREEN_COPY.emptyTitle}</Text>
              <Text style={styles.body}>{RESULT_SCREEN_COPY.emptyBody}</Text>
            </View>
          </GlassCard></ResultReveal>
        ) : (
          <>
            <ResultReveal><GlassCard>
              {analysis?.overallScore != null && shouldShowResultScore("summary") ? (
                <ScoreGauge score={analysis.overallScore} />
              ) : null}
              <View style={styles.cardBlock}>
                <Text style={styles.cardTitle}>
                  {analysis.productName || RESULT_SCREEN_COPY.fallbackProductName}
                </Text>
                <Text style={styles.body}>
                  Brand: {analysis.brandName || RESULT_SCREEN_COPY.fallbackBrandName}
                </Text>
                <Divider />
                <Text style={styles.score}>
                  {RESULT_SCREEN_COPY.scoreLabel}: {analysis.overallScore}%
                </Text>
                <Text style={styles.score}>
                  {RESULT_SCREEN_COPY.fitLabel}: {analysis.fitForUserScore}%
                </Text>

                {analysis.nova?.label ? (
                  <Text style={styles.body}>
                    {RESULT_SCREEN_COPY.processingLabel}: {analysis.nova.label}
                  </Text>
                ) : null}

                <Text style={styles.body}>
                  {analysis.explanation || RESULT_SCREEN_COPY.fallbackExplanation}
                </Text>
              </View>
            </GlassCard></ResultReveal>

            <ResultReveal><GlassCard>
              <View style={styles.cardBlock}>
                <Text style={styles.cardTitle}>{RESULT_SCREEN_COPY.redFlagsTitle}</Text>

                {analysis.redFlags?.length ? (
                  analysis.redFlags.map((flag: string, idx: number) => (
                    <Text key={idx} style={styles.flag}>
                      • {flag}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.body}>{RESULT_SCREEN_COPY.noRedFlags}</Text>
                )}
              </View>
            </GlassCard></ResultReveal>

            {analysis.petToxins?.length ? (
              <ResultReveal><GlassCard>
                <View style={styles.cardBlock}>
                  <Text style={styles.cardTitle}>{RESULT_SCREEN_COPY.petToxinsTitle}</Text>

                  {analysis.petToxins.map((flag: string, idx: number) => (
                    <Text key={idx} style={styles.flag}>
                      • {flag}
                    </Text>
                  ))}
                </View>
              </GlassCard></ResultReveal>
            ) : null}

            <ResultReveal><GlassCard>
              <View style={styles.cardBlock}>
                <Text style={styles.cardTitle}>{RESULT_SCREEN_COPY.ingredientsTitle}</Text>

                {analysis.ingredients?.length ? (
                  analysis.ingredients.map((ingredient: any, idx: number) => (
                    <IngredientCard
                      key={idx}
                      ingredient={ingredient}
                      accepted={isAcceptedIngredient(ingredient, preferredIngredients)}
                    />
                  ))
                ) : (
                  <Text style={styles.body}>{RESULT_SCREEN_COPY.noIngredients}</Text>
                )}
              </View>
            </GlassCard></ResultReveal>

            <ResultReveal><GlassCard>
              <View style={styles.cardBlock}>
                <Text style={styles.cardTitle}>{RESULT_SCREEN_COPY.alternativesTitle}</Text>

                {analysis.alternatives?.length ? (
                  analysis.alternatives.map((item: string, idx: number) => (
                    <Text key={idx} style={styles.body}>
                      • {item}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.body}>{RESULT_SCREEN_COPY.noAlternatives}</Text>
                )}
              </View>
            </GlassCard></ResultReveal>
          </>
        )}

        <View style={styles.spacer} />
      </View>
    </AppScreenShell>
  );
}



