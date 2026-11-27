---
title: Bienvenue sur Rocky Blog
link: getting-started
catalog: true
date: 2024-01-01 00:00:00
description: Découvrez Rocky Blog, un blog personnel statique conçu avec Astro, React et Tailwind CSS.
tags:
  - 入门
  - Astro
categories:
  - 工具
sticky: true
translationKey: getting-started
---

Bienvenue sur **Rocky Blog**, un blog personnel statique consacré à l'écriture, à la lecture et à la découverte de contenus.

## À propos du projet

Rocky Blog repose sur Astro 7, React 19, TypeScript et Tailwind CSS 4. La génération statique constitue la base du site ; seules les interactions nécessaires sont hydratées côté client. Sa direction artistique associe une mise en page éditoriale soignée, une typographie de magazine contemporain et des détails discrets inspirés des sakura, de la botanique et du ciel étoilé.

Les principales fonctionnalités comprennent :

- Les sections éditoriales de l'accueil, les articles, catégories, étiquettes, archives et séries.
- La recherche statique Pagefind, la palette de commandes et l'historique de lecture local.
- Les thèmes clair et sombre, les préférences de lecture, le mode concentration et la table des matières.
- GFM, Shiki, KaTeX, Mermaid, Infographic et les extensions Markdown de style Shoka.
- Une interface en chinois, anglais, japonais et français.
- Les métadonnées SEO et le déploiement statique.

Le produit ne fournit pas de CMS, de commentaires, d'analytics, de lecteur musical global, de flux RSS, de résumés IA ni de synchronisation cloud de l'historique. Consultez le document Product Scope du dépôt pour la liste complète.

## Bibliothèque de lecture personnelle

Enregistrez des articles depuis les cartes ou les pages compatibles, puis gérez-les sur `/shelf`. La bibliothèque propose les filtres « À lire », « En cours » et « Terminés », ainsi que la recherche, le tri et les vues en grille ou en liste. Les favoris et l'historique restent dans le navigateur actuel : ils ne sont pas synchronisés entre appareils.

## Démarrage rapide

Prérequis : Node.js `>=22.20.0` et pnpm `10.28.2`.

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

Le serveur de développement utilise le port 3000 par défaut. Définissez `BLOG_PORT` pour le modifier.

## Rédiger un premier article

Créez un fichier Markdown dans `src/content/blog/` :

```markdown
---
title: Mon premier article
description: Une courte introduction
date: 2026-11-27
link: mon-premier-article
tags:
  - Astro
categories:
  - 笔记
---

Votre texte commence ici.
```

Le schéma de contenu est défini dans `src/content.config.ts`. Les champs disponibles comprennent notamment `title`, `date`, `description`, `link`, `updated`, `cover`, `tags`, `categories`, `sticky`, `draft`, `catalog`, `tocNumbering`, `math`, `password`, `keywords` et `translationKey`.

## Traductions

Le chinois est la langue par défaut. Les traductions reproduisent le chemin relatif de l'article sous les dossiers `en/`, `ja/` ou `fr/`. Conservez le même `link` et, si nécessaire, le même `translationKey`.

L'interface prend en charge quatre langues, mais chaque article ne dispose pas nécessairement de quatre traductions. Le site applique son mécanisme de repli lorsqu'une traduction est absente.

## Configuration et déploiement

Modifiez `config/site.yaml` pour personnaliser l'identité du site, le domaine, le fuseau horaire, les langues, la navigation, les catégories, les séries et les animations. Les traductions des libellés de contenu se trouvent dans `config/i18n-content.yaml`.

Exécutez `pnpm build` pour générer `dist/`. Déployez ce répertoire sur GitHub Pages, Vercel, Netlify, Cloudflare Pages ou tout autre hébergement statique. Aucun serveur applicatif ni base de données n'est nécessaire.

## Pour aller plus loin

- [Guide d'utilisation de Rocky Blog](/fr/post/astro-koharu-guide)
- [Démonstration Markdown](/fr/post/markdown-features)
- [Archives](/fr/archives)
- [Dépôt GitHub](https://github.com/RockyBabcock/rocky-blog)
