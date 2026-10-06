# Your AI UGC Agency Website

Everything is already built. You only need to do three things:

1. Add your 5 ads
2. Add your email, Instagram and X
3. Put the website online

**You only ever edit ONE file: `content.js`.**
Don't change any other file.

---

## What's in this folder

```
index.html     ← the page (don't edit)
style.css      ← the design (don't edit)
script.js      ← makes it work (don't edit)
content.js     ← ✏️ YOUR TEXT, LINKS AND ADS. Edit this one.
assets/        ← ✏️ PUT YOUR 5 AD VIDEOS HERE
fonts/         ← the fonts (don't touch)
favicon.png    ← the small icon in the browser tab
og-image.jpg   ← the preview picture when someone shares your link
```

## How to open content.js

* **Windows:** right-click `content.js` → Open with → **Notepad**
* **Mac:** right-click `content.js` → Open With → **TextEdit**
  (In TextEdit, first go to Format → **Make Plain Text**.)
* Better (optional, free): install **VS Code** from code.visualstudio.com and open the file with it.

Change only the text **inside the quotation marks**, then save (Ctrl+S / Cmd+S).
Keep the `"quotes"` and the `,` comma at the end of each line.

---

## 1. Add your 5 videos

**Put your five videos inside the `assets` folder and name them:**

```
work1.mp4   ← your BEST ad (it is shown big)
work2.mp4
work3.mp4
work4.mp4
work5.mp4
```

That's it — the website picks them up automatically.

If your files have different names, open `content.js`, find the `projects` part and change the filenames here:

```js
media: "assets/work1.mp4",
```

**Images work too.** For example, if ad 3 is an image, put `work3.jpg` in the assets folder and change its line to:

```js
media: "assets/work3.jpg",
```

Good to know:

* Until a file exists, a stylish numbered placeholder is shown — nothing breaks.
* Videos play silently as people scroll. When someone taps an ad, it opens big **with sound and controls**.
* Use normal **.mp4** files (what CapCut, Premiere, etc. export by default). Vertical 9:16 looks best.
* **Make your videos small:** aim for under ~10 MB each so the site loads fast on phones.
  A free way: the app **HandBrake** → preset "Social 25 MB 2 Minutes 1080p" or "Fast 720p30".
* The first 3 videos also appear inside the phone mockups at the top of the page.

## 2. Change project names, categories and descriptions

In `content.js`, under `projects`, each ad looks like this:

```js
{
  title: "Skincare Brand",
  category: "AI UGC Product Ad",
  description: "A creator-style routine ad built around one strong hook.",
  media: "assets/work1.mp4",
},
```

* `title` → the client or project name
* `category` → the type of ad
* `description` → one short sentence

The first one in the list is the big featured ad.

## 3. Add your email

In `content.js`, at the top:

```js
email: "hello@youragency.com",
```

It becomes a clickable email link automatically. (While empty, it shows "Coming soon".)

## 4. Add your Instagram

```js
instagram: "https://instagram.com/youragency",
```

You can also just write `"@youragency"` — both work.

## 5. Add your X (Twitter)

```js
x: "https://x.com/youragency",
```

(or `"@youragency"`)

## 6. Change the agency name

```js
name: "Reeliable",
```

"Reeliable" is the agency name. Changing it updates the footer and the browser tab. The menu uses the supplied wordmark in `assets/reeliable-wordmark.png`; the footer symbol and touch icon use `assets/reeliable-symbol.png`.

> For Google, link previews, and accessible logo text, also update the name in the `<title>`, `og:title`, and navigation logo in `index.html`.

## 7. Change the big headline and the text below it

In `content.js`, under `heroContent`:

```js
headline: "Your next best ad doesn't need a *film set.*",
subtitle: "We make scroll-stopping, creator-style ads with AI — ...",
```

Tip: words wrapped in `*stars*` turn italic and orange.

Phone number is also in `content.js` (`phone: "8010534138"`). It's already clickable (calls on mobile).

---

## 8. The "Book a Strategy Call" form — how you receive requests

You don't need a backend. It works like this:

**Easy way (automatic):** as soon as you add your email in `content.js` and the site is online, form requests are emailed to you via a free service called FormSubmit.
👉 The **first** time someone submits (do a test yourself!), FormSubmit sends you an email with an **"Activate Form"** button. Click it once. After that, every request lands in your inbox.

**More reliable way (recommended later, 2 minutes):**

1. Go to **web3forms.com**, type your email, and click "Create Access Key".
2. They email you a key that looks like `a1b2c3d4-....`
3. Paste it into `content.js`:
   ```js
   web3formsKey: "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   ```

If neither an email nor a key is added, the form still works and shows the thank-you message, but requests aren't sent anywhere — so add your email before sharing the site.

---

## 9. See the website on your computer

Just **double-click `index.html`**. It opens in your browser.

After editing `content.js`, save it and **refresh** the browser page (F5 / Cmd+R).

(The form only sends emails once the site is online — testing it on your computer just shows the thank-you message.)

---

## 10. Put the website online (easiest: Netlify — free)

**Netlify is the easiest option for beginners.** No code, just drag and drop.

1. Go to **app.netlify.com/signup** and create a free account (sign up with Google or email).
2. Go to **app.netlify.com/drop**
3. **Drag this whole website folder** onto the page.
4. Wait ~30 seconds. You get a live link like `https://something-random.netlify.app` 🎉
5. To rename it: **Site configuration → Site details → Change site name** → e.g. `youragency.netlify.app`

**To update the site later** (new ads, new text):
edit files on your computer → in Netlify open your site → **Deploys** tab → drag the folder onto the "Drag and drop your project folder here" box again.

**Your own domain (optional):** buy one (GoDaddy, Namecheap, Hostinger…), then in Netlify go to **Domain management → Add a domain** and follow the steps.

Other options (also free, slightly more steps):

* **Vercel** — vercel.com → Add New → Project. Easiest if you put the folder on GitHub first.
* **GitHub Pages** — upload the files to a GitHub repository → Settings → Pages → Deploy from branch → `main`. Works because everything uses simple file paths.

---

## Quick checklist before you share the link

- [ ] 5 ads in the `assets` folder (named work1 … work5)
- [ ] Project names and descriptions updated in `content.js`
- [ ] Agency name changed
- [ ] Email, Instagram and X added
- [ ] Site uploaded to Netlify
- [ ] Sent yourself a test form request and clicked **Activate** in the email

## If something looks wrong

* **A video doesn't show** → check the file name matches exactly (`work1.mp4` ≠ `Work1.MP4`) and that it's inside `assets`.
* **The whole page lost its ads or text** → you probably removed a `"` quote or `,` comma in `content.js`. Compare with the examples above.
* **Changes don't appear online** → you need to drag the folder to Netlify again after editing.
