// app.jsx — entry / index. Imports the App from src/App.jsx and mounts it.
// The app is split across src/ (one file per concern):
//   src/core.jsx   — constants & pure helpers (no React)
//   src/ui.jsx     — shared components (SkyMap, Fig, DateEntry, SubTabs…)
//   src/seo.jsx    — title / meta-description library
//   src/Footer.jsx — site footer (GitHub link)
//   src/App.jsx    — root component (state, SPA routing, tab switching)
//   src/tabs/*.jsx  — one file per tab
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/App.jsx';

if(typeof document!=='undefined'){
  const root = document.getElementById('root');
  createRoot(root).render(<App/>);
}

export { App };