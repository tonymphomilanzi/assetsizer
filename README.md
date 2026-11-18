<img width="960" height="421" alt="1" src="https://github.com/user-attachments/assets/58af9389-be5e-45b2-8452-b2779d932e83" />


<img width="960" height="418" alt="2" src="https://github.com/user-attachments/assets/0152500c-85c0-4169-9540-e173b3defa41" />


<img width="960" height="419" alt="3" src="https://github.com/user-attachments/assets/d972c108-c880-4064-bb46-ce96db397a61" />

---

```markdown
# AssetSizer

**One image. Every size. Instantly.**

Drop your icon or artwork once. AssetSizer crops, resizes, and packages every
required dimension for iOS, Android, Web, and Social into a tidy ZIP — right in
your browser. No account needed, no uploads to a server: all processing happens
client-side.

## Features

- 📱 **iOS App Icons** — 11 sizes from 1024×1024 App Store down to 20×20 Notification
- 🤖 **Android App Icons** — Play Store 512×512 plus all density buckets (mdpi → xxxhdpi)
- 🌐 **Web / Favicon** — PWA icons, Apple Touch icon, favicons (16/32)
- 📣 **Social Media** — X, Facebook, Instagram, LinkedIn, YouTube, and OG image presets
- ✂️ **Smart center-crop** — no stretching, no letterboxing; aspect ratios are preserved by cropping equally from the edges
- 📦 **ZIP export** — assets organized into per-platform folders (`ios/`, `android/`, `web/`, `social/`)
- 🔒 **Privacy-first** — images never leave your browser; resizing uses `OffscreenCanvas` where available


## Supported Inputs

PNG, JPEG, WebP, and SVG up to 20 MB.

## Tech Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | React 19 + TypeScript                         |
| Build      | Vite 7 + `vite-plugin-singlefile`             |
| Styling    | Tailwind CSS 4 + Radix UI primitives          |
| State      | Zustand                                       |
| Animation  | GSAP                                          |
| Packaging  | JSZip + file-saver                            |

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build (single HTML file)
npm run preview   # preview the build
```

## How It Works

1. **Upload** — the file is validated against accepted MIME types and the 20 MB limit.
2. **Select platforms** — toggle any combination of iOS, Android, Web, and Social.
3. **Generate** — each target size is produced by `resizeImage()`, which computes a center crop matching the target aspect ratio, then draws to a canvas and encodes PNG.
4. **Export** — `buildZip()` assembles the blobs into platform folders and `file-saver` triggers the download.

## Project Structure

```
src/
├── lib/
│   ├── platformSizes.ts   # Platform & AssetSize definitions, size catalog
│   ├── imageResizer.ts    # Center-crop resize via OffscreenCanvas/canvas
│   ├── zipBuilder.ts      # ZIP packaging
│   └── constants.ts       # Limits, pricing, accepted file types
├── store/
│   └── useAssetStore.ts   # Zustand store: upload, selection, generation, export
└── components/            # UI (HeroSection, tool, paywall, etc.)
```

