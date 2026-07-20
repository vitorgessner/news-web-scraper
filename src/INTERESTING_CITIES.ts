export const INTERESTING_CITIES = [
  "penha",
  "piçarras",
  "navegantes",
  "barra velha",
];

export const citiesRegex = new RegExp(`\\b(${INTERESTING_CITIES.join('|')})\\b`, 'i');