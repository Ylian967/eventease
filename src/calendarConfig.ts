import { LocaleConfig } from 'react-native-calendars';
import { colors, fonts } from './theme';

// Noms des mois et des jours en français pour react-native-calendars
LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.',
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

// Couleurs du calendrier, reprises du thème de l'app
export const calendarTheme = {
  calendarBackground: colors.card,
  monthTextColor: colors.title,
  textMonthFontFamily: fonts.display,
  textMonthFontSize: 22,
  textSectionTitleColor: colors.muted,
  textDayHeaderFontFamily: fonts.bodyBold,
  dayTextColor: colors.text,
  textDayFontFamily: fonts.body,
  todayTextColor: colors.success,
  selectedDayBackgroundColor: colors.badge,
  selectedDayTextColor: colors.onBadge,
  arrowColor: colors.title,
  dotColor: colors.success,
  selectedDotColor: colors.highlight,
};
