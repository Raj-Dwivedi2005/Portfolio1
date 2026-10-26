# Raj Dwivedi - Aviation-Inspired AI/ML Engineering Portfolio

A premium, award-worthy personal portfolio website engineered for **Raj Dwivedi**, final-year Computer Science (AI & Machine Learning) student at SRM Institute of Science and Technology.

Aviation and aerospace-inspired design featuring a fixed scroll-driven 3D commercial airliner WebGL canvas, real-time cursor bubble emitter with particle physics and pop bursts, glassmorphism HUD telemetry, Lenis smooth scrolling, and dark/light modes.

---

## Key Features

1. **Scroll-Driven 3D Airplane Canvas (Three.js WebGL)**:
   - Modern twin-engine commercial widebody passenger jet procedurally modeled with high-fidelity geometry, aerodynamic swept wings, turbofans with rotating blades, and aviation-standard navigation beacons (Port Red, Starboard Green, Tail Strobe White).
   - Catmull-Rom waypoint spline tied to scroll progress (scrub): enters from the left on the hero, banks and curves dynamically across sections, climbs through atmospheric clouds, and flies into the stratosphere at the contact footer.
   - Low-power and `prefers-reduced-motion` detection automatically switches to an optimized 2D SVG radar flight path.
   - `devicePixelRatio` capped at 2 and rendering pauses automatically when tab is hidden.

2. **Cursor Bubble Emitter (Canvas Overlay)**:
   - Fullscreen canvas overlay releasing translucent glass bubbles with realistic specular reflection and buoyancy.
   - Spawn velocity calculated dynamically from mouse delta speed.
   - Object pooling (120 slots) with sine wave wobble and expanding ring pop bursts upon expiration.
   - Dual-layer avionics custom cursor targeting links and buttons on desktop (auto-disabled on touch devices).

3. **Curated Sections (Strictly Verified Facts)**:
   - **Hero**: Callsign badge, typewriter role cycling, CTAs (View Projects, Download Resume, Contact), scroll cruise indicator.
   - **About / Summary**: True facts (2 Internships, 3 Projects, CGPA 9.20).
   - **Education**: B.Tech CSE (AI/ML) at SRM Institute of Science and Technology (2023-2027), CGPA 9.20, coursework timeline card.
   - **Technical Skills**: 6 categorized glass cards with hover glow and animated chips.
   - **Experience**: Self-drawing vertical timeline for Infosys Springboard & Edunet Foundation internships.
   - **Projects**: 3D tilt-on-hover cards with cursor spotlights, tech stack chips, and interactive full-spec modal (HydroGuard.ai, EcoPackAI, AI-Generated Text Detection System).
   - **Certifications**: Badge cards for NPTEL IIT Madras, NPTEL IIT Kharagpur, and MongoDB University.
   - **Achievements & Languages**: SSB (Services Selection Board) officer selection interview evaluation milestones and bilingual proficiency.
   - **Contact / Footer**: Direct copy-to-clipboard for email (`rajiaf202704@gmail.com`) and phone (`+91-9740010439`) with visual toast feedback, active social links, and resume download.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) WebGL + Procedural Aerospace Modeling
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Single Source of Truth**: `/src/data/portfolio.ts`

---

## Local Development Setup

### 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 2. Installation
```bash
git clone https://github.com/Raj-Dwivedi2005/raj-dwivedi-portfolio.git
cd raj-dwivedi-portfolio
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 4. Production Build Test
```bash
npm run build
npm run start
```

---

## How to Edit Portfolio Content

All personal information, roles, statistics, projects, experience, and links are strictly centralized in a single typed configuration file:

```
src/data/portfolio.ts
```

To update any content:
1. Open `src/data/portfolio.ts`.
2. Edit the corresponding fields (e.g. updating a project's live demo URL, adding a new certification, or updating contact details).
3. The changes will instantly reflect throughout the application with full type safety.

---

## How to Swap or Customize the 3D Airplane Model

The 3D airliner is implemented in:
```
src/components/3d/AirplaneModel.ts
src/components/3d/AirplaneCanvas.tsx
```

- **Color Livery & Materials**: Modify `fuselageMaterial`, `wingMaterial`, or `cockpitGlassMaterial` in `AirplaneModel.ts`.
- **Loading an External glTF/GLB Model**:
  If you wish to load an external `.glb` model instead of the procedural generator:
  1. Place your `.glb` file inside `/public/models/airplane.glb`.
  2. In `AirplaneCanvas.tsx`, import `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader.js`.
  3. Load the model and add `gltf.scene` to `scene.add(airplaneGroup)`.
  4. The existing Catmull-Rom waypoint flight trajectory will smoothly drive the imported model without changing any animation logic.

---

## Deploying to Vercel

This portfolio is statically pre-rendered and requires zero external backend services.

### Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Via Vercel Web Dashboard
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New Project** and select your GitHub repository.
4. Leave framework preset as **Next.js**.
5. Click **Deploy**. Vercel will build and deploy the site in under 60 seconds with edge CDN caching and automatic HTTPS.

---

## License & Credits

Designed and developed for **Raj Dwivedi** (2026). All project information and credentials verified.
