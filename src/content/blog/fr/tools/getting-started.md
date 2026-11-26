---
title: Bienvenue sur Rocky Blog
link: getting-started
catalog: true
date: 2024-01-01 00:00:00
description: Bienvenue sur ce blog construit avec Astro, React et Tailwind CSS, alliant performance statique, design soigné et support multilingue.
tags:
  - 入门
  - Astro
categories:
  - 工具
sticky: true
---

Bienvenue sur ce blog moderne construit avec Astro !

## À propos de ce site

Ce blog repose sur Astro 7, React et Tailwind CSS, avec une architecture statique légère et rapide. Il inclut notamment :

- **Haute performance** — Génération statique avec Astro et chargement optimisé des polices et images
- **Expérience de lecture soignée** — Table des matières dynamique, mode lecture concentrée et réglages typographiques
- **Multilingue natif** — Navigation en chinois, anglais, japonais et français avec bascule fluide
- **Recherche plein texte** — Recherche locale rapide avec filtres par catégorie, étiquette et langue

## Démarrage rapide

### 1. Configurer le site

Modifiez le fichier `config/site.yaml` pour personnaliser le titre, l'auteur, les catégories et les langues :

```yaml
site:
  title: Mon Blog
  author: Rocky
  description: Notes techniques et réflexions
```

### 2. Rédiger un article

Ajoutez un fichier Markdown dans `src/content/blog/` (ou dans `src/content/blog/fr/` pour une version française) :

```markdown
---
title: Mon premier article
date: 2024-01-01
tags:
  - Astro
categories:
  - 工具
---

Contenu de l'article...
```

## Pour aller plus loin

- Découvrez la [démonstration des fonctionnalités Markdown](/fr/post/markdown-features)
- Parcourez les [archives et la chronologie](/fr/archives)

Bonne lecture !
