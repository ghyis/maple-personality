# Maple Personality Test

A MapleStory-themed MBTI quiz. Answer 15 questions about your Maple life and get matched to one of 16 MapleStory classes — each result is a full character card showing stats, traits, and party synergies.

> Made with 🍁 by **@alkaruarts** & **@Yisz**

---

## Live demo

After publishing (see below) your site will be at:

```
https://<your-github-username>.github.io/<your-repo-name>/
```

## Project structure

```
index.html                  # the whole UI (HTML + CSS + glue JS)
MapleQuiz.js                # quiz state machine and scoring
Maplestory Bold.ttf         # MapleStory display font
Maplestory Light.ttf        # MapleStory body font
Music1.mp3 / Music2.mp3     # background music tracks
result_*.png                # 16 finished result cards (one per MBTI type)
Q1.png ... Q15.png          # per-question scene artwork (work in progress)
processing.GIF              # "calculating your MapleCard" screen
ui references/              # design references (not shipped)
.nojekyll                   # tells GitHub Pages to serve files as-is
```

## How it works

- **Home page** — MapleStory NPC dialog with a `BEGIN` quest button.
- **Quiz page** — for each of the 15 questions:
  1. A MapleStory experience-bar style **progress bar** at the top.
  2. A big **question-scene card** in the middle. When the matching `Q*.png` artwork hasn't been added yet, a maple-leaf placeholder is shown with the scene label.
  3. A MapleStory NPC **dialog box** with the question and clickable choices.
- **Processing** — pseudo-question 16 plays a "Calculating your MapleCard..." beat.
- **Results page** — shows your 4-letter MBTI type and the matching `result_*.png` card with a `SHARE` (download) and `RETAKE` button.

### Scoring

`MapleQuiz.js` tracks 8 raw counters (I/E, S/N, T/F, J/P). Each choice contributes `+1` to one axis. After the last question the bigger counter wins each pair and the resulting 4-letter type is mapped to a class:

| MBTI | Class    | MBTI | Class      |
|------|----------|------|------------|
| ISTJ | Ren      | ESTP | Dual Blade |
| ISFJ | Kaiser   | ESFP | Angelic Buster |
| INFJ | Paladin  | ENFP | Lara |
| INTJ | Blaster  | ENTP | Hayato |
| ISTP | Cadena   | ESTJ | Shadower |
| ISFP | Phantom  | ESFJ | Hero |
| INFP | Bishop   | ENFJ | Night Lord |
| INTP | Adele    | ENTJ | Mercedes |

Append `?debug=1` to the URL to show the raw scores on the result page.

## Adding the per-question artwork

When you finish a `Q*.png` scene, just drop it in the project root using the matching name:

```
Q1.png, Q2.png, ..., Q15.png
```

(`processing.GIF` for the calculating screen.)

The image is shown automatically in place of the placeholder; no code changes needed. Until then, every question gracefully falls back to the MapleStory-styled placeholder card.

Suggested dimensions: **4:5 portrait, ~800x1000px**, PNG or JPG, &lt;500 KB each.

## Local preview

You can't just double-click `index.html` because browsers block `fetch` and TTF font loading from `file://`. Run any tiny static server from this folder:

```bash
# Python 3
python -m http.server 8080

# or Node
npx serve .
```

then open <http://localhost:8080>.

## Deploying to GitHub Pages

1. Create a new GitHub repo and push this folder:

   ```bash
   git init
   git add .
   git commit -m "Maple Personality Test v1"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages**
   - **Source:** Deploy from a branch
   - **Branch:** `main`, folder `/ (root)`
   - Save.

3. Wait ~30 seconds, then open `https://<you>.github.io/<repo>/`.

The empty `.nojekyll` file is intentional — it stops GitHub Pages from running Jekyll, which would otherwise hide files/folders that start with `_` and may mangle filenames.

### Notes for GitHub Pages

- **Filenames are case-sensitive on Pages.** Locally Windows treats `Q1.png` and `q1.png` the same — Pages does not. Keep filenames exactly as written here.
- **Filenames with spaces are fine** (the fonts use spaces); they're URL-encoded as `%20` from the CSS.
- The `Maple Personality.zip` and `ui references/` folder are not required at runtime; you can `.gitignore` them if you don't want them shipped.

## Customising

- **Background colors / glow** — edit the `body`, `body::before`, `body::after` rules in `index.html`. The animation is driven by `@keyframes flowA` and `flowB`.
- **Music** — drop in any `Music1.mp3` / `Music2.mp3`; the audio element falls back from the first source to the second.
- **Questions** — edit the `questions` array at the top of `MapleQuiz.js`. Each entry needs `question`, `choices`, and a matching `weights` array.
- **Result mappings** — edit `MBTIImageUrls` near the bottom of `MapleQuiz.js`.

## License

Personal / fan project. MapleStory characters, art, and trademarks belong to Nexon.
