# SAMSA.SK — Website Redesign Project

## Project Info
- **Client**: Samuel Martiš — Bodhi Herbal SPA Cosmetics Czech&Slovakia
- **Developer**: Lukáš Kováčik
- **Website**: samsa.sk (SAMSA — Boho & Ethnic Shop, Pánska 33, Bratislava)
- **Budget**: 25 hours @ €10/hr = **€250**
- **Contact**: samuel@bodhispa.sk | +421 904 348 345

---

## Phases & Deadlines

| Phase | Description | Hours | Deadline | Status |
|-------|-------------|-------|----------|--------|
| 1 | Design proposals (2 variants) | 10h | 31.3. | 🟡 In Progress |
| 2 | HTML/CSS implementation + SEO | 10h | 2.4. | ⬜ Not Started |
| 3 | Go live, testing, finetuning | 5h | TBD | ⬜ Not Started |

---

## Client Requirements Checklist

### Must-haves (from Samuel)
- [x] Add Etsy E-Shop link to main navigation menu → https://www.etsy.com/de/shop/BohoShopSamsa
- [x] Add Google reviews to the website
- [x] Use brand teal color **#14AFA5** in color scheme
- [x] Use yellow + earthy pastel **#EBDDBE** in color scheme
- [x] Respect logo type and fonts (AmaticSC, TrashHand, Open Sans)
- [x] Integrate new photos from Google Drive (stored in `images/NAWEB/`)
- [x] 2 design proposals (color schemes)
- [ ] Get client approval on chosen design

### Color Scheme References (from client)
- https://www.schemecolor.com/mustard-and-teal.php
- https://www.schemecolor.com/floating-in-a-pool.php
- https://www.schemecolor.com/vintage-emerald.php
- Must include: **Teal #14AFA5** + **Yellow** + **White/Earthy #EBDDBE**

### Current Design Modes Implemented
1. **Earth** (warm earth tones — default) — accent #C75B2A
2. **Bazaar** (mustard & teal) — accent #14AFA5, secondary #D4A017, bg-alt #EBDDBE ← client's primary pick
3. **Pastel** (vintage emerald) — accent #0D7D6C, secondary #C8963E, bg-alt #EBDDBE

### Allowed
- Upgrade/improve original texts
- Use images from ethnosumba.sk (with approval)
- Creative freedom on layout and sections

---

## Task Tracker

### Phase 1 — Design (deadline: 31.3.)
- [x] Set up project structure
- [x] Implement 3 color themes with CSS custom properties
- [x] Build hero section with image slider
- [x] Build newsletter CTA section
- [x] Build About section (2-row layout with images)
- [x] Build Products grid (8 product cards)
- [x] Build Reviews section (3 review cards)
- [x] Build Store info section (address, phone, hours)
- [x] Build Contact section (details + map + form)
- [x] Build footer with nav + partners
- [x] Mobile responsive (768px, 480px breakpoints)
- [x] Hamburger menu + mobile drawer
- [x] Scroll reveal animations
- [x] Etsy link in nav, drawer, footer, and CTA block
- [x] New photos integrated (images/web/)
- [/] Polish — elevate design beyond "clean upgrade" to premium feel
- [x] Review copy/texts — modernize Slovak text (hero, about, fair trade, sponsoring)
- [ ] Verify Google reviews are accurate (currently placeholder text)
- [x] Review & finalize color themes (Earth theme chosen, switcher removed)
- [x] Implement SK/EN Language Switcher
- [ ] Present design to client
- [ ] Client approval

### Phase 2 — Implementation + SEO (deadline: 2.4.)
- [x] Semantic HTML structure
- [x] Meta tags (title, description, keywords, OG)
- [x] Canonical URL
- [x] Alt text on all images
- [x] Responsive design
- [x] Hero Ken Burns panning effect
- [ ] Add favicon
- [ ] Add og:image for social sharing
- [ ] Add JSON-LD LocalBusiness schema
- [ ] Convert images to WebP for performance
- [ ] Wire up forms (newsletter + contact) — Formspree or similar
- [ ] Add cookie consent (GDPR — required in Slovakia/EU)
- [ ] Performance audit (Lighthouse)
- [ ] Clean out raw NAWEB photos before deploy (~400MB)
- [ ] Add GA4 (old site had UA-88883439-1, deprecated)

### Phase 3 — Go Live + Finetuning
- [ ] Deploy to samsa.sk hosting
- [ ] DNS / SSL check
- [ ] Cross-browser testing (Chrome, Safari, Firefox, mobile)
- [ ] Speed test (PageSpeed Insights)
- [ ] Final link checks
- [ ] Client walkthrough
- [ ] Handoff documentation

---

## Creative Session — Decisions Log (27.3.2026)

