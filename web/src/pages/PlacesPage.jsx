// pages/PlacesPage.jsx — /places: index of the biblical PLACE names readable in the sky
// on the 12 dated rare conjunctions, grouped by biblical period. Each row links to
// /place/<slug>. Presentational (renders identically server & client).
import React from 'react';
import { PLACES } from '../data/places.js';
import { NameIndexPage } from '../components/NameIndexPage.jsx';

function PlacesPage() {
  return <NameIndexPage
    title="Places — biblical toponyms readable in the sky"
    intro={<>The {PLACES.length} distinct biblical places (toponyms) the stellar reading surfaces across the 12 dated rare conjunctions (proofs.json). A place appears when the alignment's occupied letters spell its consonants. Click a place for its ficha — Hebrew, gematria, the stellar letters it needs, and the conjunctions where it reads.</>}
    kind="place"
    items={PLACES}
    basePath="/place/"
  />;
}

export { PlacesPage };