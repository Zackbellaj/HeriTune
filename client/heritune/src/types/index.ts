// src/types/index.ts

export interface User {
  _id: string;
  username: string;
  email: string;
  location?: string;
  bio?: string;
  culturalInterests: string[];
  avatar?: string;
}

export interface Track {
  _id: string;
  title: string;
  artist: User;
  audioUrl: string;
  coverImage?: string;
  origin: string;
  tradition: string;
  ritualContext: string;
  therapeuticFunction: string;
  likes: string[];
  createdAt: string;
}

// NOUVEAU : Type Playlist
export interface Playlist {
  _id: string;
  name: string;
  creator: string; // ID du créateur
  collaborators: string[]; // IDs des collaborateurs
  tracks: Track[];
  isPublic: boolean;
}