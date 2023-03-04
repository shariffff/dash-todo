import { createRoot } from 'react-dom/client';
import { App } from './App';

document.getElementById('ui-loading')?.remove();
const root = createRoot(document.getElementById('app'));
root.render(<App />);
