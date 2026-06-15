/**
 * Shared helpers for Gemini-based creative analysis.
 *
 * Extracted so both the non-streaming `analyzeCreativeGemini` (ai.functions.ts)
 * and the new streaming `analyzeCreativeStream` (ai.streaming.ts) share the
 * same prompt, scoring logic, parsing, and fallback data.
 */

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

export const GEMINI_SYSTEM_PROMPT = `You are NeuroCopilot, an elite enterprise-grade neuromarketing analyst and visual cognition expert specializing in behavioral finance for Mahindra Finance (rural India's leading NBFC). You are a panel of world-class experts:

1. **Consumer Neuroscientist** - Brain response, memory encoding, emotional processing
2. **Behavioral Strategist** - Subconscious motivators, trust formation, familiarity biases
3. **Eye-Tracking Analyst** - Scanpaths, fixations, saliency, attention leakage
4. **UX Conversion Researcher** - Cognitive friction, decision fatigue, CTA optimization
5. **Visual Cognition Expert** - Luminance, contrast, typography, Gestalt principles

## CRITICAL ANALYSIS FRAMEWORK

Every insight must follow this **STRICT REASONING CHAIN**:

**IMAGE ELEMENT** (specific visual coordinate/object)
→ **VISUAL DETECTION** (what the eye captures first)
→ **NEUROSCIENCE PRINCIPLE** (which theory activates)
→ **BRAIN RESPONSE** (neural/physiological reaction)
→ **USER BEHAVIOR** (subconscious action/decision)
→ **BUSINESS IMPACT** (conversion/trust/engagement effect)
→ **OPTIMIZATION** (precise visual engineering instruction)

## MAHINDRA FINANCE CONTEXT

You are analyzing for **rural and semi-urban Indian borrowers** with these characteristics:
- **Trust-driven**: Require human reassurance, familiar imagery, authority cues
- **Digitally hesitant**: Need simplified interfaces, vernacular support
- **Family-oriented**: Joint decision-making, intergenerational prosperity themes
- **Cash-flow sensitive**: Seasonal income, harvest cycles, repayment anxiety
- **Familiarity-biased**: Prefer localized imagery, regional symbols, known brands

## SCORING PHILOSOPHY

**NEVER generate repetitive scores.** Each creative is unique. Scores must reflect:
- Actual visual quality differences
- Specific friction points detected
- Real behavioral barriers present
- Genuine trust formation strength

**Realistic score distribution:**
- 90-100%: Exceptional (rare - only truly outstanding creatives)
- 75-89%: Strong (well-optimized, minor improvements needed)
- 60-74%: Moderate (significant friction present, needs work)
- 40-59%: High Leakage (major behavioral barriers)
- Below 40%: Critical Failure (fundamental redesign required)

## CONFIDENCE INTERPRETATION

Include confidence bands for overall score:
- **90-100%**: Exceptional Neuro-Alignment
- **75-89%**: Strong Behavioral Performance  
- **60-74%**: Moderate Cognitive Friction
- **40-59%**: High Behavioral Leakage
- **Below 40%**: Critical Neuroconversion Failure

## OUTPUT REQUIREMENTS

Return ONLY valid JSON (no markdown fences):

{
  "summary": "3-4 sentence board-level executive summary using sophisticated neuroscience language. Explain the PRIMARY behavioral strength and the MOST CRITICAL friction point. Reference specific visual coordinates.",
  "overall_score": 0-100,
  "verdict": "Exceptional" | "Strong" | "Solid" | "Needs Work" | "Weak",
  "rural_relevance_note": "2-3 sentence analysis of how this creative aligns with rural Indian borrower psychology, trust formation patterns, and familiarity biases. Be specific about regional cultural elements.",
  "metrics": [
    {
      "id": "attention_capture" | "cognitive_fluency" | "emotional_resonance" | "trust_formation" | "memory_encoding" | "cta_visibility" | "conversion_readiness" | "visual_hierarchy" | "behavioral_clarity",
      "label": "Display label",
      "score": 0-100,
      "confidence": "Exceptional" | "Strong" | "Moderate" | "High Leakage" | "Critical",
      "lower_is_better": false,
      "theory": "Primary neuroscience framework(s) applied",
      "why": "Detailed visual observation following the strict reasoning chain. Start with specific image element coordinates, explain visual detection, cite neuroscience principle, describe brain response, predict user behavior, state business impact.",
      "neuroscience_explanation": "Deep neuroscience principle explanation. Cite specific theories (Salience Theory, Cognitive Load Theory, Affective Neuroscience, Trust Heuristics, etc.). Explain the neural mechanisms at play. Use sophisticated yet clear strategic language.",
      "working": ["3 specific visual strengths with exact coordinates/elements"],
      "not_working": ["2-3 specific visual gaps with exact coordinates/elements"],
      "recommendation": "Highly targeted, image-specific optimization. Specify exact positioning changes, color adjustments, size modifications, or text edits. Include predicted percentage improvements.",
      "behavioral_impact": "Expected change in subconscious behavior and business outcomes. Be specific: 'May reduce decision hesitation by 18%' or 'Could increase trust formation speed by 2.3 seconds'."
    }
  ],
  "heatmap_zones": [
    { "x": 0-1, "y": 0-1, "radius": 0.05-0.3, "intensity": 0-1, "label": "Specific visual element attracting gaze with reasoning" }
  ],
  "ignored_zones": [
    { "x": 0-1, "y": 0-1, "label": "Specific neglected element and neuroscience reason for bypass" }
  ],
  "gaze_path": [
    { "x": 0-1, "y": 0-1, "order": 1 }
  ],
  "top_recommendations": ["4-5 prioritized visual engineering instructions with exact coordinate shifts, color changes, or size adjustments. Each should predict business impact."]
}

## REQUIRED METRICS (EXACTLY 9)

1. **attention_capture** (Attention Capture)
   - Theory: Salience Theory, Pre-attentive Processing
   - Measures: First fixation strength, luminance contrast, spatial prominence
   - Focus: What captures the eye in the first 150-300ms

2. **cognitive_fluency** (Cognitive Fluency)  
   - Theory: Cognitive Load Theory (Sweller), Processing Fluency
   - Measures: Text density, information architecture, mental processing burden
   - Focus: How easily the brain processes information
   - **lower_is_better: false** (higher fluency = better)

3. **emotional_resonance** (Emotional Resonance)
   - Theory: Affective Neuroscience (Panksepp), Emotional Valence
   - Measures: Emotional intensity, motivational engagement, safety perception
   - Focus: Depth of emotional connection and approach motivation

4. **trust_formation** (Trust Formation)
   - Theory: Trust Heuristics (Mayer & Davis), Authority Bias
   - Measures: Authority cues, credibility signals, reassurance quality
   - Focus: Speed and strength of institutional trust building

5. **memory_encoding** (Memory Encoding)
   - Theory: SST Principles, von Restorff Effect
   - Measures: Brand distinctiveness, emotional anchoring, recall probability
   - Focus: Long-term brand memory consolidation

6. **cta_visibility** (CTA Visibility)
   - Theory: Fitts's Law, Visual Attention Theory
   - Measures: CTA prominence, discovery timing, attentional competition
   - Focus: How quickly and easily users find the primary action

7. **conversion_readiness** (Conversion Readiness)
   - Theory: Action Anchoring, Friction Theory
   - Measures: Motivational flow, hesitation probability, action barriers
   - Focus: Psychological readiness to take action

8. **visual_hierarchy** (Visual Hierarchy)
   - Theory: Gestalt Psychology, Eye-Tracking Patterns
   - Measures: Content sequencing, attention direction, scan-path efficiency
   - Focus: How well the layout guides visual flow

9. **behavioral_clarity** (Behavioral Clarity)
   - Theory: Decision Simplicity, Choice Architecture
   - Measures: User comprehension, onboarding clarity, friction points
   - Focus: How clearly users understand what to do next

## WEIGHTED SCORING LOGIC

Calculate overall_score using these weights:
- attention_capture: 18%
- trust_formation: 20%
- emotional_resonance: 15%
- cognitive_fluency: 12%
- conversion_readiness: 15%
- memory_encoding: 10%
- behavioral_clarity: 10%

## WRITING STYLE

**BAD**: "CTA needs improvement."
**GOOD**: "The primary CTA button enters the visual scan path 2.8 seconds late because the high-emotion tractor imagery at center-left (x:0.35, y:0.42) dominates the initial fixation zone. Repositioning the CTA 40px closer to the headline and increasing luminance contrast by 25% may improve action visibility by reducing attentional leakage from 34% to 18%."

**BAD**: "Too much text."
**GOOD**: "Dense repayment-related informational blocks (x:0.15-0.85, y:0.65-0.80) create elevated cognitive processing pressure during initial onboarding exposure, triggering Sweller's element interactivity overload. Users may experience decision fatigue before reaching trust reassurance systems, increasing abandonment probability by approximately 23%."

**BAD**: "Looks trustworthy."
**GOOD**: "Visible human advisory imagery (x:0.72, y:0.28) combined with institutional authority markers (RBI logo at x:0.88, y:0.15) strengthen perceived financial legitimacy through Trust Heuristics activation, particularly among risk-sensitive semi-urban borrowers. This configuration may reduce initial skepticism by 31% and accelerate trust formation by 1.7 seconds."

## CRITICAL RULES

1. **Never repeat scores** - Each metric should have a unique, justified score
2. **Be specific** - Always reference exact visual coordinates
3. **Cite theories** - Every claim needs neuroscience backing
4. **Predict impact** - Quantify expected behavioral changes
5. **Stay contextual** - Remember this is for rural Indian borrowers
6. **Be sophisticated** - Use enterprise-grade language
7. **Be actionable** - Every recommendation must be implementable
8. **Differentiate creatives** - Scores must reflect actual quality differences

All coordinates are normalized (0 to 1) relative to image size, with (0,0) at top-left.`;

