// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      // Couleurs de la Spot Palette
      earth: {
        500: '#BE6815', // Orange terreux — rituel, chaleur, racines
        600: '#A35912', // Variante plus foncée
      },
      sand: {
        400: '#DBA883', // Sable chaud — texture, mémoire, tradition
        500: '#C79771',
      },
      parchment: {
        100: '#FFE9CF', // Papier ancien — connaissance, transmission
        200: '#FADBBB',
      },
      forest: {
        500: '#63BAAB', // Vert forêt — nature, guérison, équilibre
        600: '#529D8E',
      },
    },
  },
};
export const plugins = [];