### Hero Section
- **Removed** giant "SAMSA" h1 text (redundant — already in logo, tab title, URL)
- **Kept** "boho & ethnic shop" subtitle (now the h1 for SEO)
- **New tagline**: "Farby sveta. Príbehy remeselníkov. Jeden malý obchod v srdci Bratislavy." (Added `<br>` for better layout)
- **New CTA**: "Objavte náš svet" (was "Objavte náš sortiment")
- **Removed** "↓ Scroll" hint (unnecessary)
- **Fixed** red dress girl head cutoff via object-position
- **Cinematic Animation**: Implemented 1s delay on load, built robust JS-controlled cubic-bezier crossfade (8s pan) loop between 2 images to avoid glitching. Removed 3rd image to keep it tight.

#### Alternative taglines (saved for future use)
- "Ručne robené. Cestami nájdené. Od roku 2004 v srdci Bratislavy."
- "Každý kúsok má príbeh. Každý príbeh začal cestou."

### Navigation & Global
- **Language Switcher added**: Replaced color theme switcher (deleted JS/HTML/CSS for it) with `[EN/SK]` toggle. Added `data-i18n` attributes across navbar, newsletter, and products sections.
- **Theme**: Locked to warm Earth theme.

### Newsletter Section
- **Moved** from after Hero to between About and Products.
- Changed discount offer from 7% to **10%**.

### About Section — Full Copy & Layout Rewrite
- **New bullets**: "Malý obchod. Veľký svet." / "20 rokov ciest, remeselníkov a farieb." / "Fair Trade. Vždy."
- **New main text**: Focused on the hidden courtyard, the journey of each piece, "Nezakladáme si na trendoch. Zakladáme si na príbehoch."
- **Layout**: Centered sections, visual "journey timeline" created for Fair Trade craft processes, added full-width Nepal crafts photo.
- Added smooth gradient fade between About section bottom and Products section.

### Sponsoring Section
- Concrete facts: 2 kids sponsored, school built, earthquake relief
- Closing line: "Nie je to charita. Je to vzťah. Kupujeme od nich a oni rastú s nami." (Styled large with accent color).

### Products Section
- Shortened heading to **"Malý svet Boho"**.
- Updated to 8 curated categories aligned with Etsy: Oblečenie, Etno Textil, Šperky & Amulety, Tašky & Doplnky, Šály & Šatky, Dekorácie, Vónne Tyčinky, Darčeky.

### Brand Vibe Notes (from user)
- Peacock, not runway. Handmade, primitive, shamanic undertones
- Colorful, brightening, catching eye — nice shades
- Font = handmade, human, simple
- Customer: free-spirited, nature-loving, caring, colorful
- The website should feel like walking into the hidden courtyard shop

---

## Old vs New — Upgrade Tracker

### Tech Stack

| Aspect | Old (samsa.sk) | New (samsa_v2) | Improvement |
|--------|---------------|----------------|-------------|
| **Framework** | Bootstrap 3 + jQuery spaghetti | Zero dependencies — pure vanilla | ✅ No bloat, faster load |
| **CSS** | storm.css (5,356 lines, template) + 7 color CSS files + Bootstrap + Font Awesome + Isotope + YTPlayer | 1 clean file (1,446 lines) with CSS custom properties | ✅ ~95% less CSS |
| **JS** | 18 scripts (~370KB): jQuery, Modernizr, Isotope, Owl Carousel, Magnific Popup, YT Player, etc. | 1 file (7KB): vanilla IntersectionObserver, smooth scroll | ✅ ~98% less JS |
| **Total JS payload** | ~370KB across 18 files | ~7KB single file | ✅ 50x lighter |
| **Fonts** | 8 font families (Gotham, Lato, Merriweather, Raleway, etc.) + AmaticSC, TrashHand | Open Sans (Google) + AmaticSC + TrashHand (local woff) | ✅ Consistent, fast |
| **Images** | Unoptimized, no lazy loading, no alt text | Optimized, lazy loading, descriptive alt text | ✅ Performance + SEO |
| **CSS Architecture** | Inline styles everywhere, `!important` abuse, hardcoded px values | CSS custom properties, clamp(), fluid typography | ✅ Maintainable |

### Design & UX

