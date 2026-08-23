---
name: DownOrUp.net
description: An AI decision-verdict engine and free website diagnostics suite, sharing one instrument-panel visual language
colors:
  brand-cyan: "#06b6d4"
  brand-blue: "#3b82f6"
  brand-indigo: "#6366f1"
  logo-mark-blue: "#2563eb"
  logo-mark-indigo: "#4f46e5"
  success-500: "#10b981"
  success-600: "#059669"
  success-700: "#047857"
  alert-500: "#f97316"
  alert-600: "#ea580c"
  surface-white: "#ffffff"
  surface-app: "#fcfcfd"
  surface-app-dark: "#0b0f19"
  border-hairline: "#f0f0f0"
  border-hairline-alt: "#e5e7eb"
  text-heading: "#111827"
  text-body: "#1f2937"
  text-muted: "#4b5563"
  text-faint: "#6b7280"
  text-placeholder: "#9ca3af"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 900
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  xxl: "24px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "linear-gradient({colors.logo-mark-blue}, {colors.logo-mark-indigo})"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  verdict-card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.xxl}"
---

# Design System: DownOrUp.net

## Overview

**Creative North Star: "The Verdict Console"**

DownOrUp.net is one instrument panel that renders judgments on two kinds of uncertainty: "should I do this?" and "is this website up?" Both surfaces borrow the same visual grammar — a confident gradient signature, pill-shaped controls, verdict-style badges, and cards that glow with the color of their own conclusion — so a diagnostic result and a life-decision verdict read as the same kind of instrument reading, not two different products bolted together. The system trusts a saturated, energetic gradient (cyan → blue → indigo) as its signature — this is a Persuade/Operate hybrid brand, not a quiet enterprise tool, and it should read as capable and a little electric, not restrained.

Two coding conventions currently coexist in the codebase — `Header.tsx` is written in inline `style={{}}` objects, `Home.tsx` and most pages in Tailwind utility classes — but both express the same token values below. Treat the tokens as canonical regardless of which mechanism a given component happens to use.

**Key Characteristics:**
- A saturated three-stop gradient (cyan→blue→indigo) as the brand's signature mark, used sparingly but boldly — the wordmark, primary CTAs, the logo tile
- Verdict/diagnostic cards use large, soft, colored ambient shadows tinted to the card's own semantic color, not plain gray elevation
- Pill-shaped (fully rounded) primary controls and nav items; large, generous corner radii (up to `rounded-3xl`) on card containers
- Space Grotesk for display/headline weight, Inter for body, JetBrains Mono for data/technical readouts (IPs, formulas, timestamps)

## Colors

A cool, saturated palette built around one signature gradient, with semantic green/orange reserved for verdict and status states.

