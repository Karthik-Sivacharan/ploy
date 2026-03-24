import { clampChroma } from "culori";

// Reference lightness targets from Tailwind v4 analysis
const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const L_TARGETS = [0.978, 0.936, 0.881, 0.827, 0.742, 0.648, 0.573, 0.469, 0.394, 0.320, 0.238];

// Reference chroma ratios (bell curve, normalized to peak=1.0)
const C_RATIOS = [0.073, 0.218, 0.414, 0.617, 0.952, 1.000, 0.884, 0.725, 0.612, 0.493, 0.367];

function generateScale(hue, peakChroma, label) {
  console.log(`  /* ${label} primitives */`);
  for (let i = 0; i < SHADE_STEPS.length; i++) {
    const shade = SHADE_STEPS[i];
    const l = L_TARGETS[i];
    const c = peakChroma * C_RATIOS[i];

    // Gamut map: clamp chroma to stay in sRGB
    const color = clampChroma({ mode: "oklch", l, c, h: hue }, "oklch", "rgb");

    const lStr = color.l.toFixed(3);
    const cStr = color.c.toFixed(3);
    const hStr = hue.toFixed(3);

    console.log(`  --${label}-${shade}: oklch(${lStr} ${cStr} ${hStr});`);
  }
}

// PURPLE: hue 293.009, peak chroma from our --primary (0.281)
console.log("");
generateScale(293.009, 0.281, "purple");

// NEUTRAL: achromatic (chroma = 0, hue = 0)
console.log("");
console.log("  /* Neutral primitives */");
for (let i = 0; i < SHADE_STEPS.length; i++) {
  const shade = SHADE_STEPS[i];
  const l = L_TARGETS[i];
  console.log(`  --neutral-${shade}: oklch(${l.toFixed(3)} 0 0);`);
}

// Cross-reference
console.log("");
console.log("  /* Cross-reference with existing semantic values: */");
console.log("  /* --primary light:  oklch(0.541 0.281 293.009) ~ purple-600 */");
console.log("  /* --primary dark:   oklch(0.606 0.25  292.717) ~ purple-500 */");
console.log("  /* --background:     oklch(1 0 0)     = white                */");
console.log("  /* --foreground:     oklch(0.145 0 0)  ~ darker than neutral-950 */");
