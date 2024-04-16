import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// import Toster. it is used for show messages.
import { Toaster } from 'react-hot-toast';

// Import ContextProvider. it is used for show message data created, data deleted, data updated etc.
import ContextProvider from './Components/Context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <ContextProvider>
      <App />
      <Toaster/>
   </ContextProvider>
  </>
);

reportWebVitals();
