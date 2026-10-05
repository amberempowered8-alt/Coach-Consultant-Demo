# Coach & Consultant Booking Template — Setup Guide

## What You Got
- A ready-to-launch booking website for coaches, consultants, and 1:1 service providers
- Free hosting, no monthly fees, ever
- Site-wide details edited in one simple file — Services and Testimonials update themselves from your own free Airtable database, no coding required

## What's Included in Your Package
- `index.html` — your site's structure and content sections
- `style.css` — the visual design (colors, layout, fonts)
- `app.js` — site-wide settings (CONFIG) plus the engine that syncs your Services and Testimonials sections from Airtable
- `.github/workflows/sync.yml` — the automatic sync job
- `SETUP-GUIDE.md` — this file

## Two Ways to Customize This Site

**1. Site-wide details — edit in `app.js`.** Things that rarely change: your name, headline, booking link, photo, availability ledger, credentials, and about section. Open `app.js`, edit the `CONFIG` object at the top, save, and commit. No Airtable needed for any of this.

**2. Services & Testimonials — edit in Airtable.** These are the things you'll actually update over time (a new package you offer, a new client quote). They live in two tables in your Airtable base and sync to the site automatically.

## Quick Start Checklist

### Step 1: Add Your Info
Open `app.js`. At the top, you'll see a `CONFIG` section. Replace the placeholder text with your own:

- `coachName` — Your name or business name
- `heroHeadline` / `heroSubtext` — Your main headline and short intro
- `bookingLink` — Your real Calendly, Cal.com, or booking link (see Step 2 — don't leave the placeholder link live)
- `photoUrl` — A link to your photo, or the file name if you uploaded a photo into this repo (see Step 3 — leave blank to keep the placeholder box)
- `availability` — Your "This Week" schedule ledger (4-6 rows reads best)
- `credentials` — Your trust badges (years of experience, clients served, certifications)
- `aboutHeading` / `aboutBody` / `aboutFacts` — Your story and a few honest facts about how you work

### Step 2: Connect Your Booking Link
Still inside `CONFIG`, find `bookingLink` and replace the placeholder with your real Calendly or Cal.com URL. Do not leave the placeholder link live — it's not a real working page, just text meant to be replaced. This is what the "Book This" buttons point to.

### Step 3: Add Your Photo
In `app.js`, find `photoUrl` in `CONFIG` and paste a link to your photo. (If you'd rather upload a photo file directly into this repository, upload it, then enter its file name — for example `photo.jpg` — as the value instead of a link.) Leave `photoUrl` blank to keep the placeholder box. A real photo builds trust faster than anything else on the page.

### Step 4: Duplicate Your Database Blueprint
1. Log into your free Airtable account.
2. Open your Master Core Blueprint link and click **Duplicate Base** to save it into your own workspace.
3. Confirm it has two tables: **Services** and **Testimonials**, each with a `Status` field.

**Services table fields:**
- `Service Name` — e.g. "1:1 Session"
- `Price` — shown exactly as typed, e.g. "$150 / session" or "Free — 20 min"
- `Description` — one or two sentences
- `Featured` — check this box for the one package you want visually highlighted (only feature one at a time)
- `Status` — set to **Published** to make it live

**Testimonials table fields:**
- `Client Name` — e.g. "Client Name" or a first name/initial, whatever your clients are comfortable with
- `Quote` — the review text
- `Status` — set to **Published** to make it live

### Step 5: Configure Your Secure Database Keys
This template needs four GitHub repo secrets (Settings → Secrets and variables → Actions → New repository secret):
- `AIRTABLE_TOKEN` — a Personal Access Token scoped to `data.records:read` on your duplicated base only
- `AIRTABLE_BASE_ID` — found in your browser's address bar when viewing your base (starts with `app...`)
- `AIRTABLE_SERVICES_TABLE` — the exact name of your Services table (defaults to `Services` if left blank)
- `AIRTABLE_TESTIMONIALS_TABLE` — the exact name of your Testimonials table (defaults to `Testimonials` if left blank)

**Security best practice:** always restrict your token to Read-Only (`data.records:read`) access. This ensures visitors can never modify or erase records in your database.

### Step 6: Go Live (Free Hosting)
1. Click "Use this template" on GitHub to copy this into your own account, keeping the folder structure intact (`.github/workflows/sync.yml` must stay in that exact path).
2. Go to Settings → Pages, and turn on GitHub Pages.
3. Your site is now live at no cost, and stays free — no monthly bill.

### Step 7: Trigger the First Sync
The sync runs automatically every 30 minutes and on every push, but you don't have to wait: go to your repo's **Actions** tab → **Sync services & testimonials from Airtable** → **Run workflow**. See the companion **GitHub Actions Quick-Start SOP** for the exact click-by-click.

## Connecting a Custom Domain (e.g., www.yourdomain.com)
Already have your own domain from Squarespace Domains, Namecheap, GoDaddy, or Cloudflare? Here's how to point it at your free GitHub Pages site instead of using the default `github.io` link — **we strongly recommend doing this**, since the default link will show our template account name instead of your own business.

**1. Set it in GitHub:**
In your repository, go to Settings → Pages. Scroll to Custom domain, enter your domain, and click Save. Check the box for Enforce HTTPS — this turns on your free SSL security certificate. (Sometimes it takes a couple minutes to update, so if it doesn't let you click it, know it's updating.)

**2. Update your domain's DNS settings:**
Log into your domain provider's DNS management panel and add:
- CNAME Record: Host/Name: `www` → Value/Target: `YOUR_GITHUB_USERNAME.github.io`
- A Records (for the root domain `@`), pointing to GitHub's IP addresses:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

DNS changes typically take 5–30 minutes to go live, sometimes longer.

## A Note on "Free"
Hosting is completely free to start. If you ever outgrow the free tier (very high traffic), a low-cost paid step may apply — but you'll never be locked into a recurring platform fee just to keep your site online.

## If Something Isn't Showing Up
See the companion **Airtable Quick-Start SOP** and **GitHub Actions Quick-Start SOP** — they walk through, in order, exactly what to check before assuming anything's broken (it's almost always a normal sync delay, not a bug).

## Questions?
This is a self-guided template. For setup help, reach out through your support link.
