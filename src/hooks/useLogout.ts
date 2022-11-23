import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { clearUser } from "../app/slices/authSlice";

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem('user');
        dispatch(clearUser());
        navigate('login');
    }

    return {
        logout
    };
}