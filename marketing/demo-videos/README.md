# Ratiō demo videos

Two natural, UGC-style demo videos of the Ratiō app in use, generated on Higgsfield
(2026-08-21). Both are vertical 9:16, sized for TikTok / Reels / Shorts.

## The videos

**Video 1 — POV: logging chicken fried rice (8s, 1440×2560, with audio)**
First-person shot: a hand holds an iPhone showing the real Ratiō Meal Analysis
screen (650 cal · 40g P / 70g C / 20g F · Medium Confidence) above a glass
meal-prep container of chicken fried rice on a granite counter. A fork reaches
in for a bite near the end.

https://d8j0ntlcm91z4.cloudfront.net/user_3GhvJ1fNuHD75nzEcE0WD99Cjcl/hf_20260821_024453_ce49edba-a2ac-4e4c-9c01-b7bf6c0dfda3.mp4

**Video 2 — Kitchen table: snap → analysis (10s, 1440×2560)**
A woman at a kitchen table opens Ratiō (real Home screen — logo, week strip,
0/3150 cal, macro rings), tilts the phone down to photograph her salmon-quinoa
bowl, then turns the phone back showing the Meal Analysis result
(580 cal · 42g P / 40g C / 27g F · High Confidence).

https://d8j0ntlcm91z4.cloudfront.net/user_3GhvJ1fNuHD75nzEcE0WD99Cjcl/hf_20260821_025051_53f81f20-5734-4efb-9128-524fcd89ae0b.mp4

Both videos are also saved in the Higgsfield account library (app.higgsfield.ai).

## How the app UI was kept real

The phone screens in the videos are pixel-faithful recreations of the actual
app screenshots (Home and Meal Analysis), rebuilt in HTML/CSS with the site's
brand tokens (cream #f6f3ea, deep green #2f4b3c, Fraunces + Inter) and rendered
at iPhone resolution (1179×2556 @3x) with headless Chromium. Those PNGs were
then composited onto photoreal keyframes with Nano Banana Pro (reference-locked
so the layout, numbers and text stay exact) and animated with MiniMax H3 using
start/end keyframes.

Sources for the recreated screens are in `app-screens/`:

- `home.html` — Home dashboard (0/3150 cal, macro rings, streak, water)
- `analysis.template.html` — Meal Analysis screen (templated per meal)
- `app.css` — shared styles matching the app's design
- `shoot.js` — Playwright script that renders the screens to PNG

To re-render: put a `food-friedrice.jpg` / `food-salmon.jpg` in
`app-screens/assets/` and run `node shoot.js` (needs Playwright + Chromium).
