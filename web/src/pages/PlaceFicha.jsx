// pages/PlaceFicha.jsx — /place/<slug>: profile for one biblical place readable in the sky
// (the Places section). Resolves by slug over PLACES, renders the shared <NameFicha>.
import React from 'react';
import { PLACES, BY_SLUG } from '../data/places.js';
import { NameFicha } from '../components/NameFicha.jsx';

function PlaceFicha({ slug }) {
  const figure = BY_SLUG.get(slug) || null;
  return <NameFicha figure={figure} kind="place" backHref="/places" backLabel="back to Places" />;
}

export { PlaceFicha };
export const PLACE_SLUGS = PLACES.map(p => p.slug);