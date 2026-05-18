# Lavanya Kamble | Portfolio

A portfolio that feels less like a template and more like a byline. React + Vite, vanilla CSS, typeset with Cormorant and Inter. 

## stack

- React 18 + Vite
- Vanilla CSS (no Tailwind, no UI libraries)
- EmailJS for the contact form
- Cormorant Garamond + Cormorant SC + Inter via Google Fonts

## getting started

```bash
npm install
npm run dev
```

## structure

```
src/
├── components/
│   ├── Navbar.jsx        
│   ├── Hero.jsx          
│   ├── About.jsx         
│   ├── Skills.jsx        
│   ├── Projects.jsx      
│   ├── ProjectCase.jsx   
│   ├── Marquee.jsx       
│   ├── Contact.jsx      
│   ├── Footer.jsx
│   ├── SectionHeader.jsx
│   ├── Cursor.jsx        
│   └── TopMark.jsx       
├── hooks/
│   ├── useReveal.js      
│   └── useTheme.js       
└── styles/
    └── global.css        
```

## features

- Light/dark mode toggle (☽/☀) in the navbar, persisted to localStorage
- Custom blob cursor with context labels via `data-cursor` attributes
- Scroll-reveal animations on every section
- Case study modal with frosted backdrop - closes on Esc or backdrop click
- EmailJS contact form with sending/success/error states handled
- Infinite marquee ticker
- Fully responsive, designed desktop-first

## deployment

Deployed on Vercel. To run locally:

```bash
npm run dev
```
