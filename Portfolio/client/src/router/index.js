import { createBrowserRouter } from "react-router-dom";
import App from '../App.js';

import { About, Contact, Error, Home,} from '../pages/index.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "*",
                element: <Error/>
            }
        ]
    }
]);

export default router;