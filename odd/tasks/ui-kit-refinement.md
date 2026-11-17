# UI kit refinement — surgical upgrade of the Astro portfolio

Branch: `ui/kit-improvement`. Delivery: work-unit commits; test runner: `npm run build` + generated HTML inspection (no test framework in repo). Work unit: `5e64f2b` (feat(ui): integrate astro-component-kit and harden accessibility), 396 authored changed lines; docs recorded in follow-up commit. Native assessment over the committed slice (`22db186..HEAD`): tier `medium`, `review_due=false`, reason `under_budget` (configuration change in `package-lock.json`); no native review started.

## Specs

S1. Use `astro-component-kit` (https://astrocomponents.dev/) for key UI points (buttons, cards/badges, nav) while preserving the existing green palette and layout. User request: "me gustari que utilizar un kit de componentes como astro kit components"; clarification: "https://astrocomponents.dev/ este el que te decia"; scope: "Mejora quirúrgica (Recommended)". Acceptance: components imported from the installed package with category imports; kit design tokens mapped to the project's `--accent`/`--bg`; no kit global reset imported; build succeeds.

S2. Fix the Project tabs with `modern-web-guidance` so they are accessible by keyboard and screen reader. Guide rules applied: `role="tablist"` with `aria-labelledby`, `role="tab"` with `aria-selected` and roving `tabindex`, `role="tabpanel"` with `aria-labelledby`, initial state rendered in HTML, selected indicator by shape (not color alone), no dimensions changed on selected tab, `hidden` on inactive panels, arrow-key/Home/End navigation. `focusgroup` was intentionally replaced by the standard JS pattern (see L6). User request: "utiliza @modern-web-guidance para mejorar como funciona la ui". Acceptance: `dist/index.html` contains `role="tablist"`, `aria-selected="true"` on the initial tab, `hidden` on the inactive panel; arrow keys switch tabs.

S3. Respect `prefers-reduced-motion` and never hide content when JS fails. `modern-web-guidance` motion guide: opt in to motion with `@media (prefers-reduced-motion: no-preference)` and keep the final visible state. Acceptance: `.fade-up` and `.skill-tag` are visible by default; animations only declared under `no-preference`.

S4. Clean dead/duplicate code and stale project metadata. User request: "limpia el proyecto de codigo limpio y tambien de cosas inecesarias o que ya no se utilizan". Acceptance: no duplicate `.skill-tag`/`.project-card` blocks in `global.css`; unused rules removed; README replaced with project-specific documentation; `57TU_NUMERO` placeholder in `Contact.astro` consolidated into one constant and documented; brand name consistent across header/footer.

## Tasks

- T1 — S1 — inline — kit integration + token mapping — done — build + computed-style check
- T2 — S2 — inline — accessible tabs — done — Playwright click + arrow-key + focus checks
- T3 — S3 — inline — reduced motion — done — Playwright reduced-motion context checks
- T4 — S4 — inline — cleanup + README — done — `git diff` / built-CSS dead-rule check

## Log

L1 (user request, verbatim): "quiesisera hacer una mejora de ui al proyecto y me gustari que utilizar un kit de componentes como astro kit components y utiliza @modern-web-guidance para mejorar como funciona la ui y limpia el proyecto de codigo limpio y tambien de cosas inecesarias o que ya no se utilizan"
L2 (user answer, verbatim): "https://astrocomponents.dev/ este el que te decia"
L3 (user answer, verbatim): "Mejora quirúrgica (Recommended)"
L4: Verified `astro-component-kit@0.7.1` exists, peer astro >=5 / node >=22.12, compatible. Kit `global.css` has global reset + external Google Fonts + `.container` 1400px, so it is NOT imported; tokens are aliased in the project's own `:root` instead.
L5: `modern-web-guidance` guides `tabs` and `motion` retrieved. Tab guide: initial HTML state mandatory, shape indicator not color alone, `focusgroup` needs `@microsoft/focusgroup-polyfill` fallback in Firefox/Safari. Motion guide: opt-in animation under `no-preference`, keep final state.

L6 (accepted change): inspection of `astro-component-kit@0.7.1` showed literal indigo values (not tokens) in `MinimalLinkCard` and the `secondary` button shadow. `MinimalLinkCard` was dropped; kit usage is `MinimalPillButton` (hero CTAs, social links) and `Badge` (`badge--default`, neutral). Two documented high-specificity rules remap the remaining literal indigo shadow to `--accent-soft`. `focusgroup="tablist"` was also dropped in favor of the standard roving-`tabindex` + arrow-key pattern: it needs a polyfill in Firefox/Safari and can double-handle keys, so explicit JS is cleaner and universally supported.

L7 (verification): `npm run build` passes. `dist/index.html` contains `role="tablist"`, `aria-selected="true"` on the initial tab, and `hidden` on the inactive panel. Playwright (headless Chromium) verified: initial state, click switching, ArrowRight wrap to the first tab with focus, `hidden` toggling, zero page errors; computed CTA background `oklch(0.75 0.18 145)` (project green) and badge color `oklch(0.55 0.012 250)` (muted). A `reduced_motion="reduce"` context reported `.fade-up`/`.skill-tag` opacity `1` and no eyebrow animation. Built CSS contains both motion media queries and no dead-rule selectors from S4. Screenshots were written to `/tmp/opencode/portfolio-after.png` and `/tmp/opencode/portfolio-reduced.png`; visual inspection was unavailable in this model, so theming was verified through computed styles instead.
