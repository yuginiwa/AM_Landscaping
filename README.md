# A.M. Builders & Landscaping Services — NFC Contact Landing Page

Official, mobile-first digital contact card and portfolio for **A.M. Builders & Landscaping Services** (Cavite, Philippines · Est. August 2021). Built specifically for **NFC Business Cards** and modern smartphone interactions, ready for immediate deployment on **Vercel** with automatic **GitHub CI/CD**.

---

## 📱 Key Features

- **NFC & Mobile-First Design:**
  - Ultra-fast load time (0 external JavaScript dependencies, vanilla CSS & HTML).
  - Designed for instant tapping on NFC-enabled smartphones (iPhone & Android).
  - Official A.M. architectural branding: Architectural Gold (`#C7A447`), Charcoal/Black (`#141412`), and Off-White (`#FAF9F6`).
- **4-Card Quick Action Hub:**
  1. **Save Contact:** 1-tap download of `contact.vcf` (RFC-compliant vCard 3.0 supported by iOS Contacts, Google Contacts, and Samsung Contacts).
  2. **Direct Call:** Instant mobile dialer launcher for `+63 991 465 0889`.
  3. **Send Email:** Pre-formatted inquiry email to `ambuilderslandscapingservices@gmail.com`.
  4. **Share / QR Code Modal:** On-screen high-resolution vector QR code (`assets/qr-code.svg`) for in-person camera scanning, plus native Web Share API trigger (`navigator.share`).
- **Touch-Swipe Project Portfolio Lightbox:**
  - 6 featured projects: *Glass House with Loft* (Makati), *Darkberry Cafe* (Dasmariñas), *Bellazone Subdivision* (Bacoor), *Bolasco Farm* (Angat), *Cornerstone Executive Village* (Imus), and *Taifini Copper & Conductor* (Silang).
  - Filter chips: All work, Residential, Commercial, Outdoor.
  - Interactive photo lightbox with touch gestures (swipe left/right on mobile), active dot indicators, and an **"Inquire About This Project"** button that pre-composes an inquiry mentioning the selected project.
- **Service Categories with Visual Tags:**
  - 4 official categories: Construction & Renovation, Interior Works, Exterior & Landscaping, and Specialized Works with animated expand/collapse accordion.
- **Interactive Contact & Copy Feedback:**
  - 1-tap copy buttons for dual phone numbers (`+63 991 465 0889` & `+63 969 523 5544`) and email address.
  - Floating toast notification alerts for copied text and downloaded contact cards.
  - Google Maps direct link to office address at *Allegria Phase 1, Brgy. San Francisco, General Trias, Cavite*.
- **PWA & Search Engine Ready:**
  - `manifest.webmanifest` enabling "Add to Home Screen" on iOS & Android.
  - Structured JSON-LD schema for `HomeAndConstructionBusiness`.
  - Optimized OpenGraph and Twitter card previews.

---

## 🚀 Step 1: Push to GitHub

Git is already initialized in this folder with a clean initial commit. To push this to your GitHub account:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `am-builders-contact`).
   - Do **NOT** initialize it with a README, `.gitignore`, or license (the local project already has them).
2. Open PowerShell or Terminal in this directory (`AM_Contact_Landing`) and run:

```bash
# 1. Ensure you are on the main branch
git branch -M main

# 2. Add your GitHub remote (replace with your actual GitHub repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/am-builders-contact.git

# 3. Push the code to GitHub
git push -u origin main
```

---

## ⚡ Step 2: Deploy to Vercel (Automatic Sync)

Once the code is on GitHub, Vercel will host it for free with HTTPS and global CDN caching:

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Under **"Import Git Repository"**, select your newly created GitHub repository (`am-builders-contact`).
4. In the configuration screen:
   - **Framework Preset:** Select **Other**.
   - **Root Directory:** `./` (default).
   - **Build and Output Settings:** Leave all blank/default (no build command needed).
5. Click **"Deploy"**.
6. Within 10 seconds, Vercel will assign you a live HTTPS URL (e.g., `https://am-builders-contact.vercel.app`).

> **Automatic GitHub CI/CD:** Any time you commit and push new changes to GitHub (`git push`), Vercel will automatically re-deploy your website within seconds!

---

## 🏷️ Step 3: Program Your NFC Business Card

1. **Required Card Type:** Standard **NTAG213**, **NTAG215**, or **NTAG216** PVC, bamboo, metal-hybrid, or matte black card.
2. **NFC Writing App:**
   - **iPhone:** Download **NFC Tools** from the Apple App Store.
   - **Android:** Download **NFC Tools** from the Google Play Store.
3. **Writing Instructions:**
   - Open **NFC Tools**.
   - Select **Write** → **Add a record** → **Custom URL / URI**.
   - Enter your live Vercel HTTPS URL (e.g., `https://am-builders-contact.vercel.app` or your custom domain).
   - Tap **Write / 28 Bytes** and hold the back of your phone to the NFC business card until you hear the confirmation chime.
   - **Locking (Optional):** Once verified, you can write-protect the card to prevent unauthorized overwrites.

> **Tip for Physical Cards:** Print a small QR code pointing to the same URL on the physical card back so clients with older non-NFC phones can also scan it with their camera!

---

## 🌐 Custom Domain (Optional)

If you own a custom domain (e.g. `card.ambuilders.ph` or `ambuilders.ph`):
1. In Vercel, go to your project → **Settings** → **Domains**.
2. Enter your domain or subdomain.
3. Follow the DNS instructions provided by Vercel (add a `CNAME` pointing to `cname.vercel-dns.com`).

---

## 📁 File Structure

```
AM_Contact_Landing/
├── .gitignore              # Ignores OS, IDE, and temporary files
├── README.md               # Project documentation and deployment guide
├── contact.vcf             # Standard vCard 3.0 file for 1-tap phone contact save
├── index.html              # Semantic HTML5, SVG icons, schema.org markup
├── manifest.webmanifest    # Web App Manifest for mobile PWA home screen installation
├── script.js               # Gallery touch gestures, copy-to-clipboard, toast, QR modal
├── styles.css              # Custom design tokens, architectural palette, mobile layouts
├── vercel.json             # Security headers, clean URLs, and immutable asset caching
└── assets/
    ├── am-logo.png         # Transparent official A.M. logo monogram & wordmark
    ├── favicon.png         # 256x256 app icon & favicon
    ├── qr-code.svg         # Crisp vector QR code pointing to live digital card
    └── *.webp              # Optimized WebP photography for all 6 projects
```

---

## 🛠️ Verification Checklist Before Handing Out Cards

- [x] Official A.M. monogram and typography verified.
- [x] Phone numbers dialed and tested (+63 991 465 0889 / +63 969 523 5544).
- [x] Messenger link verified (`https://m.me/ambuilderslandscapingservices`).
- [x] vCard file tested on both iOS Safari and Android Chrome.
- [x] Mobile touch gestures verified on project galleries.
- [x] QR Code scan verified on mobile camera.
