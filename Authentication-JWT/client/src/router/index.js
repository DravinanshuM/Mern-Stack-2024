import { createBrowserRouter } from 'react-router-dom';
import App from '../App.js';
// Import Pages.
import { Dashboard, Error, ForgotPassword, Home, Login, NotPage, Register, ResetPassword } from '../pages/index.js'

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
                path: "login",
                element: <Login/>
            },
            {
                path: "registration",
                element: <Register/>
            },
            {
                path: "dash",
                element:  <Dashboard/>
            },
            {
                path: "resetpassword",
                element: <ResetPassword/>
            },
            {
                path: "forgotpassword/:id/:token",
                element: <ForgotPassword/>
            },
            {
                path: "error",
                element: <Error/>
            },
            {
                path: "*",
                element: <NotPage/>
            }
        ]
    }
]);

export default router;