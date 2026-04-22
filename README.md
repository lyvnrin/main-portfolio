# Lavanya Kamble - Portfolio

Personal portfolio site. Aesthetic: editorial, warm, typeset.

## Stack

- React 18 + Vite
- Vanilla CSS (no Tailwind, no UI libraries)
- EmailJS for contact form
- Cormorant Garamond + Cormorant SC + Inter via Google Fonts

## Getting Started

```bash
npm install
npm run dev
```

## Structure

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

## Features

- Light/dark mode toggle (☽/☀) in navbar, persisted to localStorage
- Custom blob cursor with context labels via `data-cursor` attributes
- Scroll-reveal animations on all sections
- Case study modal with frosted backdrop (closes on Esc or backdrop click)
- EmailJS contact form with sending/success/error states
- Infinite marquee ticker
- Fully responsive (desktop-first)

## Deployment

```bash
npm run dev
```
