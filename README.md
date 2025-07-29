# 🌠 Astrog\@mers

Un projet personnel mêlant **développement web**, **expérimentation UI** et **univers du jeu vidéo**.
Créé avec [Astro](https://astro.build), hébergé sur [Netlify](https://www.netlify.com/).

## 🚀 Objectifs

Ce projet a pour but de fournir quotidiennement des horoscopes personnalisés à destination des joueurs de jeux compétitifs (MOBA, Shooter, Battle Royale).
Chaque jour, une requête automatique génère 12 horoscopes uniques – un par signe astrologique – avec un ton drôle, stylé et légèrement piquant, sans jamais tomber dans la toxicité.

Ces horoscopes combinent humour, réalisme in-game (matchmaking, teammates imprévisibles, loot frustrant…) et une touche d’astrologie fictive adaptée à l’univers du gaming compétitif.

L’objectif est de proposer un contenu divertissant, décalé et engageant pour les joueurs, tout en restant bienveillant et ancré dans l’expérience de jeu quotidienne.

## 🔧 Stack technique

- [Astro](https://astro.build/) (avec BaseLayout, composants, routing)
- HTML + CSS Modules (sans Tailwind)
- Déploiement via Netlify

## 🎨 Polices utilisées

| Usage              | Police         | Contexte                                       |
| ------------------ | -------------- | ---------------------------------------------- |
| Logo & titres      | **Orbitron**   | Futuriste, spatial, gaming                     |
| Boutons & badges   | **Oxanium**    | Moderne, carré, lisible, cohérent              |
| Codes ou citations | **Space Mono** | Monospace technique, parfait pour blocs code   |
| Sous-titres & UI   | **Oxanium**    | Science‑fiction sobre, rend l’interface fluide |

Les polices sont importées depuis Google Fonts ou intégrées localement selon le besoin.

## 📁 Structure du projet

```
src/
├── components/
│   ├── HeroSection.astro
│   ├── AboutPreview.astro
│   ├── ZodiacFinder.astro
│   ├── ZodiacCard.astro
│   ├── ZodiacGrid.astro
│   ├── ZodiacPageContent.astro
│   ├── AboutMe.astro
│   ├── LegalMentions.astro
│   └── PrivacyPolicy.astro
│
├── data/
│   ├── horoscopes.ts         ← Données statiques pour chaque signe
│   └── zodiac.ts             ← Liste des 12 signes + plages de dates
│
├── pages/
│   ├── index.astro
│   ├── a-propos.astro
│   └── signe/
│       └── [slug].astro
│
└── utils/
    └── getZodiacFromDate.ts  ← Fonction pour détecter le signe selon la date
```

## 📡 Déploiement

Le site est déployé en continu via Netlify :
🔗 [https://astrogamers.netlify.app](https://astrogamers.netlify.app)
