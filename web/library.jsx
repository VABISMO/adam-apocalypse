// library.jsx — entry for the Luco Library (a separate static page, like /paper).
// Mounts <LibraryApp/> into #root. No astronomy-engine dependency → the library
// bundle is built WITHOUT the --alias used by app.bundle.js.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { LibraryApp } from './src/library/LibraryApp.jsx';

if(typeof document !== 'undefined'){
  const root = document.getElementById('root');
  createRoot(root).render(<LibraryApp/>);
}

export { LibraryApp };