// src/app/data/mockData.ts
export interface Track {
  id: string;
  title: string;
  origin: string;
  description: string;
  ritualContext: string;
  therapeuticFunction: string;
  img: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

export interface Contact {
  id: string;
  name: string;
  country: string;
  avatar: string;
  lastMessage: string;
  time: string;
  messages: Message[];
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Ravi",
    country: "Inde",
    avatar: "R",
    lastMessage: "J’adore ce mantra que tu as partagé !",
    time: "10:30",
    messages: [
      { id: "m1", text: "Salut Awa ! J’ai écouté ton chant mandingue.", sender: "them", time: "10:25" },
      { id: "m2", text: "Merci Ravi ! Il est utilisé lors des cérémonies d’initiation.", sender: "me", time: "10:27" },
      { id: "m3", text: "J’adore ce mantra que tu as partagé !", sender: "them", time: "10:30" },
    ],
  },
  {
    id: "2",
    name: "Lena",
    country: "Sibérie",
    avatar: "L",
    lastMessage: "Le chant de gorge est fascinant…",
    time: "09:15",
    messages: [
      { id: "m4", text: "Bonjour Awa ! As-tu déjà écouté le chant de gorge touva ?", sender: "them", time: "09:10" },
      { id: "m5", text: "Oui ! Je travaille sur une comparaison avec les chants peuls.", sender: "me", time: "09:12" },
      { id: "m6", text: "Le chant de gorge est fascinant…", sender: "them", time: "09:15" },
    ],
  },
  {
    id: "3",
    name: "Kofi",
    country: "Ghana",
    avatar: "K",
    lastMessage: "Prêt pour notre collaboration ?",
    time: "Hier",
    messages: [
      { id: "m7", text: "Salut Awa ! Je t’envoie un rythme d’Adowa.", sender: "them", time: "18:00" },
      { id: "m8", text: "Waouh, c’est magnifique !", sender: "me", time: "18:05" },
      { id: "m9", text: "Prêt pour notre collaboration ?", sender: "them", time: "18:10" },
    ],
  },
];
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Chant Mandingue",
    origin: "Guinée / Mali",
    description: "Chant traditionnel des griots mandingues, transmis oralement depuis des siècles.",
    ritualContext: "Cérémonie d’initiation",
    therapeuticFunction: "Apaisement spirituel",
    img: "chant-mandingue.jpeg",
  },
  {
    id: "2",
    title: "Mantra Védique",
    origin: "Inde",
    description: "Récitation sacrée issue des textes védiques, utilisée en méditation.",
    ritualContext: "Méditation matinale",
    therapeuticFunction: "Harmonisation mentale",
    img: "chant-vedique.jpeg",
  },
  {
    id: "3",
    title: "Chant de Yodel Suisse",
    origin: "Suisse alémanique",
    description: "Technique vocale alpine utilisée par les bergers pour communiquer.",
    ritualContext: "Appel pastoral",
    therapeuticFunction: "Expression vocale libre",
    img: "chant-yodel.jpeg",
  },
];

export default mockTracks;