| Aspect | Old | New | Improvement |
|--------|-----|-----|-------------|
| **Hero** | Owl Carousel slider (just product banners) | Full-viewport crossfade slider with overlay + CTA | ✅ Premium first impression |
| **Navigation** | Bootstrap navbar, TrashHand font links, orange highlight | Clean glassmorphism navbar, backdrop blur, Etsy pill link | ✅ Modern, refined |
| **Mobile nav** | Bootstrap collapse (broken styling) | Custom slide-out drawer with overlay | ✅ Smooth, polished |
| **Color theming** | Color picker panel (8 colors, template feature) | 3 curated theme modes matching brand identity | ✅ Intentional branding |
| **Products grid** | Isotope grid, no hover effects, no labels | CSS grid with hover zoom, gradient overlay, labels | ✅ Interactive, informative |
| **Reviews** | ❌ None existed | ✅ 3 review cards with stars and attribution | ✅ New section — social proof |
| **Store section** | Basic 2-column text + image | Styled info cards with SVG icons, notice banner | ✅ Clearer info hierarchy |
| **Contact** | Font Awesome icons, basic layout | SVG icons, 2-column grid, styled form | ✅ Cleaner, more complete |
| **Footer** | Bare links with pipe separators | Branded footer with logo, nav, divider | ✅ Professional |
| **Scroll animations** | Basic opacity fade (jQuery inview) | IntersectionObserver with staggered reveals | ✅ Native, performant |
| **Typography** | Hardcoded px everywhere | clamp() fluid typography, proper scale | ✅ Responsive elegance |
| **Texture** | None | Grain overlay for organic feel | ✅ Subtle craft aesthetic |
| **Etsy integration** | ❌ Not linked anywhere | Nav, drawer, footer, dedicated CTA block | ✅ Client requirement met |

### SEO

| Aspect | Old | New | Improvement |
|--------|-----|-----|-------------|
| **Title** | "SAMSA - BOHO & ETHNIC" (bland) | "SAMSA — Boho & Ethnic Shop \| Bratislava \| Fair Trade Móda & Šperky" | ✅ Keyword-rich |
| **Meta description** | "SAMSA - BOHO & ETHNIC SHOP" (7 words) | Full 160-char description with location + USP | ✅ Click-worthy |
| **Keywords** | Basic list | Expanded with long-tail Slovak terms | ✅ Better coverage |
| **OG tags** | ❌ None | ✅ og:title, og:description, og:type | ✅ Social sharing |
| **Canonical** | ❌ None | ✅ Defined | ✅ Duplicate prevention |
| **Alt text** | Empty or missing on most images | Descriptive Slovak alt text on every image | ✅ Accessibility + SEO |
| **Heading hierarchy** | Multiple h2, h3 — no clear structure | Single h1, proper h2/h3 cascade | ✅ Semantic correctness |
| **Google Analytics** | Old UA tracking (deprecated) | ❌ Not yet added | ⬜ TODO: Add GA4 |

### Content

| Aspect | Old | New | Status |
|--------|-----|-----|--------|
| **About text** | Typos ("streiborné", "ethnických", "vzormy") | Cleaned up, corrected Slovak | ✅ Fixed |
| **Fair Trade text** | Very long, unbroken wall of text | Trimmed to key points, better paragraphs | ✅ Readable |
| **Sponsoring text** | Basic bullet points | Cleaned up, integrated naturally | ✅ Better flow |
| **Product descriptions** | None — just images | Category labels on hover (Boho, Etno, Šperky, etc.) | ✅ Informative |
| **Newsletter copy** | "Zaregistruj sa a ziskaj..." (typo) | "Zaregistruj sa a získaj..." (corrected) | ✅ Fixed |

### What the old site was missing (now added)
- ✅ Etsy E-Shop integration (nav, CTA, footer)
- ✅ Google Reviews section
- ✅ Brand color themes (#14AFA5 teal + #EBDDBE earthy)
- ✅ Mobile-first responsive design
- ✅ Scroll reveal animations
- ✅ Modern hero with CTA
- ✅ Lazy loading images
- ✅ Accessibility (prefers-reduced-motion, focus-visible)
- ✅ Proper SEO meta tags

### What the old site had (kept/preserved)
- ✅ Same brand fonts (AmaticSC, TrashHand)
- ✅ Same sections structure (Úvod → O nás → Produkty → Predajňa → Kontakt)
- ✅ Same partner logos (Bodhi, Amandari, Ethno Sumba)
- ✅ Same contact info and Google Map embed
- ✅ Newsletter signup form
- ✅ Contact form
- ✅ Logo placement in header + footer

---

## Notes
- Old site located at: `samsa/` (scraped copy of www.samsa.sk)
- New site located at: `samsa_v2/`
- NAWEB folder contains 86 raw photos (5-9MB each, ~400MB) — for reference only, NOT for deployment
- Web-optimized images already in `samsa_v2/images/web/` (~200-300KB each)
- Partner links (Bodhi, Amandari, Ethno Sumba) currently use http:// — update to https://
- Store section shows 2 phone numbers — confirm with client which is primary
- Reviews are fabricated — need real Google reviews or client approval on text
- Old numbered images (01.jpg–08.jpg) in images/ — from old site, check if still needed
- Old site had Google Analytics UA-88883439-1 — need to set up GA4 for new site
