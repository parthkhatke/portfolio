# Parth Khatke — Portfolio

A cinematic, scroll-driven personal portfolio website built with Next.js 14, React, TypeScript, Tailwind CSS, and Framer Motion.

🌐 **Live at → [parth-khatke-portfolio.vercel.app](https://parth-khatke-portfolio.vercel.app/)**

---

## ✨ Features

- **Scroll-Driven Image Sequence** — A 192-frame PNG animation rendered on a `<canvas>` element, driven by scroll position via Framer Motion's `useScroll` + `useSpring`. Frames are preloaded with a progress bar loading screen.
- **Layered Text Beats** — Four distinct scroll-synced text overlays fade and translate in/out over the canvas as the user scrolls (Hero, Backends, Frontends, CTA).
- **About Section** — Bio, current employer badge, personal photo, and a skills grid organized by category.
- **Contact Section** — Email CTA, social links (GitHub, LinkedIn, Resume), and location badge.
- **Projects Section** *(currently commented out)* — Defined in `lib/constants.ts` with three projects ready to display.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Runtime | React 18 |

---

## 📁 Project Structure

```
porfolio-web-4/
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page (composes all sections)
├── components/
│   ├── HeroSequence.tsx    # Scroll-driven canvas animation + text beats
│   ├── AboutSection.tsx    # Bio, photo, and skills grid
│   ├── ContactSection.tsx  # Email CTA, social links, footer
│   └── ProjectsSection.tsx # Projects display (currently unused)
├── lib/
│   └── constants.ts        # Frame config, colors, spring config, projects & skills data
└── public/
    └── sequence/           # 192 PNG frames (frame_000.png → frame_191.png)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`.

---

## 🎬 How the Hero Sequence Works

1. On mount, all **192 PNG frames** from `/public/sequence/` are preloaded into memory. A loading screen with a progress bar is shown.
2. Once loaded, a `<canvas>` renders frames using a **cover-fit** algorithm (similar to CSS `object-fit: cover`), respecting device pixel ratio.
3. Framer Motion's `useScroll` tracks the scroll position within the `600vh` container. A `useSpring` smooths the value.
4. On every spring update, the frame index is calculated as `Math.floor(progress × 191)` and rendered via `requestAnimationFrame`.
5. Four `TextBeat` overlays are positioned as `fixed` elements and fade/translate in and out at specific scroll progress milestones (`3%–18%`, `22%–38%`, `45%–65%`, `75%–100%`).

---

## 🗂 Projects (from `lib/constants.ts`)

| # | Title | Category | Status |
|---|---|---|---|
| 01 | **TradeTrack Pro** | Full Stack Application | Shipped |
| 02 | **DevCollab** | Real-Time Platform | In Progress |
| 03 | **APIForge** | Developer Tool | Open Source |

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Surface | `#111111` |
| Border | `#1F1F1F` |
| Accent (Gold) | `#C9A96E` |
| Accent Dim | `#8B6E42` |

---

## 🧑‍💻 Skills

**Backend** — Java · Spring Boot · Hibernate · REST APIs · Next.js  
**Frontend** — React.js · Next.js · TypeScript · Tailwind CSS · Framer Motion  
**DevOps & Tools** — Docker · Git · Postman · IntelliJ · VS Code  
**Databases** — PostgreSQL · MySQL

---

## 📬 Contact

- **Email** — parth.khatke@email.com
- **GitHub** — [github.com/parthkhatke](https://github.com/parthkhatke)
- **LinkedIn** — [linkedin.com/in/parthkhatke](https://linkedin.com/in/parthkhatke)
- **Location** — Indore, India

---

© 2025 Parth Khatke
