// Un membre de l'association
export type User = {
  name: string;
  email: string;
  password: string;
};

// Un événement : la date est au format AAAA-MM-JJ
export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: string[]; // emails des membres qui participent
};

// Les écrans de la pile principale et leurs paramètres
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
  EventDetail: { id: string };
  EventForm: { id?: string }; // sans id : ajout, avec id : modification
};
