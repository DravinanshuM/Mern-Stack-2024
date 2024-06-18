import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Import Router.
import { RouterProvider } from 'react-router-dom';
import router from './router/index.js';

// Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// react Tostify.
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Context.
import ContextAPI from './components/ContextAPI.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextAPI>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  </ContextAPI>
);
reportWebVitals();