// Couleurs, polices et formes du style « Hold To Play Music »
// Noir et blanc comme une vieille photo, la couleur n'existe que dans les titres peints et la touche orange.
// Les noms décrivent le rôle de la couleur, pas sa teinte : pour changer de style, on ne touche qu'à ce fichier.

export const colors = {
  background: '#ffffff', // fond des écrans
  header: '#111111', // en-têtes, barre d'onglets, écrans de connexion
  headerText: '#ffffff', // texte sur l'en-tête
  headerMuted: '#a7a7a7', // texte secondaire sur l'en-tête
  headerLine: '#333333', // filets sur l'en-tête
  highlight: '#df6c4f', // mots mis en avant sur l'en-tête
  card: '#f2f2f2', // cartes
  cardAlt: '#e6e6e6', // une carte sur deux
  title: '#111111', // grands titres sur fond clair
  text: '#111111', // texte courant
  muted: '#555555', // texte secondaire
  badge: '#111111', // pastille de date, jour choisi du calendrier
  onBadge: '#ffffff',
  action: '#df6c4f', // bouton principal, remplissage de la touche
  onAction: '#111111',
  secondary: '#ffffff', // bouton secondaire
  onSecondary: '#111111',
  success: '#1f6690', // « J'y participe », points du calendrier
  band: '#df6c4f', // bandeau défilant
  onBand: '#111111',
  line: '#111111', // bordure des champs
  danger: '#b3261e',
  dangerLight: '#ff8f7a', // erreurs sur l'en-tête
};

// Les 3 couleurs du lettrage peint, une par lettre
export const paint = ['#4a90c8', '#df6c4f', '#ffffff'];

// Noms des polices chargées dans App.tsx
export const fonts = {
  display: 'LondrinaSolid_900Black',
  logo: 'LondrinaSolid_900Black',
  body: 'FiraSans_500Medium',
  bodyBold: 'FiraSans_700Bold',
  button: 'FiraSans_700Bold', // texte des boutons
  mono: 'FiraMono_400Regular', // petites étiquettes
};

export const radius = {
  small: 4,
  card: 4,
  large: 22,
  pill: 22,
};

// Durée d'appui pour valider la touche « maintenir »
export const holdDuration = 1200;
