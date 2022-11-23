import { FormEvent, FunctionComponent, useEffect } from 'react';
import {
    Avatar,
    Box,
    Typography,
    Grid,
    Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { updateUser } from '../../app/slices/authSlice';
import { useGenericForm } from '../../hooks/useGenericForm';
import { LoginForm } from '../../components/Login/LoginForm';
import { useAppDispatch } from '../../app/hooks';
import { useAxios } from '../../hooks/useAxios';
import { openSnackbar } from '../../app/slices/snackbarSlice';


export const LoginPage: FunctionComponent = () => {

    const controls = [
        {
            key: 'email',
            label: 'Email Address',
            inputType: 'text' as const,
        },
        {
            key: 'password',
            label: 'Password',
            inputType: 'password' as const,
        }
    ];

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { inputsValues, onFormChange } = useGenericForm(controls);
    const { data, error, axiosReq } = useAxios('auth/login', 'POST');

    const goToSignup = () => navigate('/signup');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosReq(inputsValues);
    };

    useEffect(() => {
        if(data) {
            const { id, access_token } = data;
            const userToLS = JSON.stringify({ id, access_token });
            localStorage.setItem('user', userToLS);
            dispatch(updateUser({
                user: {
                    id,
                    access_token
                }
            }));
            navigate('/app');
        }
    }, [data, dispatch, navigate]);

    useEffect(() => {
        if(error !== '') {
            dispatch(openSnackbar({
                snackbarMessage: 'Login faild: email or password incorrect',
                snackbarType: 'error'
            }));
            console.log('error', error);
        }
    }, [dispatch, error]);

    const useStyles = makeStyles()((theme) => ({
        root: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        pointer: {
            cursor: 'pointer'
        },
        avatar: {
            m: 1,
            backgroundColor: theme.palette.secondary.main
        }
    }));

    const { classes, cx } = useStyles();

    return (
        <Box className={cx(classes.root)}>
            <Avatar className={cx(classes.avatar)}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
                <LoginForm
                    controls={controls}
                    inputsValues={inputsValues}
                    onFormChange={onFormChange}
                    handleSubmit={handleSubmit}
                />
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link variant="body2" onClick={goToSignup} className={cx(classes.pointer)}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

