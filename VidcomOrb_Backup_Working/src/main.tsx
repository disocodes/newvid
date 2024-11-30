import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { VisionProvider } from './context/VisionContext';
import { ModuleProvider } from './context/ModuleContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <VisionProvider>
          <ModuleProvider>
            <App />
          </ModuleProvider>
        </VisionProvider>
      </DndProvider>
    </BrowserRouter>
  </StrictMode>
);