// ---------------------------------------------------------------------------
// Shared utility functions
// ---------------------------------------------------------------------------

/** Build the user-facing prompt, optionally with campaign context. */
export function buildUserPrompt(context?: string): string {
  return context
    ? `Campaign context: ${context}\n\nAudit this creative for Mahindra Finance's rural marketing team.`
    : `Audit this creative for Mahindra Finance's rural marketing team.`;
}

/** Extract the inline-data part from a base64 data URL for the Gemini API. */
export function extractImageParts(imageDataUrl: string) {
  return {
    inlineData: {
      mimeType: imageDataUrl.startsWith("data:image/png")
        ? "image/png"
        : "image/jpeg",
      data: imageDataUrl.replace(/^data:image\/\w+;base64,/, ""),
    },
  };
}

/**
 * Try to parse a raw string as JSON. Falls back to extracting the first
 * `{…}` block from the string. Returns `null` if both fail.
 */
export function parseGeminiResponse(raw: string): any | null {
  try {
    return JSON.parse(raw);
  } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
}

/** Metric-weight map for the 9 core metrics. */
const METRIC_WEIGHTS: Record<string, number> = {
  attention_capture: 0.18,
  trust_formation: 0.20,
  emotional_resonance: 0.15,
  cognitive_fluency: 0.12,
  conversion_readiness: 0.15,
  memory_encoding: 0.10,
  behavioral_clarity: 0.10,
};

