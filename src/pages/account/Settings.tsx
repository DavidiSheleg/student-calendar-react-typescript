import { Box, CircularProgress, Typography } from '@mui/material';
import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openSnackbar } from '../../app/slices/snackbarSlice';
import { SettingsForm } from '../../components/Settings/SettingsForm';
import { useAxios } from '../../hooks/useAxios';
import { useGenericForm } from '../../hooks/useGenericForm';

const Settings = () => {

    const controls = [
        {
            key: 'first_name',
            label: 'First Name',
            inputType: 'text' as const,
            defaultValue: ''
        },
        {
            key: 'last_name',
            label: 'Last Name',
            inputType: 'text' as const,
            defaultValue: ''
        },
        {
            key: 'email',
            label: 'Email Address',
            inputType: 'email' as const,
            defaultValue: ''
        },
        {
            key: 'password',
            label: 'Password',
            inputType: 'password' as const,
            defaultValue: ''
        },
    ];

    const dispatch = useAppDispatch();
    const { id } = useAppSelector((state) => state.auth.user);
    const { data, loaded ,error, axiosReq } = useAxios(`users/${id}`, 'GET');
    const { data: updateData, error: updateError , axiosReq: updateAxiosReq } = useAxios('users/update', 'PUT');
    const { inputsValues, onFormChange, setDefaultValues } = useGenericForm(controls);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        console.log(inputsValues);
        event.preventDefault();
        updateAxiosReq(inputsValues);
    };

    useEffect(() => {
        axiosReq();
    }, []);

    useEffect(() => {
        if(data) {
            controls[0].defaultValue = data?.first_name || '';
            controls[1].defaultValue = data?.last_name || '';
            controls[2].defaultValue = data?.email || '';
            setDefaultValues();
        }
    }, [data])

    useEffect(() => {
        if (updateData) {
            dispatch(openSnackbar({
                snackbarMessage: `Update succeeded`,
                snackbarType: 'success'
            }));
        }
    }, [updateData]);


    useEffect(() => {
        if (updateError !== '') {
            dispatch(openSnackbar({
                snackbarMessage: `Update faild: ${updateError}`,
                snackbarType: 'error'
            }));
        }
    }, [updateError]);


    if (!loaded)
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>

    if (error)
        <Box sx={{ display: 'flex' }}>
            <Typography variant='h4'>Get user details faild</Typography>
        </Box>


    return (
        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant='h4'>Settings</Typography>
            <SettingsForm
                controls={controls}
                inputsValues={inputsValues}
                onFormChange={onFormChange}
                handleSubmit={handleSubmit}
            />
        </Box>
    )
}

export default Settings;
