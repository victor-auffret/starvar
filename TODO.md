# ✅ TODO pour la lib `starvar`

## Code & Structure
- [x] Centralisation dans `starvar.ts`
- [ ] Nettoyage des noms internes (éviter collisions, noms explicites)
- [ ] Ajout de `export type` pour les types utiles (`Pass`, `IStarVar`, etc.)
- [ ] Assurer que les types publics sont bien alignés avec l’usage (garder l’auto-complétion forte sur `VarName`)
- [ ] Ajouter une section **"computed"** ou la préparer (même vide/commentée pour rappel)

## Tests automatisés (Vitest)
- [x] Tests unitaires simples (`defineStarVar`, `canWrite`, etc.)
- [ ] Tests sur `StarVarRegistry` (enregistrement, accès, autorisation)
- [ ] Tests d'erreurs (`ALREADY_DEFINED`, cas limites)
- [ ] Refacto avec table de test / config loop
- [ ] Couverture minimale acceptable (80%+ des lignes)

## Utilisabilité
- [ ] Ajouter un helper `makeStarVarConfig` ou autre pour éviter d’exposer directement les instances
- [ ] Ajouter un helper `makeStarVarRegistry` avec auto-complétion sur `.get` et `.getAllByPass`
- [ ] Ajouter une fonction `resetRegistry()` (utile pour tests/unitaires ou sandbox)

## Réactivité (future roadmap)
- [ ] Bloc `// REACTIVITY TODO` dans le fichier
- [ ] Ajout d’un `onChange(listener)` ou équivalent (même vide ou à throw)

## README & documentation
- [x] README de base existant
- [ ] Ajouter un exemple “réaliste” (ex : deux variables, accès avec pass)
- [ ] Ajouter la section `API` avec tous les helpers exportés
- [ ] Ajouter un schéma ou un diagramme si besoin

## Packaging / npm
- [x] Avoir un `index.ts` propre qui expose l’API
- [ ] Ajouter un `package.json` prêt pour npm (avec `exports`, `types`, `main`, `module`, `keywords`)
- [ ] Ajouter un `tsconfig.build.json` si nécessaire
- [ ] Ajouter les types à `typesVersions` si besoin
- [ ] Ajouter `.npmignore` pour éviter de publier les tests/dev
- [ ] Ajouter une license (`MIT` par défaut ?)

## Qualité code / tooling
- [ ] ESLint + Prettier (convention stricte)
- [ ] Git hook (test ou lint auto avant commit)
- [ ] Script `build`, `test`, `lint` dans `package.json`
- [ ] Badge de test dans le README