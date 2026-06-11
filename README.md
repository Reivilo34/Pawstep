# Pawstep

Pawstep est une application web React/TypeScript pour suivre le quotidien d’un animal : profil, dressage, alimentation et rendez-vous santé.

## Fonctionnalités

- Authentification (Supabase)
- Gestion de plusieurs animaux
- Suivi dressage (assis, rappel, couché)
- Journal alimentation quotidien
- Suivi rendez-vous santé + export Google Calendar
- Interface responsive (mobile-first)

## Stack

- React 18 + TypeScript + Vite
- React Router
- Tailwind CSS
- Supabase Auth
- Déploiement GitHub Pages (workflow inclus)

## Prérequis

- Node.js 20+
- npm 10+

## Installation locale

```bash
npm ci
cp .env.example .env
# puis renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
npm run dev
```

## Variables d’environnement

| Variable | Description | Requise |
|---|---|---|
| `VITE_SUPABASE_URL` | URL projet Supabase | Oui |
| `VITE_SUPABASE_ANON_KEY` | Clé publique Supabase | Oui |
| `VITE_BASE_PATH` | Base URL publique (ex: `/pawstep/` ou `/`) | Non |

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Tests et qualité

Le dépôt n’inclut pas encore d’infrastructure de tests automatisés (unitaires/intégration/perf).  
En attendant, les validations minimales sont :

```bash
npm run lint
npm run typecheck
npm run build
```

## Déploiement

### GitHub Pages

Workflow déjà présent: `.github/workflows/deploy.yml`.

Secrets requis:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Docker

Build et exécution :

```bash
docker compose up --build
```

L’application est servie via Nginx sur `http://localhost:8080`.

### AWS (S3 + CloudFront)

1. `VITE_BASE_PATH=/ npm run build`
2. Uploader `dist/` dans un bucket S3 (site statique)
3. Placer CloudFront devant le bucket
4. Configurer fallback SPA (`index.html`) pour les routes React Router

## Licence

Ce projet est sous licence MIT (voir `LICENSE`) et autorise l’utilisation commerciale.

## Revue des dépendances (usage commercial)

Dépendances directes vérifiées:

| Dépendance | Version | Licence |
|---|---:|---|
| `@supabase/supabase-js` | `2.57.4` | MIT |
| `lucide-react` | `0.344.0` | ISC |
| `react` | `18.3.1` | MIT |
| `react-dom` | `18.3.1` | MIT |
| `react-router-dom` | `7.13.1` | MIT |
| `uuid` | `13.0.0` | MIT |

Ces licences sont permissives et compatibles avec un usage commercial.

## Contribution

1. Créer une branche dédiée
2. Faire des changements atomiques
3. Exécuter `npm run lint && npm run typecheck && npm run build`
4. Ouvrir une Pull Request avec description claire
