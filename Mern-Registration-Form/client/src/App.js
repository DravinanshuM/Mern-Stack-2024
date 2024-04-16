import './App.css';

// Routing.
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import Register from './Pages/Register/Register.js';
import Edit from './Pages/Edit/Edit.js';
import Profile from './Pages/Profile/Profile.js';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },{
        path: "/register",
        element: <Register/>
      },{
        path: "/edit/:id",
        element: <Edit />
      },{
        path: "/profile/:id",
        element: <Profile/>
      },{
        path: "/*",
        element: "Page Not Found"
      }
    ]
  }
]);

function App() {
  return (
     <RouterProvider router={router} />
  );
}

export default App;
