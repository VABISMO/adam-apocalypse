// test-entry.jsx — re-exports App + the dedicated page components for the jsdom test.
// App.jsx itself has NO mount side-effect (that lives in app.jsx), so importing App is safe.
export { App } from './src/App.jsx';
export { ProphetsPage } from './src/pages/ProphetsPage.jsx';
export { MagesPage } from './src/pages/MagesPage.jsx';
export { AlignmentFicha } from './src/pages/AlignmentFicha.jsx';
export { ProphetFicha } from './src/pages/ProphetFicha.jsx';
export { MageFicha } from './src/pages/MageFicha.jsx';
export { PatriarchFicha } from './src/pages/PatriarchFicha.jsx';
export { PlaceFicha } from './src/pages/PlaceFicha.jsx';
export { PatriarchsPage } from './src/pages/PatriarchsPage.jsx';
export { PlacesPage } from './src/pages/PlacesPage.jsx';
export { Landing } from './src/pages/Landing.jsx';
export { About } from './src/pages/About.jsx';
export { WarningModal } from './src/components/WarningModal.jsx';
export { LibraryApp } from './src/library/LibraryApp.jsx';