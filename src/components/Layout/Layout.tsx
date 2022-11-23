import { FunctionComponent, useEffect } from 'react';
import Box from "@mui/material/Box";
import GuestLayout from './GuestLayout';
import AccountLayout from './AccountLayout';
import { useLocation, useNavigate } from 'react-router-dom';

type LayoutProps = {
    isGuest: boolean
}

export const Layout: FunctionComponent<LayoutProps> = ({ isGuest }) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate(isGuest ? 'login' : 'app');
        }
    }, [isGuest, location, navigate])


    return (
        <Box>
            {
                isGuest
                    ? <GuestLayout />
                    : <AccountLayout />
            }
        </Box>

    )
};
