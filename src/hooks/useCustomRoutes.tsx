
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import Settings from "../pages/account/Settings";
import { MainPage } from "../pages/account/MainPage";
import { LoginPage } from "../pages/guest/LoginPage";
import { SignupPage } from "../pages/guest/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";

    
export const useCustomRoutes = (isGuest: boolean) => {
    
    const guestRoutes: {}[] = [
        {
            path: "login",
            element: <LoginPage />,
        },
        {
            path: "signup",
            element: <SignupPage />,
        },
    ];

    const accountRoutes: {}[] = [
        {
            path: "app",
            element: <MainPage />
        },
        {
            path: 'settings',
            element: <Settings />
        },
    ];

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout isGuest={isGuest} />,
            errorElement: <NotFoundPage />,
            children: isGuest ? guestRoutes : accountRoutes
        },
    ]);


    return { router }
}