### Primary
- **Signal Gradient** (cyan #06b6d4 → blue #3b82f6 → indigo #6366f1): The brand's signature mark — wordmark text, hero accents, "electric" moments. Three-stop, always in this order and direction (135deg).
- **Logo Mark Gradient** (blue #2563eb → indigo #4f46e5): A tighter two-stop variant used specifically on the logo tile and primary CTA buttons — brighter, more solid-reading than the three-stop signal gradient.

### Secondary
- **Success Green** (#10b981 / #059669 / #047857): "UP" verdicts, positive/passing diagnostic states.
- **Alert Orange** (#f97316 / #ea580c): Warning-level diagnostic states (not full failure — reserve red/rose for that if introduced later).

### Neutral
- **Surface White** (#ffffff) / **Surface App** (#fcfcfd): Card and page backgrounds respectively — app background is barely off-white.
- **Surface App Dark** (#0b0f19): Dark-mode page background.
- **Hairline** (#f0f0f0 / #e5e7eb): Card and header borders — very light, near-invisible at rest.
- **Text Heading** (#111827) / **Text Body** (#1f2937) / **Text Muted** (#4b5563) / **Text Faint** (#6b7280) / **Text Placeholder** (#9ca3af): A five-step gray ramp from near-black headings down to placeholder text.

### Named Rules
**The Signature Gradient Rule.** The cyan-blue-indigo signal gradient is reserved for the brand mark and genuinely electric moments (hero accents, the wordmark). It is not a general-purpose emphasis tool — most UI text uses the neutral gray ramp or a solid semantic color.

## Typography

**Display Font:** Space Grotesk
**Body Font:** Inter
**Mono Font:** JetBrains Mono

**Character:** A geometric, confident display face paired with a highly legible, neutral body face — built to render a verdict decisively, then explain it clearly. Mono is reserved for genuinely technical readouts: IPs, DNS records, formulas, timestamps.

### Hierarchy
- **Display** (black 900, large scale, Space Grotesk): Hero headline, verdict badges, the wordmark.
- **Title** (bold, Space Grotesk): Section and card headings (`h1`-`h4` all inherit display font-family).
- **Body** (regular, Inter): Standard copy.
- **Mono/Label** (regular-to-bold, JetBrains Mono, often uppercase/tracked): Technical data, keyboard/status labels, small badges.

### Named Rules
**The One Verdict Rule.** Display-weight type at hero scale renders one judgment per view — the verdict badge or headline — never duplicated as competing focal points on the same screen.

## Layout

Sticky top navigation, fixed at 64px height, blurred on desktop, solid on mobile. Content is centered and width-constrained (`max-width: 1280px` on the header; pages generally follow the same constraint). Diagnostic and decision-report cards are generously padded (`p-6 sm:p-8`) and stack vertically in a single column, prioritizing readability of one result at a time over dense multi-column layouts.

## Elevation & Depth

Cards read as glowing instruments, not paper: elevation is a soft, colored ambient shadow tinted to match the card's own semantic accent (e.g. `shadow-xl shadow-indigo-500/5` on a neutral decision card, `shadow-indigo-500/8` on an AI-verdict card), not a plain gray drop shadow. This is a deliberate signature, not incidental — codify it as the system's elevation model.

### Shadow Vocabulary
- **Resting** (`shadow-sm`, plain gray): Small in-card sub-panels and badges — flat, structural, not the "glow" treatment.
- **Header** (`0 1px 3px rgba(0,0,0,0.1)`): The sticky nav bar only.
- **Dropdown** (`0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.08)`): Nav dropdown panels, mobile drawer.
- **Verdict Glow** (`shadow-xl shadow-{accent}-500/5` to `/8`): The signature treatment for primary result/verdict cards — the shadow color always matches the card's own accent (indigo for AI verdicts, green-tinted for "UP" status, etc.).

### Named Rules
**The Glowing Instrument Rule.** A primary result card's shadow color always matches its own semantic accent color. A gray shadow under a verdict card is a miss, not a safe default.

## Shapes

Radius scales with size and role: small controls and badges use 8–12px (`rounded-lg`/`rounded-xl`), primary buttons and active nav pills are fully rounded (`rounded-full`, 999px), and large result/verdict cards use the system's most generous radius, `rounded-3xl` (24px) with `rounded-2xl` (16px) sub-cards nested inside. No sharp corners anywhere.

## Components

### Buttons
- **Shape:** Fully rounded (`rounded-full`/999px) for primary actions and nav items; smaller controls use `rounded-lg`/`rounded-xl`.
- **Primary:** Logo Mark Gradient fill (blue→indigo, 135deg), white bold text, generous horizontal padding (20px+).
- **Nav Active State:** Filled light-blue pill (`#eff6ff` background, `#2563eb` text) rather than a border or underline; a thin 2px indicator bar as a secondary active cue.

### Cards (Verdict / Diagnostic Result)
- **Corner Style:** `rounded-3xl` (24px) outer container, `rounded-2xl` (16px) nested sub-cards/badges.
- **Background:** Surface White, often with `backdrop-blur-sm`.
- **Shadow Strategy:** Verdict Glow (see Elevation & Depth) — colored, ambient, matched to the card's semantic accent.
- **Border:** 1px hairline, occasionally tinted to the accent at low opacity (e.g. `border-indigo-500/20`) on AI-verdict cards specifically.

### Navigation
- Fixed, 64px tall, white at 98% opacity with backdrop blur on desktop (blur disabled on mobile for performance). Dropdown menus render as a floating white card (`rounded-2xl`, dropdown shadow) with a small triangular pointer, icon tiles (32px, `rounded-lg`, light-blue fill) beside each item's name and description.

### Data Readouts
- **Style:** Monospace (JetBrains Mono), typically on a `bg-gray-50`/`border-gray-200` `rounded-2xl` panel — the system's way of marking "this is technical/measured," distinct from prose copy.

## Do's and Don'ts

### Do:
- **Do** reserve the three-stop signal gradient (cyan→blue→indigo) for the brand mark and genuinely electric moments — not general text emphasis.
- **Do** tint a result/verdict card's shadow to match its own semantic accent color (the Glowing Instrument Rule).
- **Do** use JetBrains Mono for genuinely technical/measured data (IPs, DNS records, timestamps), not as a generic "technical" costume.
- **Do** keep primary buttons and active nav items fully rounded (pill-shaped); reserve smaller radii for secondary controls.

### Don't:
- **Don't** apply a plain gray shadow to a primary verdict/result card — it loses the "glowing instrument" signature.
- **Don't** extend the three-stop signal gradient to body text or secondary UI — it's a mark, not a body-copy treatment.
- **Don't** introduce a new accent color outside the established gradient/success/alert set without a confirmed reason.
