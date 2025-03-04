# Téléchargement des données de climatologie du portail des APIs Météo-France

## Outils

- Packages manager : pnpm (et non npm)
- Formatting : Prettier
- Linter : ESLint
- Tests : Vitest
- ORM : Prisma
- Git Hooks : Husky && lint-staged

## Workflow de développement

1. Lancer `pnpm run prepare` pour installer Husky
2. Démarrer Docker sur la machine
3. Démarrer le container avec `pnpm run start-docker`
4. Préparer la base de données avec `pnpm run migrate:dev`
5. À chaque commit, tous les fichiers seront formatés et lintés automatiquement, et tous les tests seront exécutés. Le commit sera annulé si une erreur survient.

À chaque modification du schéma de la base de données (prisma/schema.prisma), il faut exécuter `pnpm run migrate:dev` pour mettre à jour la base de données.

Regarder le package.json pour la liste complète des commandes disponibles, notamment pour les tests, ou l'exécution des différents scripts.
