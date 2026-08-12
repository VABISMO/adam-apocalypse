// pages/ProphetFicha.jsx — /prophet/<slug>: the detail profile for one prophet figure.
// Resolves the prophet by URL slug (over PROPHETS), pulls its Wikipedia profile, and
// renders the shared <Ficha> on the prophet-lineage axis. Presentational.
import React from 'react';
import { PROPHETS } from '../data/prophets.js';
import { WIKI, slugify } from '../data/wiki.js';
import { Ficha } from '../components/Ficha.jsx';

const BY_SLUG = new Map(PROPHETS.map((p) => [slugify(p.name), p]));
const AXIS_MIN = Math.min(...PROPHETS.map((p) => p.y0));
const AXIS_MAX = Math.max(...PROPHETS.map((p) => p.y1 == null ? p.y0 : p.y1));

function ProphetFicha({ slug }) {
  const figure = BY_SLUG.get(slug) || null;
  const wiki = figure ? WIKI[figure.name] : null;
  return <Ficha figure={figure} kind="prophet" axisMin={AXIS_MIN} axisMax={AXIS_MAX}
    backHref="/prophets" backLabel="back to prophets" wiki={wiki} />;
}

export { ProphetFicha };
export const PROPHET_SLUGS = [...BY_SLUG.keys()];