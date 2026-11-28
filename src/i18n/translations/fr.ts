/**
 * Français (fr) — UI strings
 *
 * Full French translation dictionary covering all UI keys.
 */

import type { UIStrings } from '../types';

export const uiStrings: UIStrings = {
  // Index pages
  'index.posts': 'articles',
  'index.years': 'ans',
  'index.categories': 'catégories',
  'index.tags': 'étiquettes',
  'index.mostUsed': 'plus utilisée',
  'category.filter': 'Sous-catégories',
  'tag.filter': 'Filtrer les étiquettes',
  'tag.filterPlaceholder': 'Saisir une étiquette',
  'tag.noMatches': 'Aucune étiquette correspondante',
  'tag.singleTags': '{count} autres étiquettes utilisées une seule fois',
  'archives.jumpToYear': 'Aller à {year}',
  'archives.legendFew': 'Moins',
  'archives.legendMany': 'Plus',
  'archives.calendar': 'Calendrier de publication',
  'archives.monthLabel': '{year}, mois {month} · {count} articles',

  // ── Navigation ──────────────────────────────────────────────
  'nav.home': 'Accueil',
  'nav.posts': 'Articles',
  'nav.categories': 'Catégories',
  'nav.tags': 'Étiquettes',
  'nav.archives': 'Archives',
  'nav.about': 'À propos',
  'nav.weekly': 'Hebdo',

  // ── Common ──────────────────────────────────────────────────
  'common.search': 'Rechercher',
  'common.close': 'Fermer',
  'viewer.loadError': 'Impossible de charger la visionneuse. Veuillez actualiser la page.',
  'search.loadError': 'Impossible de charger la recherche. Veuillez réessayer.',
  'common.copy': 'Copier',
  'common.copied': 'Copié',
  'common.copyFailed': 'La copie automatique a échoué. Copiez le lien manuellement.',
  'common.loading': 'Chargement...',
  'common.noResults': 'Aucun résultat',
  'common.backToTop': 'Haut de page',
  'common.darkMode': 'Mode sombre',
  'common.lightMode': 'Mode clair',
  'common.toggleTheme': 'Changer de thème',
  'common.language': 'Langue',
  'common.toc': 'Sommaire',
  'common.expand': 'Déplier',
  'common.collapse': 'Replier',
  'common.menuLabel': 'Menu {name}',

  // ── Post ────────────────────────────────────────────────────
  'post.readMore': 'Lire la suite',
  'post.totalPosts': '{count} articles',
  'post.stickyPosts': 'Articles épinglés',
  'post.postList': 'Articles',
  'post.featuredCategories': 'Catégories en vedette',
  'post.yearPosts': '{count} articles',
  'post.readingTime': '{time} min de lecture',
  'post.wordCount': '{count} mots',
  'post.publishedAt': 'Publié le {date}',
  'post.updatedAt': 'Mis à jour le {date}',
  'post.prevPost': 'Précédent',
  'post.nextPost': 'Suivant',
  'post.seriesNavigation': 'Navigation de la série',
  'post.seriesPrev': 'Précédent',
  'post.seriesNext': 'Suivant',
  'post.fallbackNotice': "Cet article n'est pas encore traduit en {lang}. Affichage de la version originale.",
  'post.draft': 'Brouillon',
  'post.pinned': 'Épinglé',
  'post.noPostsFound': 'Aucun article trouvé',

  // ── Categories & Tags ───────────────────────────────────────
  'category.allCategories': 'Toutes les catégories',
  'category.postsInCategory': 'Articles dans {name}',
  'category.totalCategories': '{count} catégories',
  'category.categoryLabel': 'Catégorie',
  'tag.allTags': 'Toutes les étiquettes',
  'tag.postsWithTag': 'Articles étiquetés « {name} »',
  'tag.totalTags': '{count} étiquettes',
  'tag.all': 'Tout',
  'tag.postCount': '{count} articles',

  // ── Archives ────────────────────────────────────────────────
  'archives.title': 'Archives',
  'archives.totalPosts': '{count} articles',

  // ── Search ──────────────────────────────────────────────────
  'search.placeholder': 'Rechercher par mot-clé',
  'search.label': 'Rechercher sur le site',
  'search.clear': 'Effacer',
  'search.loadMore': 'Charger plus de résultats',
  'search.filters': 'Filtres',
  'search.noResults': 'Aucun résultat trouvé',
  'search.manyResults': '[COUNT] résultats',
  'search.oneResult': '[COUNT] résultat',
  'search.altSearch': 'Aucun résultat. Affichage des résultats pour [DIFFERENT_TERM]',
  'search.suggestion': 'Aucun résultat. Essayez plutôt :',
  'search.searching': 'Recherche de [SEARCH_TERM]...',
  'search.dialogTitle': 'Rechercher des articles',
  'search.dialogClose': 'Fermer',
  'search.dialogSelect': 'Sélectionner',
  'search.dialogOpen': 'Ouvrir',

  // ── Code Block ──────────────────────────────────────────────
  'code.copy': 'Copier le code',
  'code.copied': 'Copié !',
  'code.fullscreen': 'Plein écran',
  'code.exitFullscreen': 'Quitter le plein écran',
  'code.wrapLines': 'Retour à la ligne',
  'code.viewSource': 'Voir la source',
  'code.viewRendered': 'Voir le rendu',
  'code.collapse': 'Replier le code',
  'code.expand': 'Déplier le code',

  // ── Diagram / Infographic ───────────────────────────────────
  'diagram.fullscreen': 'Plein écran',
  'diagram.exitFullscreen': 'Quitter le plein écran',
  'diagram.viewSource': 'Voir la source',
  'diagram.zoomIn': 'Zoomer',
  'diagram.zoomOut': 'Dézoomer',
  'diagram.resetZoom': 'Réinitialiser le zoom',
  'diagram.fitToScreen': 'Ajuster à l’écran',
  'diagram.actualSize': 'Taille réelle',
  'diagram.download': 'Télécharger l’image',
  'diagram.resize': 'Redimensionner le diagramme',
  'diagram.resizeHint': 'Glisser pour redimensionner, double-cliquer pour réinitialiser',
  'diagram.renderError': 'Impossible d’afficher ce diagramme',
  'diagram.loadingSlow': 'Le chargement du diagramme prend plus de temps',
  'diagram.errorHelp': 'Actualisez la page ou utilisez la barre d’outils pour copier la source.',
  'diagram.errorHelpNoSource': 'Veuillez actualiser la page pour réessayer.',
  'diagram.reload': 'Actualiser',
  'diagram.gestureHint': 'Pincer ou molette pour zoomer · Glisser pour déplacer · Double-cliquer pour agrandir',

  // ── Image Lightbox ──────────────────────────────────────────
  'image.preview': 'Aperçu de l’image',
  'image.loadError': 'Impossible de charger cette image',
  'image.retry': 'Réessayer',
  'image.hintMobileGallery': 'Glisser pour parcourir · Pincer pour zoomer · Glisser vers le bas pour fermer',
  'image.zoomIn': 'Zoomer',
  'image.zoomOut': 'Dézoomer',
  'image.resetZoom': 'Réinitialiser',
  'image.resetZoomRotate': 'Réinitialiser le zoom et la rotation',
  'image.rotate': 'Pivoter de 90°',
  'image.close': 'Fermer',
  'image.prev': 'Précédente',
  'image.next': 'Suivante',
  'image.counter': '{current} / {total}',
  'image.hintDesktop': 'Double-cliquer pour zoomer · Molette pour ajuster · Cliquer à l’extérieur pour fermer',
  'image.hintMobile': 'Double-taper ou pincer pour zoomer · Glisser vers le bas pour fermer',

  // ── Footer ──────────────────────────────────────────────────
  'footer.poweredBy': 'Propulsé par {name}',
  'footer.totalPosts': '{count} articles',
  'footer.totalWords': '{count} mots',
  'footer.totalWordsTitle': 'Nombre total de mots',
  'footer.readingTimeTitle': 'Temps de lecture total',
  'footer.postCountTitle': 'Nombre total d’articles',
  'footer.runningDays': 'En ligne depuis {days} jours',
  'footer.wordUnit': 'mots',
  'footer.postUnit': 'articles',

  // ── Pagination ──────────────────────────────────────────────
  'pagination.label': 'Pagination',
  'pagination.prev': 'Précédent',
  'pagination.next': 'Suivant',
  'pagination.page': 'Page {page}',
  'pagination.currentPage': 'Page {page}, page actuelle',
  'pagination.of': 'sur {total}',

  // ── Breadcrumb ──────────────────────────────────────────────
  'breadcrumb.home': 'Accueil',
  'breadcrumb.goToCategory': 'Aller à la catégorie {name}',

  // ── Floating Group ──────────────────────────────────────────
  'floating.backToTop': 'Haut de page',
  'floating.scrollToBottom': 'Bas de page',
  'floating.toggleTheme': 'Changer de thème',
  'floating.toggleToolbar': 'Afficher/masquer la barre',
  'floating.settings': 'Paramètres',

  // ── Settings Panel ────────────────────────────────────────
  'settings.title': 'Paramètres',
  'settings.reader': 'Lecture',
  'settings.general': 'Général',
  'settings.closePanel': 'Fermer les paramètres',
  'settings.fontPreset': 'Police',
  'settings.fontPreset.round': 'Arrondie',
  'settings.fontPreset.system': 'Système',
  'settings.fontPreset.serif': 'Sérif',
  'settings.fontPreset.wenkai': 'WenKai',
  'settings.fontSize': 'Taille du texte',
  'settings.lineHeight': 'Interligne',
  'settings.measure': 'Largeur de ligne',
  'settings.auto': 'Auto',
  'settings.justify': 'Justifier',
  'settings.scrollProgress': 'Barre de progression',
  'settings.motionLevel': 'Animations',
  'settings.motionLevel.lively': 'Vif',
  'settings.motionLevel.subtle': 'Subtil',
  'settings.motionLevel.reduced': 'Réduit',
  'settings.motionLevel.livelyHint': 'Apparitions, pétales discrets en couverture, transitions et révélations au défilement',
  'settings.motionLevel.subtleHint': 'Transitions essentielles uniquement, sans pétales ni révélations au défilement',
  'settings.motionLevel.reducedHint': 'Uniquement les retours d’interaction essentiels',
  'settings.motionLevel.systemReduced': 'Votre système préfère les animations réduites',
  'settings.wave': 'Vagues de couverture',
  'settings.reset': 'Réinitialiser',
  'settings.waveDisabledByReducedMotion': 'Indisponible lorsque les animations sont réduites',
  'settings.invalidNumber': 'Saisissez un nombre positif',

  // ── Encrypted Block ─────────────────────────────────────────
  'encrypted.locked': 'Contenu chiffré',
  'encrypted.placeholder': 'Mot de passe requis',
  'encrypted.submit': 'Déverrouiller',
  'encrypted.incorrect': 'Mot de passe incorrect',

  // ── Encrypted Post ─────────────────────────────────────────
  'encrypted.post.title': 'Cet article est chiffré',
  'encrypted.post.description': 'Veuillez saisir le mot de passe pour consulter le contenu',

  // ── 404 ─────────────────────────────────────────────────────
  'notFound.title': 'Page introuvable',
  'notFound.description': 'La page recherchée n’existe pas',
  'notFound.backHome': 'Retour à l’accueil',
  'notFound.browseArchives': 'Parcourir les archives',
  'notFound.message': 'La page que vous recherchez est introuvable ou a été déplacée.',

  // ── Category Stats ────────────────────────────────────────
  'category.subCategoryCount': '{count} sous-catégories',
  'category.postCount': '{count} articles',

  // ── Post Card ─────────────────────────────────────────────
  'post.readingTimeTooltip': 'Temps de lecture estimé : {time}',

  // ── Featured Series ─────────────────────────────────────────
  'series.latestPost': 'Dernier',
  'series.viewAll': 'Tout voir',
  'series.postCount': '{count} articles',
  'series.position': '{current} sur {total}',
  'series.noPosts': 'Aucun article dans cette série',
  'series.chromeExtension': 'Extension Chrome',
  'series.docs': 'Documentation',
  'series.issues': 'numéros',
  'series.latestIssue': 'Dernier numéro',
  'series.readIssue': 'Lire ce numéro',

  // ── Home Info ───────────────────────────────────────────────
  'homeInfo.articles': 'Articles',
  'homeInfo.categories': 'Catégories',
  'homeInfo.tags': 'Étiquettes',
  'homeInfo.greetingMorning': 'Bonjour !',
  'homeInfo.greetingAfternoon': 'Bon après-midi !',
  'homeInfo.greetingEvening': 'Bonsoir !',
  'homeInfo.greetingNight': 'Bonne nuit, reposez-vous bien',

  // ── Drawer ──────────────────────────────────────────────────
  'drawer.navMenu': 'Menu de navigation',
  'drawer.close': 'Fermer le menu',
  'drawer.openMenu': 'Ouvrir le menu',

  // ── Summary Panel ───────────────────────────────────────────
  'summary.description': 'Résumé',

  // ── Latest Posts ────────────────────────────────────────────
  'post.latestPosts': 'Derniers articles',

  // ── Tag Component ───────────────────────────────────────────
  'tag.expandAll': 'Tout afficher',
  'tag.viewTagPosts': 'Voir les {count} articles étiquetés « {tag} »',

  // ── Table of Contents ───────────────────────────────────────
  'toc.title': 'Sommaire',
  'toc.sectionProgress': 'Progression de la section',
  'toc.expand': 'Afficher le sommaire',
  'toc.empty': 'Aucun titre',

  // ── Content ───────────────────────────────────────────────
  'content.revealSpoiler': 'Afficher le texte masqué',

  // ── Search Shortcut ───────────────────────────────────────
  'search.searchShortcut': 'Rechercher ({shortcut})',

  // ── Sider Segmented ─────────────────────────────────────────
  'sider.overview': 'Aperçu',
  'sider.toc': 'Sommaire',
  'sider.series': 'Série',

  // ── Copy Link ───────────────────────────────────────────────
  'cover.copyLink': 'Copier le lien',

  // ── Cross-Language & Fallback ──────────────────────────────
  'post.viewOriginal': 'Voir l’original ({lang})',
  'post.originalLocale': 'Original : {lang}',
  'language.nativeAvailable': 'Traduit',
  'language.fallbackLabel': 'Version originale',

  // ── Search Upgrade ─────────────────────────────────────────
  'search.filterCategory': 'Catégorie',
  'search.filterTag': 'Étiquette',
  'search.filterLanguage': 'Langue',
  'search.clearFilters': 'Réinitialiser',
  'search.all': 'Tout',
  'search.resultCount': '{count} articles trouvés',
  'search.emptyPrompt': 'Saisissez un mot-clé ou choisissez un filtre ci-dessous',
  'search.retry': 'Réessayer',
  'search.openCommands': 'Palette de commandes',
  'search.shortcutHint': 'Commandes',

  // ── Reading History ────────────────────────────────────────
  'history.title': 'Lectures récentes',
  'history.continueReading': 'Continuer',
  'history.empty': 'Aucun historique de lecture local',
  'history.clearAll': 'Tout effacer',
  'history.cleared': 'Historique de lecture effacé',
  'history.removeItem': 'Retirer de l’historique',
  'history.progress': '{percent} % lu',
  'history.completed': 'Terminé',
  'history.justNow': 'À l’instant',
  'history.minutesAgo': 'il y a {count} min',
  'history.hoursAgo': 'il y a {count} h',
  'history.daysAgo': 'il y a {count} j',

  // ── Command Palette ────────────────────────────────────────
  'command.title': 'Palette de commandes',
  'command.placeholder': 'Saisir une commande ou accéder à une page...',
  'command.empty': 'Aucune commande correspondante',
  'command.groupNav': 'Navigation',
  'command.groupActions': 'Actions',
  'command.groupRecent': 'Lectures récentes',
  'command.searchPosts': 'Rechercher des articles',
  'command.searchForQuery': 'Rechercher « {query} » dans les articles',
  'command.openSettings': 'Ouvrir les paramètres de lecture',
  'command.toggleFocus': 'Activer / quitter le mode concentration',
  'command.toggleTheme': 'Basculer thème clair / sombre',
  'command.trigger': 'Commandes',
  'command.navigateHint': 'Naviguer',
  'command.executeHint': 'Exécuter',

  // ── Article Share ──────────────────────────────────────────
  'share.title': 'Partager',
  'share.copyLink': 'Copier le lien',
  'share.copyMarkdown': 'Copier le lien Markdown',
  'share.nativeShare': 'Partage système',
  'share.linkCopied': 'Lien de l’article copié',
  'share.markdownCopied': 'Lien Markdown copié',
  'share.shared': 'Feuille de partage ouverte',
  'share.failed': 'Échec de la copie. Copiez l’URL depuis la barre d’adresse.',

  // ── Focus Reading Mode ─────────────────────────────────────
  'focus.enter': 'Mode focus',
  'focus.exit': 'Quitter le focus',
  'focus.active': 'Mode lecture concentrée',
  'focus.shortcutHint': 'Appuyez sur Échap pour quitter',

  // ── Series Reading Route ───────────────────────────────────
  'series.progressTitle': 'Progression de la série',
  'series.completedCount': '{read} / {total} lus',
  'series.continueReading': 'Continuer la lecture',
  'series.startReading': 'Commencer la lecture',
  'series.statusRead': 'Lu',
  'series.statusInProgress': '{percent} %',
  'series.backToSeries': 'Voir toute la série',
  'series.partOfSeries': 'Série',

  // ── Archives Timeline ──────────────────────────────────────
  'archives.timelineTitle': 'Chronologie des articles',
  'archives.allYears': 'Toutes les années',
  'archives.quickJump': 'Accès rapide',

  // ── Home Editorial Dashboard ───────────────────────────────
  'home.heroExplore': 'Explorer',
  'home.heroSearch': 'Rechercher',
  'home.featuredSection': 'À la une',
  'home.featuredSubtitle': 'Sélections et numéros récents',
  'home.latestSubtitle': 'Derniers articles et notes techniques',
  'home.seriesSection': 'Séries & Hebdo',
  'home.seriesSubtitle': 'Parcours de lecture thématiques',
  'home.exploreTopics': 'Explorer les sujets',
  'home.exploreSubtitle': 'Parcourir par catégorie et étiquette',
  'home.popularTags': 'Étiquettes populaires',
  'home.allTags': 'Toutes les étiquettes',
  'home.allCategories': 'Toutes les catégories',
  'home.timelineSection': 'Fil chronologique',
  'home.timelineSubtitle': 'Rythme de publication par année',
  'home.viewFullArchives': 'Voir les archives',
  'home.railSearchHint': 'Rechercher articles, sujets...',
  'home.railHistoryEmptyHint': 'Vos lectures sont enregistrées localement pour reprendre facilement.',
  'home.railStartExplore': 'Commencer la lecture',
  'home.railArchiveSummary': 'Aperçu des archives',
  'home.railTopicsSummary': 'Catégories clés',
  'home.viewAllPosts': 'Tous les articles',

  // ── Bibliothèque personnelle & Favoris ──────────────────────
  'nav.shelf': 'Ma bibliothèque',
  'bookmark.save': 'Enregistrer',
  'bookmark.saved': 'Enregistré',
  'bookmark.saveArticle': 'Ajouter à la bibliothèque',
  'bookmark.removeArticle': 'Retirer de la bibliothèque',
  'bookmark.toastSaved': 'Ajouté à votre bibliothèque',
  'bookmark.toastRemoved': 'Retiré de votre bibliothèque',
  'bookmark.storageUnavailable':
    'Le stockage local du navigateur est indisponible ; vos favoris ne peuvent pas être enregistrés.',
  'shelf.kicker': 'VOTRE BIBLIOTHÈQUE',
  'shelf.title': 'Bibliothèque',
  'shelf.subtitle': 'Conservez vos articles à lire plus tard. Tout reste strictement privé dans votre navigateur.',
  'shelf.countLabel': '{count} enregistré(s)',
  'shelf.filterAll': 'Tous',
  'shelf.filterToRead': 'À lire',
  'shelf.filterInProgress': 'En cours',
  'shelf.filterCompleted': 'Terminés',
  'shelf.searchPlaceholder': 'Filtrer vos articles enregistrés...',
  'shelf.sortNewest': 'Récents d’abord',
  'shelf.sortOldest': 'Anciens d’abord',
  'shelf.sortTitle': 'Titre A–Z',
  'shelf.layoutGrid': 'Vue grille',
  'shelf.layoutList': 'Vue liste',
  'shelf.savedOn': 'Enregistré le {date}',
  'shelf.openArticle': 'Lire l’article',
  'shelf.continueReading': 'Continuer',
  'shelf.readAgain': 'Relire',
  'shelf.remove': 'Retirer',
  'shelf.clearAll': 'Tout effacer',
  'shelf.clearConfirmTitle': 'Effacer tous les articles enregistrés ?',
  'shelf.clearConfirmAction': 'Effacer tout',
  'shelf.clearCancel': 'Annuler',
  'shelf.cleared': 'Bibliothèque vidée',
  'shelf.loading': 'Chargement de votre bibliothèque...',
  'shelf.emptyTitle': 'Votre bibliothèque est vide',
  'shelf.emptyHint': 'Cliquez sur le marque-page d’un article pour le retrouver facilement ici.',
  'shelf.emptyExploreLatest': 'Derniers articles',
  'shelf.emptyBrowseArchives': 'Voir les archives',
  'shelf.noFilterMatches': 'Aucun article dans cette catégorie de lecture',
  'shelf.noSearchResults': 'Aucun article enregistré ne correspond',
  'shelf.resetFilters': 'Tout afficher',
  'shelf.railTitle': 'Bibliothèque',
  'shelf.railEmpty': 'Marquez un article pour garder votre liste de lecture sous la main.',
  'shelf.railOpenShelf': 'Ouvrir',
  'shelf.commandSave': 'Enregistrer cet article dans la bibliothèque',
  'shelf.commandRemove': 'Retirer cet article de la bibliothèque',

  // ── Filtres de collection ───────────────────────────────────
  'browse.filterPlaceholder': 'Filtrer par titre ou étiquette...',
  'browse.sortNewest': 'Plus récents',
  'browse.sortOldest': 'Plus anciens',
  'browse.noMatches': 'Aucun article ne correspond au filtre',
  'browse.resetFilter': 'Réinitialiser',
  'browse.showingCount': '{visible} sur {total}',
};
