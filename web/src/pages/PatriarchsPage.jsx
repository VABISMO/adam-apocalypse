// pages/PatriarchsPage.jsx — /patriarchs: index of the biblical PERSON names readable in
// the sky on the 12 dated rare conjunctions, grouped by biblical period. Each card links
// to /patriarch/<slug>. Presentational (renders identically server & client).
import React from 'react';
import { PATRIARCHS } from '../data/patriarchs.js';
import { NameIndexPage } from '../components/NameIndexPage.jsx';

function PatriarchsPage({ onOpen }) {
  return <NameIndexPage
    title="Patriarchs/Conquest — names readable in the sky"
    intro={<>The {PATRIARCHS.length} distinct biblical persons whose names the stellar reading surfaces across the 12 dated rare conjunctions (proofs.json). The dominant period is Patriarchs/Conquest, but names from every biblical period appear as the alignment's occupied letters select them. Click a name for its profile — Hebrew, gematria, the stellar letters it needs, and the conjunctions where it reads.</>}
    kind="person"
    items={PATRIARCHS}
    basePath="/patriarch/"
    onOpen={onOpen}
  />;
}

export { PatriarchsPage };