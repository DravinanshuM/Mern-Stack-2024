import { createBrowserRouter } from 'react-router-dom';
import App from '../App.js';

// Import Pages.
import { Home } from '../pages/index.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            }
        ]
    }
]);

export default router;