import { makeStyles } from 'tss-react/mui';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

const GuestLayout: FunctionComponent = () => {

    const useStyles = makeStyles()((theme) => ({
        header: {
            marginTop: theme.spacing(2),
        },
        footer: {
            position: 'fixed',
            bottom: theme.spacing(2),
            justifyContent: 'center'
        }
    }));

    const { classes, cx } = useStyles()
    return (
        <Container maxWidth="xl">
            <Box className={cx(classes.header)}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                    Student Calendar
                </Typography>
            </Box>
            <Container maxWidth="xs">
                <CssBaseline />
                <Outlet />
            </Container>
            <Box className={cx(classes.footer)}>
                <Typography variant="body2" color="text.secondary" >
                    {'Copyright © Student Calendar '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Container>
    )


}

export default GuestLayout;
