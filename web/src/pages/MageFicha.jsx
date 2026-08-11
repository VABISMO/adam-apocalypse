// pages/MageFicha.jsx — /mage/<slug>: the detail ficha for one magi figure.
// Resolves the mage by URL slug (over MAGES), pulls its Wikipedia ficha, and renders
// the shared <Ficha> on the magi-lineage axis. Presentational.
import React from 'react';
import { MAGES } from '../data/mages.js';
import { WIKI, slugify } from '../data/wiki.js';
import { Ficha } from '../components/Ficha.jsx';

const BY_SLUG = new Map(MAGES.map((m) => [slugify(m.name), m]));
const AXIS_MIN = Math.min(...MAGES.map((m) => m.y0));
const AXIS_MAX = Math.max(...MAGES.map((m) => m.y1 == null ? m.y0 : m.y1));

function MageFicha({ slug }) {
  const figure = BY_SLUG.get(slug) || null;
  const wiki = figure ? WIKI[figure.name] : null;
  return <Ficha figure={figure} kind="mage" axisMin={AXIS_MIN} axisMax={AXIS_MAX}
    backHref="/mages" backLabel="back to magi" wiki={wiki} />;
}

export { MageFicha };
export const MAGE_SLUGS = [...BY_SLUG.keys()];