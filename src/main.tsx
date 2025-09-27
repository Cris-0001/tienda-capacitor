import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/* Core CSS REQUERIDO */
import '@ionic/react/css/core.css';

/* CSS básico */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Componentes específicos */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';

/* Modo Material Design (md) */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Variables de tema */
import './theme/variables.css';

/* Global styles */
import './theme/global.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);