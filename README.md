# Debojyoti Barai Mitul – personal portfolio

Live at **https://debojyoti17.github.io**

A single-page static site: plain HTML, CSS and a little JavaScript. No frameworks, no build step, no tracking, no third-party requests.

```
index.html      the whole site
404.html        page shown for unknown addresses
css/style.css   all styling (colours are at the top)
js/main.js      theme toggle, photo fallback, small scroll animation
assets/         favicon.svg, profile.jpg (you add this), cv.pdf (later)
.nojekyll       tells GitHub Pages to serve files exactly as they are
```

## Preview on your computer

You need Python (already installed on most machines).

1. Open a terminal in this folder.
2. Run `python3 -m http.server 8000` (on Windows: `python -m http.server 8000`).
3. Open http://localhost:8000 in your browser. Press Ctrl+C in the terminal to stop.

Edit a file, save, and refresh the browser to see the change. (Double-clicking `index.html` also works for most things, but the 404 page needs the server.)

## How to edit each part

Open `index.html` in any text editor. Each section is labelled, for example `<section id="about">`.

### Add your profile photo
1. Save your photo as **`assets/profile.jpg`** (exactly that name, lower-case). A portrait photo about 640 × 800 pixels is ideal; keep it under about 300 KB.
2. Commit and push. Until the file exists, the site shows a "DM" initials placeholder automatically.

### Add a project card
In `index.html`, find the `<ul class="cards">` list. Copy one whole `<li> ... </li>` block, paste it after the last one, and change:
- the number in `card-num`,
- the status text inside `<span class="badge">`,
- the title in `<h3>`,
- the description in `<p>`.

### Add a link to an existing card
Each card contains a commented-out `<p class="card-links"> ... </p>` block. To use it:
1. Delete the comment markers around that block (the `<!--` before it and the `-->` after it).
2. Replace the URLs, and delete any link you don't need (for example the paper link if there is only a GitHub repository).

### Change a status badge
Edit the text inside `<span class="badge">...</span>` on that card, e.g. change `Early stage` to `Journal paper in progress`.

### Enable the CV button
1. Save your CV as **`assets/cv.pdf`**.
2. In `index.html`, search for `DOWNLOAD CV BUTTON`. Just below that note is the button inside a comment. Remove the comment markers around it (the `<!--` before and the `-->` after), keeping the `<a ...>Download CV</a>` link.
3. Commit and push.

### Change the accent colour
Open `css/style.css`. At the top, change `--accent` (and `--on-accent`, the text colour used on top of it):
- once in `:root` (light mode),
- once in `@media (prefers-color-scheme: dark)` and once in `:root[data-theme="dark"]` (dark mode; use the same value in both).

Pick a colour with enough contrast against the page background (aim for at least 4.5:1; you can test it at https://webaim.org/resources/contrastchecker/). Also update `fill` in `assets/favicon.svg` if you want the icon to match.

## Publishing with GitHub Pages

This repository is named `Debojyoti17.github.io`, so GitHub Pages serves it at https://debojyoti17.github.io.

1. On GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**, and save.
3. Every time you merge or push changes to `main`, GitHub republishes the site automatically.

Changes usually appear within **1–3 minutes** (occasionally up to 10). If you don't see them, do a hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on Mac). You can watch progress in the **Actions** tab.

Changes made on another branch are not published until they are merged into `main`.
