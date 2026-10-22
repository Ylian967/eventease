// Couleurs, polices et formes du style « Mint Street »
// Bleu nuit pour les en-têtes, menthe pour le fond, vert pour les actions.
// Les noms décrivent le rôle de la couleur, pas sa teinte : pour changer de style, on ne touche qu'à ce fichier.

export const colors = {
  background: '#e3f3e3', // fond des écrans
  header: '#15162e', // en-têtes, barre d'onglets, écrans de connexion
  headerText: '#ffffff', // texte sur l'en-tête
  headerMuted: '#b8bad0', // texte secondaire sur l'en-tête
  headerLine: '#34365a', // filets sur l'en-tête
  highlight: '#3ddc84', // mots mis en avant sur l'en-tête
  card: '#ffffff', // cartes
  cardAlt: '#d3ebd4', // une carte sur deux
  title: '#15162e', // grands titres sur fond clair
  text: '#2a2d4a', // texte courant
  muted: '#4f5466', // texte secondaire
  badge: '#15162e', // pastille de date, jour choisi du calendrier
  onBadge: '#ffffff',
  action: '#18823f', // bouton principal
  onAction: '#ffffff',
  secondary: '#ffffff', // bouton secondaire
  onSecondary: '#15162e',
  success: '#0f5f2c', // « J'y participe », points du calendrier
  band: '#22a650', // bandeau défilant
  onBand: '#ffffff',
  line: '#c3dcc5', // bordure des champs
  danger: '#b3261e',
  dangerLight: '#ffb4ab', // erreurs sur l'en-tête
};

// Noms des polices chargées dans App.tsx
export const fonts = {
  display: 'Anton_400Regular',
  logo: 'DMSerifDisplay_400Regular',
  body: 'DMSans_400Regular',
  bodyBold: 'DMSans_700Bold',
  button: 'DMSans_700Bold', // texte des boutons
};

export const radius = {
  small: 8,
  card: 16,
  large: 28,
  pill: 999,
};
