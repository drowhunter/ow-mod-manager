import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.unstable_createRoot(
  document.getElementById('root') as HTMLElement,
).render(<App />);
