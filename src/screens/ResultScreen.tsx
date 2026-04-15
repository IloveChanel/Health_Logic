import React from "react";
import ScoreGauge from "../components/ui/ScoreGauge";
import ResultReveal from "../components/effects/ResultReveal";
import { Text, View } from "react-native";
import GlassCard from "../components/GlassCard";
import Divider from "../components/Divider";
import IngredientCard from "../components/IngredientCard";
import AppTopBar from "../components/AppTopBar";
import AppScreenShell from "../components/layout/AppScreenShell";
import { useProfileStore } from "../hooks/useProfileStore";
import { RESULT_SCREEN_COPY } from "../modules/result/helpers/resultScreenContent";
import { isAcceptedIngredient, normalizeIngredientName } from "../modules/result/helpers/resultScreenHelpers";
import { resultScreenStyles as styles } from "../modules/result/styles/resultScreenStyles";

export default function ResultScreen({ route, navigation }: any) {
  const { activeProfile } = useProfileStore();
  const analysis = route?.params?.analysis;

  const preferredIngredients = (activeProfile?.profile?.preferIngredients ?? []).map((x: string) =>
    normalizeIngredientName(x)
  );

  return (
    <AppScreenShell>
      <AppTopBar navigation={navigation} />

      <View style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{RESULT_SCREEN_COPY.eyebrow}</Text>
          <Text style={styles.title}>{RESULT_SCREEN_COPY.title}</Text>
          <Text style={styles.subtitle}>
            {analysis?.productName ?? RESULT_SCREEN_COPY.emptyBody}
          </Text>
        </View>

        {!analysis ? (
          <ResultReveal><GlassCard>
{analysis?.overallScore != null && (
<ScoreGauge score={analysis.overallScore} />
)}
            <View style={styles.cardBlock}>
              <Text style={styles.cardTitle}>{RESULT_SCREEN_COPY.emptyTitle}</Text>
              <Text style={styles.body}>{RESULT_SCREEN_COPY.emptyBody}</Text>
            </View>
          </GlassCard></ResultReveal>
        ) : (
          <>
            <ResultReveal><GlassCard>
{analysis?.overallScore != null && (
<ScoreGauge score={analysis.overallScore} />
)}
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
{analysis?.overallScore != null && (
<ScoreGauge score={analysis.overallScore} />
)}
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
{analysis?.overallScore != null && (
<ScoreGauge score={analysis.overallScore} />
)}
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
{analysis?.overallScore != null && (
<ScoreGauge score={analysis.overallScore} />
)}
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
{analysis?.overallScore != null && (
<ScoreGauge score={analysis.overallScore} />
)}
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




