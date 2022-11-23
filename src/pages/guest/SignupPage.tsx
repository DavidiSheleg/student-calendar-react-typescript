import { FormEvent, FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Typography, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from 'tss-react/mui';
import { useGenericForm } from '../../hooks/useGenericForm';
import { SignupForm } from '../../components/Signup/SignupForm';
import { useAxios } from '../../hooks/useAxios';
import { updateUser } from '../../app/slices/authSlice';
import { useAppDispatch } from '../../app/hooks';
import { openSnackbar } from '../../app/slices/snackbarSlice';

export const SignupPage: FunctionComponent = () => {

    const controls = [
        {
            key: 'first_name',
            label: 'First Name',
            inputType: 'text' as const,
            gridValues: { xs: 12, sm: 6 }
        },
        {
            key: 'last_name',
            label: 'Last Name',
            inputType: 'text' as const,
            gridValues: { xs: 12, sm: 6 }
        },
        {
            key: 'email',
            label: 'Email Address',
            inputType: 'email' as const,
            gridValues: { xs: 12 }
        },
        {
            key: 'password',
            label: 'Password',
            inputType: 'password' as const,
            gridValues: { xs: 12 }
        }
    ];

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, error, axiosReq } = useAxios('auth/register', 'POST');
    const { inputsValues, onFormChange } = useGenericForm(controls);
    const goToLogin = () => navigate('/login');


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosReq(inputsValues);
    };

    useEffect(() => {
        if (data) {
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
        if (error !== '') {
            dispatch(openSnackbar({
                snackbarMessage: `Register faild: ${error}`,
                snackbarType: 'error'
            }));
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
                Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
                <SignupForm
                    controls={controls}
                    inputsValues={inputsValues}
                    onFormChange={onFormChange}
                    handleSubmit={handleSubmit}
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link onClick={goToLogin} variant="body2" className={cx(classes.pointer)}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

