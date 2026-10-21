// Transforme « 2026-10-24 » en « 24 octobre 2026 »
export function formatDate(date: string) {
  // On ajoute l'heure pour éviter un décalage d'un jour dû au fuseau horaire
  return new Date(`${date}T12:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// La date du jour au format AAAA-MM-JJ (celui de react-native-calendars)
export function todayString() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
}