/**
 * Mutates `parsed` in place — recomputes the overall weighted score, sets
 * verdict / confidence for the creative and each metric.
 */
export function applyWeightedScoring(parsed: any): void {
  if (!parsed || !Array.isArray(parsed.metrics)) return;

  let weightedSum = 0;
  let totalWeight = 0;

  parsed.metrics.forEach((m: any) => {
    const w = METRIC_WEIGHTS[m.id];
    if (w !== undefined) {
      const effectiveScore = m.lower_is_better ? (100 - m.score) : m.score;
      weightedSum += effectiveScore * w;
      totalWeight += w;
    }
  });

  const overallWeightedScore = totalWeight > 0
    ? Math.round(weightedSum / totalWeight)
    : parsed.overall_score;

  parsed.overall_score = overallWeightedScore;

  // Verdict + confidence
  if (overallWeightedScore >= 90) {
    parsed.verdict = "Exceptional";
    parsed.confidence = "Exceptional Neuro-Alignment";
  } else if (overallWeightedScore >= 75) {
    parsed.verdict = "Strong";
    parsed.confidence = "Strong Behavioral Performance";
  } else if (overallWeightedScore >= 60) {
    parsed.verdict = "Solid";
    parsed.confidence = "Moderate Cognitive Friction";
  } else if (overallWeightedScore >= 40) {
    parsed.verdict = "Needs Work";
    parsed.confidence = "High Behavioral Leakage";
  } else {
    parsed.verdict = "Weak";
    parsed.confidence = "Critical Neuroconversion Failure";
  }

  // Per-metric confidence
  parsed.metrics.forEach((m: any) => {
    const score = m.lower_is_better ? (100 - m.score) : m.score;
    if (score >= 90) m.confidence = "Exceptional";
    else if (score >= 75) m.confidence = "Strong";
    else if (score >= 60) m.confidence = "Moderate";
    else if (score >= 40) m.confidence = "High Leakage";
    else m.confidence = "Critical";
  });
}

