# Portfolio Framer

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This project showcases your work, projects, and contact information with a clean and interactive UI.

## Features
- Next.js 14 app directory structure
- TypeScript for type safety
- Tailwind CSS for rapid UI development
- Modular components: Hero, About, Projects, Contact
- Responsive design
- Image sequence animation support (public/sequence/)

## Project Structure
```
├── app/                # Main app pages and layout
├── components/         # Reusable React components
├── lib/                # Utility libraries and constants
├── public/sequence/    # Animation/image assets
├── styles/             # Global styles (if any)
├── package.json        # Project metadata and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server

## Customization
- Update content in `components/` and `app/` as needed
- Add or replace images in `public/sequence/`
- Adjust styles in `app/globals.css` or Tailwind config

## License
MIT
