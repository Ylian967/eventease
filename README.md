# EventEase

Application mobile de l'association EventEase : les membres et bénévoles consultent les événements (conférences, ateliers, sorties), en créent, les modifient, les suppriment et indiquent leur participation.

## Lancer le projet

```bash
npm install
npx expo start
```

Puis scanner le QR code avec Expo Go (Android / iOS), ou appuyer sur `w` pour la version web.

## Fonctionnalités

- Connexion et inscription simplifiées (sans backend, comptes enregistrés sur le téléphone)
- Liste des événements (titre, description, date), triée par date
- Ajout, modification et suppression d'un événement
- Bouton « Je participe » pour marquer un événement comme participé, par membre
- Persistance locale avec AsyncStorage : rien n'est perdu à la fermeture de l'app
- **Bonus calendrier** : onglet Calendrier (react-native-calendars) et choix de la date dans le formulaire
- **Bonus design** : style noir et blanc avec titres « peints » (une couleur par lettre), polices Londrina Solid / Fira Sans / Fira Mono, icônes, bandeau défilant, icône et splash screen
  - pour participer, on **maintient** la touche « Je participe » : elle se remplit d'orange et valide quand elle est pleine
  - animations : entrée des cartes, effet ressort des boutons et des cartes, compteur de participants qui rebondit

## Document technique

1. **Expo + TypeScript** : Expo évite d'installer Android Studio ou Xcode et permet de tester sur téléphone avec Expo Go ; TypeScript signale les erreurs dès l'écriture.
2. **React Navigation** : `RootNavigator` est une pile (native-stack) qui contient les onglets (`AppTabs` : Événements, Calendrier, Profil), puis le détail et le formulaire par-dessus.
3. **Navigation conditionnelle** : si personne n'est connecté, la pile ne contient que Connexion et Inscription ; après la connexion, elle affiche les onglets automatiquement.
4. **Context API** : `AuthContext` partage le membre connecté et `EventContext` partage la liste des événements avec tous les écrans, sans passer de props d'écran en écran.
5. **Persistance** : le dossier `storage/` est le seul à parler à AsyncStorage (clés `users`, `currentUser`, `events`). Chaque modification de la liste est recopiée immédiatement sur le disque.
6. **Un seul formulaire** (`EventFormScreen`) sert à l'ajout et à la modification : sans `id` en paramètre on crée, avec un `id` on modifie.
7. **Participation** : chaque événement garde la liste des emails des participants, donc chaque membre a sa propre participation.
8. **Organisation** : `screens/` (écrans), `components/` (morceaux réutilisables), `context/` (état global), `storage/` (AsyncStorage), `navigation/`, `utils/` et `theme.ts` (couleurs, polices et rayons réunis au même endroit).
9. **Styles et animations** : `StyleSheet` de React Native ; les couleurs sont nommées par rôle (`header`, `action`, `title`…) dans `theme.ts`, donc changer de style revient à changer ce fichier. Les animations utilisent l'API `Animated` de React Native, sans librairie en plus.
10. **Limites du prototype** : les mots de passe sont stockés en clair sur le téléphone, ce qui est acceptable pour une démo sans serveur. Une vraie version passerait par une API avec des tokens JWT.

## Arborescence

```
App.tsx                  polices, splash screen, providers, NavigationContainer
src/
  navigation/            RootNavigator (pile) et AppTabs (onglets)
  screens/               Login, Register, EventList, EventDetail, EventForm, Calendar, Profile
  components/            PillButton, HoldButton, Input, EventCard, DateBadge, EventHero, Marquee, Logo,
                         PageHeader, PaintedTitle, SlideIn, PopIn
  hooks/                 usePressBounce (effet ressort)
  context/               AuthContext, EventContext
  storage/               userStorage, eventStorage (AsyncStorage)
  utils/date.ts          formatage des dates
  calendarConfig.ts      calendrier en français et à nos couleurs
  theme.ts               couleurs, polices, rayons
  types.ts               types User, EventItem et paramètres de navigation
```