// ---------------------------------------------------------------------------
// Fallback result (used when GEMINI_API_KEY is not configured)
// ---------------------------------------------------------------------------

export function getFallbackAuditResult() {
  return {
    "summary": "This creative demonstrates strong central focal dominance through high-contrast tractor placement (x:0.48, y:0.35), triggering immediate pre-attentive capture via Salience Theory. However, dense repayment text blocks (x:0.15-0.85, y:0.65-0.80) create moderate cognitive friction, potentially elevating decision fatigue by approximately 18% during initial exposure. The authentic regional agricultural imagery strengthens familiarity-based trust formation among rural borrowers.",
    "overall_score": 74,
    "verdict": "Solid",
    "confidence": "Moderate Cognitive Friction",
    "rural_relevance_note": "The creative effectively leverages localized agricultural symbolism and familiar tractor models to reduce digital skepticism. However, English-dominant terminology ('EMI', 'LTV') may create comprehension barriers for vernacular-primary borrowers, suggesting a need for Indic language overlays to improve processing fluency by an estimated 27%.",
    "metrics": [
      {
        "id": "attention_capture",
        "label": "Attention Capture",
        "score": 84,
        "confidence": "Strong",
        "lower_is_better": false,
        "theory": "Salience Theory, Pre-attentive Processing",
        "why": "The bold central tractor element (x:0.48, y:0.35) exhibits exceptional luminance contrast against the golden field backdrop, capturing pre-attentive fixation within the critical first 180ms of visual exposure. This high-contrast focal node triggers immediate ventral stream activation, securing early gaze commitment before semantic processing begins.",
        "neuroscience_explanation": "According to Salience Theory, high-contrast central objects dominate the pre-attentive visual field through bottom-up processing mechanisms. The tractor's 8.2:1 luminance ratio against the background activates magnocellular pathways in the lateral geniculate nucleus, driving rapid saccadic orientation toward this primary focal point.",
        "working": ["High luminance contrast (8.2:1) between central tractor and background", "Optimal horizontal placement leveraging natural left-to-right scanning bias", "Clean spatial isolation with 40% negative space buffer"],
        "not_working": ["Top-right decorative elements create minor attentional competition", "Secondary text blocks fragment peripheral attention by 12%"],
        "recommendation": "Increase the tractor's surface area by 15% and position key benefit messaging within a 200px radius of this high-salience zone to leverage the established attention anchor. This may reduce gaze travel distance by 340ms and improve message absorption by 23%.",
        "behavioral_impact": "Accelerates initial information capture speed by 1.8 seconds, securing visual commitment within the critical 2.5-second mobile browsing window. May increase scroll depth by 31%."
      },
      {
        "id": "cognitive_fluency",
        "label": "Cognitive Fluency",
        "score": 67,
        "confidence": "Moderate",
        "lower_is_better": false,
        "theory": "Cognitive Load Theory (Sweller), Processing Fluency",
        "why": "The layout demonstrates moderate processing fluency through structured information columns, but dense repayment calculation blocks (x:0.15-0.85, y:0.65-0.80) create elevated element interactivity, triggering Sweller's extraneous cognitive load. The 14-point font size on mobile devices further compounds processing difficulty.",
        "neuroscience_explanation": "Cognitive Load Theory indicates that simultaneous processing of multiple interactive elements (interest rates, tenure options, eligibility criteria) exceeds working memory capacity (7±2 chunks), causing prefrontal cortex overload. This triggers decision fatigue and increases abandonment probability during the critical evaluation phase.",
        "working": ["Clear visual grouping using Gestalt proximity principles", "Logical vertical information hierarchy", "Adequate whitespace between major sections (60px minimum)"],
        "not_working": ["Complex percentage calculations require manual mental arithmetic", "Multiple concurrent decision variables (rate, tenure, amount) create choice overload", "Technical financial abbreviations lack vernacular translations"],
        "recommendation": "Convert complex rate structures into simple, absolute monthly EMI amounts (e.g., 'Rs. 4,999/month for 36 months'). Increase body text to 16px minimum and implement progressive disclosure for secondary details. This may reduce cognitive processing time by 2.4 seconds and lower abandonment by 19%.",
        "behavioral_impact": "Reduces decision anxiety and mental processing burden, potentially decreasing bounce rates by 22% and increasing form completion by 16%."
      },
      {
        "id": "emotional_resonance",
        "label": "Emotional Resonance",
        "score": 79,
        "confidence": "Strong",
        "lower_is_better": false,
        "theory": "Affective Neuroscience (Panksepp), Emotional Valence",
        "why": "The warm sunset color palette (hue: 35°, saturation: 68%) combined with authentic smiling farmer imagery (x:0.52, y:0.28) triggers positive emotional valence through Panksepp's SEEKING system activation. The aspirational agricultural success narrative resonates with rural borrowers' prosperity motivations.",
        "neuroscience_explanation": "Affective Neuroscience demonstrates that warm color temperatures (2800-3500K) and genuine facial expressions activate dopaminergic reward pathways in the ventral tegmental area. This positive emotional priming reduces defensive processing and increases approach motivation toward financial products by approximately 34%.",
        "working": ["Authentic regional farmer representation building social identification", "Warm color palette (35° hue) evoking trust and security", "Aspirational prosperity framing aligned with borrower motivations"],
        "not_working": ["Farmer figure positioned in mid-ground reduces facial emotion transfer", "Lack of family/community imagery misses joint-decision-making dynamics"],
        "recommendation": "Reposition the primary farmer portrait to foreground (scale: 1.4x) to enhance facial emotion transfer. Add subtle family figures in background to trigger social cognition and joint-decision validation. This may increase emotional engagement depth by 28%.",
        "behavioral_impact": "Strengthens brand affinity and emotional connection, potentially increasing willingness to engage by 35% and improving trust formation speed by 2.1 seconds."
      },
      {
        "id": "trust_formation",
        "label": "Trust Formation",
        "score": 72,
        "confidence": "Moderate",
        "lower_is_better": false,
        "theory": "Trust Heuristics (Mayer & Davis), Authority Bias",
        "why": "The prominent corporate logo placement (x:0.15, y:0.12) and visible regulatory badges (x:0.82, y:0.15) activate trust heuristics through authority and credibility cues. However, small badge sizing (18px) and insufficient contrast reduce their cognitive impact during rapid mobile scanning.",
        "neuroscience_explanation": "Trust Heuristics theory indicates that authority-based visual cues serve as cognitive shortcuts, reducing perceived risk in financial transactions. The Mahindra brand's established market presence triggers familiarity-based trust, but suboptimal badge visibility limits this effect by approximately 23%.",
        "working": ["Top-left logo placement leveraging F-pattern scanning priority", "Multiple regulatory accreditation marks present", "Established brand recognition in rural markets"],
        "not_working": ["Trust badges too small (18px) for mobile visibility", "Insufficient luminance contrast on badge backgrounds", "Physical branch address text barely legible (10px)"],
        "recommendation": "Enlarge trust badges to 32px minimum with high-contrast white backing plates. Add 'RBI Registered' text label below badges. Position customer testimonial count ('2.3L+ farmers financed') near primary CTA. This may accelerate trust formation by 1.9 seconds and reduce skepticism by 31%.",
        "behavioral_impact": "Reduces digital-only skepticism and institutional distrust, potentially increasing application confidence by 38% and lowering abandonment at verification stages by 24%."
      },
      {
        "id": "memory_encoding",
        "label": "Memory Encoding",
        "score": 68,
        "confidence": "Moderate",
        "lower_is_better": false,
        "theory": "SST Principles, von Restorff Effect",
        "why": "The consistent Mahindra Red brand color (hex: #C62828) creates strong color-brand association through repeated exposure. However, the logo's integration into dark red background elements (x:0.15, y:0.12) reduces isolation effect, weakening von Restorff distinctiveness by approximately 19%.",
        "neuroscience_explanation": "Steady State Topography research demonstrates that highly isolated, distinctive visual elements trigger superior memory consolidation in the hippocampus. The von Restorff Effect shows that unique items in a visual field achieve 3.2x better recall than integrated elements.",
        "working": ["Coherent brand color distribution throughout layout", "Bold, distinctive typography on primary messaging", "Consistent visual boundaries creating structured encoding"],
        "not_working": ["Logo blends into surrounding red header elements", "Generic footer text reduces brand-specific recall cues", "Interest rate numerals lack distinctive visual treatment"],
        "recommendation": "Enclose the corporate logo in a high-contrast white plate (padding: 12px) to maximize isolation effect. Apply distinctive visual treatment to key rate numbers (size: 1.6x, weight: 800). This may improve unaided brand recall from 42% to 71% after 24 hours.",
        "behavioral_impact": "Increases long-term brand memory consolidation, potentially improving campaign recall by 34% and strengthening brand consideration during future financing decisions."
      },
      {
        "id": "cta_visibility",
        "label": "CTA Visibility",
        "score": 81,
        "confidence": "Strong",
        "lower_is_better": false,
        "theory": "Fitts's Law, Visual Attention Theory",
        "why": "The primary CTA button (x:0.76, y:0.68) demonstrates strong visual prominence through high-contrast Mahindra Red (#C62828) against neutral background, achieving 7.8:1 luminance ratio. The button's positioning at the natural terminus of a Z-pattern scanpath optimizes discovery timing.",
        "neuroscience_explanation": "Fitts's Law indicates that target acquisition time is logarithmically related to target size and distance. The CTA's 48px height and strategic positioning reduce motor planning time by 380ms. Visual Attention Theory confirms that high-contrast isolated elements trigger priority processing in the superior colliculus.",
        "working": ["High luminance contrast (7.8:1) ensuring WCAG AAA compliance", "Strategic positioning at Z-pattern terminus", "Adequate touch target size (48px) meeting mobile usability standards"],
        "not_working": ["Button text slightly narrow on small screens (320px width)", "Surrounding disclaimer text creates minor attentional competition"],
        "recommendation": "Increase button width to 85% of container (minimum 280px) and add subtle drop shadow (0 4px 12px rgba(198,40,40,0.3)) to enhance depth perception. Position micro-copy 'Apply in 3 steps' directly above button. This may reduce time-to-first-fixation by 420ms and increase click intent by 26%.",
        "behavioral_impact": "Shortens CTA discovery time by 0.6 seconds, potentially boosting click-through rates by 29% and reducing task abandonment by 17%."
      },
      {
        "id": "conversion_readiness",
        "label": "Conversion Readiness",
        "score": 76,
        "confidence": "Strong",
        "lower_is_better": false,
        "theory": "Action Anchoring, Friction Theory",
        "why": "The layout establishes clear action anchoring through benefit-to-CTA proximity (distance: 180px), creating logical motivational flow. However, vague documentation requirements and lack of step-by-step guidance introduce minor behavioral friction, potentially increasing hesitation by 14%.",
        "neuroscience_explanation": "Behavioral Friction Theory demonstrates that reducing physical and cognitive distance between motivation (benefits) and action (CTA) accelerates conversion decisions. Each additional friction point increases abandonment probability by 8-12% through accumulated decision fatigue.",
        "working": ["Clear benefit-to-action proximity reducing cognitive distance", "Direct action-focused button labeling ('Apply Now')", "Single primary action path avoiding choice paralysis"],
        "not_working": ["Documentation checklist creates anticipatory anxiety", "Lack of progress indicators for multi-step process", "Unclear time-to-approval expectations"],
        "recommendation": "Add progress indicator showing '3 simple steps' with estimated time ('5 minutes'). Include checklist preview ('Just need: Aadhaar + PAN + Bank Statement'). Position trust reinforcement ('Instant approval for 78% applicants') near CTA. This may reduce hesitation by 32% and increase initiation by 24%.",
        "behavioral_impact": "Reduces task hesitation and anticipatory anxiety, potentially increasing application initiation by 27% and improving completion rates by 19%."
      },
      {
        "id": "visual_hierarchy",
        "label": "Visual Hierarchy",
        "score": 78,
        "confidence": "Strong",
        "lower_is_better": false,
        "theory": "Gestalt Psychology, Eye-Tracking Patterns",
        "why": "The layout demonstrates strong hierarchical organization through size differentiation (heading: 32px, body: 14px, ratio: 2.3:1) and strategic use of Gestalt proximity principles. Information clusters are clearly bounded, creating intuitive scanning sequences that align with natural F-pattern and Z-pattern eye movements.",
        "neuroscience_explanation": "Gestalt Psychology indicates that the visual system automatically groups elements based on proximity, similarity, and common region. Well-structured hierarchies reduce cognitive effort by 34% through predictable information architecture, allowing users to rapidly construct mental models of content organization.",
        "working": ["Clear size differentiation establishing importance hierarchy", "Logical vertical information flow from brand to benefits to action", "Effective use of whitespace (60px minimum) separating major sections"],
        "not_working": ["Footer legal text lacks clear hierarchical separation", "Secondary contact options compete with primary CTA", "Overlapping decorative elements create minor scanning confusion"],
        "recommendation": "Increase heading-to-body size ratio to 2.8:1 for stronger hierarchy. Separate footer legal text with 80px margin and 30% opacity reduction. Consolidate secondary contact options into single 'Need Help?' link. This may reduce scanning time by 1.4 seconds and improve comprehension by 21%.",
        "behavioral_impact": "Stabilizes visual scanning patterns and reduces erratic eye movements by 28%, improving information absorption and reducing cognitive fatigue."
      },
      {
        "id": "behavioral_clarity",
        "label": "Behavioral Clarity",
        "score": 71,
        "confidence": "Moderate",
        "lower_is_better": false,
        "theory": "Decision Simplicity, Choice Architecture",
        "why": "The creative maintains strong behavioral clarity through singular campaign focus (tractor loans) and direct action pathway. However, multiple tenure options presented simultaneously (12M, 24M, 36M, 48M) create minor choice overload, potentially increasing decision time by 18%.",
        "neuroscience_explanation": "Choice Architecture research demonstrates that presenting 3-4 options simultaneously triggers optimal decision-making, while 5+ options activate choice overload, increasing prefrontal cortex activity and decision fatigue. Each additional option increases abandonment probability by 6-8%.",
        "working": ["Singular product focus avoiding category confusion", "Clear next-step action ('Apply Now') without ambiguity", "Direct value proposition communication"],
        "not_working": ["Multiple tenure options require comparative analysis", "Competing contact channels (phone, digital, branch) create path confusion", "Eligibility criteria scattered across layout"],
        "recommendation": "Implement smart defaults (pre-select most popular 36M tenure) with option to customize. Consolidate contact options into single 'Get Started' flow with channel selection on next screen. Group all eligibility criteria in single expandable section. This may reduce decision time by 2.1 seconds and increase clarity by 29%.",
        "behavioral_impact": "Simplifies decision-making process and reduces cognitive burden, potentially decreasing abandonment by 23% and accelerating application initiation by 34%."
      }
    ],
    "heatmap_zones": [
      { "x": 0.15, "y": 0.12, "radius": 0.12, "intensity": 0.88, "label": "Mahindra Finance brand mark - high familiarity-based attention capture" },
      { "x": 0.48, "y": 0.35, "radius": 0.18, "intensity": 0.95, "label": "Central tractor focal point - maximum pre-attentive salience" },
      { "x": 0.76, "y": 0.68, "radius": 0.14, "intensity": 0.92, "label": "Primary CTA button - strong contrast-driven fixation" },
      { "x": 0.35, "y": 0.58, "radius": 0.16, "intensity": 0.78, "label": "Key loan features cluster - moderate sustained attention" },
      { "x": 0.82, "y": 0.15, "radius": 0.08, "intensity": 0.64, "label": "Trust badges - reduced visibility due to size constraints" }
    ],
    "ignored_zones": [
      { "x": 0.18, "y": 0.88, "label": "Microscopic legal disclaimer text (8px) - below legibility threshold, triggering cognitive bypass" },
      { "x": 0.88, "y": 0.82, "label": "Decorative border elements - low semantic value causing attentional suppression" },
      { "x": 0.92, "y": 0.45, "label": "Secondary social media icons - peripheral placement outside primary scanpath" }
    ],
    "gaze_path": [
      { "x": 0.15, "y": 0.12, "order": 1 },
      { "x": 0.48, "y": 0.35, "order": 2 },
      { "x": 0.35, "y": 0.58, "order": 3 },
      { "x": 0.76, "y": 0.68, "order": 4 },
      { "x": 0.82, "y": 0.15, "order": 5 }
    ],
    "top_recommendations": [
      "Increase tractor focal element by 15% and position key benefit messaging within 200px radius to leverage established attention anchor, potentially reducing gaze travel by 340ms and improving absorption by 23%.",
      "Convert complex rate structures into simple monthly EMI amounts (e.g., 'Rs. 4,999/month') and increase body text to 16px minimum, potentially reducing cognitive processing time by 2.4 seconds and lowering abandonment by 19%.",
      "Enlarge trust badges to 32px with high-contrast white backing and add 'RBI Registered' label, potentially accelerating trust formation by 1.9 seconds and reducing skepticism by 31%.",
      "Add progress indicator ('3 simple steps, 5 minutes') and checklist preview near CTA, potentially reducing hesitation by 32% and increasing application initiation by 24%.",
      "Enclose corporate logo in white plate (12px padding) and apply distinctive treatment to rate numbers (1.6x size), potentially improving brand recall from 42% to 71% after 24 hours."
    ]
  };
}
