// pages/PatriarchFicha.jsx — /patriarch/<slug>: ficha for one biblical person readable
// in the sky (the Patriarchs/Conquest section). Resolves the entry by slug over
// PATRIARCHS, renders the shared <NameFicha>. Presentational.
import React from 'react';
import { PATRIARCHS, BY_SLUG } from '../data/patriarchs.js';
import { NameFicha } from '../components/NameFicha.jsx';

function PatriarchFicha({ slug }) {
  const figure = BY_SLUG.get(slug) || null;
  return <NameFicha figure={figure} kind="person" backHref="/patriarchs" backLabel="back to Patriarchs/Conquest" />;
}

export { PatriarchFicha };
export const PATRIARCH_SLUGS = PATRIARCHS.map(p => p.slug);