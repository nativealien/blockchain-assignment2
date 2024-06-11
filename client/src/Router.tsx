import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children : [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            }
        ]

    }
])