import { Outlet, useNavigate } from 'react-router-dom';
import { FunctionComponent, ReactElement, useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
    Box,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    CalendarMonth as CalendarMonthIcon,
    Logout as LogoutIcon,
    PlaylistAdd as PlaylistAddIcon,
    Settings as SettingsIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    InsertInvitation as InsertInvitationIcon
} from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import { openLessonDialog } from '../../app/slices/lessonDialogSlice';
import { useLogout } from '../../hooks/useLogout';
import { openTaskDialog } from '../../app/slices/taskDialogSlice';
import { LessonDialog } from '../LessonDialog/LessonDialog';
import { TaskDialog } from '../TaskDialog/TaskDialog';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: 240,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

type ListButtonType = {
    url: string,
    label: string,
    icon: ReactElement,
    onClick: any
}

const AccountLayout: FunctionComponent = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { logout } = useLogout();
    const [drawerIsOopen, setDrawerIsOopen] = useState<boolean>(true);


    const openCreateLesson = () => {
        dispatch(
            openLessonDialog(null)
        );
    };

    const openCreateTask = () => {
        dispatch(
            openTaskDialog(null)
        );
    };

    const toogleDrawer = () => {
        setDrawerIsOopen(!drawerIsOopen);
    };

    const goToApp = () => navigate('app');
    const goToSettings = () => navigate('settings');

    const firstListButtons: ListButtonType[] = [
        {
            url: 'app',
            label: 'App',
            icon: <CalendarMonthIcon />,
            onClick: goToApp
        },
        {
            url: 'createtask',
            label: 'Create Task',
            icon: <PlaylistAddIcon />,
            onClick: openCreateTask
        },
        {
            url: 'addlesson',
            label: 'Add Lesson',
            icon: <InsertInvitationIcon />,
            onClick: openCreateLesson
        }
    ];

    const secondListButtons: ListButtonType[] = [
        {
            url: 'settings',
            label: 'Settings',
            icon: <SettingsIcon />,
            onClick: goToSettings
        },
        {
            url: 'logout',
            label: 'Logout',
            icon: <LogoutIcon />,
            onClick: logout
        }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={drawerIsOopen}>
                <DrawerHeader>
                    <IconButton onClick={toogleDrawer}>
                        {drawerIsOopen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {
                        firstListButtons.map(({ url, label, icon, onClick }) => (
                            <ListItem key={url} disablePadding sx={{ display: 'block' }} onClick={onClick}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: drawerIsOopen ? 'initial' : 'center', px: 2.5 }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: drawerIsOopen ? 3 : 'auto', justifyContent: 'center' }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={label} sx={{ opacity: drawerIsOopen ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        secondListButtons.map(({ url, label, icon, onClick }) => (
                            <ListItem key={url} disablePadding sx={{ display: 'block' }} onClick={onClick}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: drawerIsOopen ? 'initial' : 'center', px: 2.5 }} >
                                    <ListItemIcon sx={{ minWidth: 0, mr: drawerIsOopen ? 3 : 'auto', justifyContent: 'center' }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={label} sx={{ opacity: drawerIsOopen ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            <LessonDialog />
            <TaskDialog />
        </Box>
    );
}

export default AccountLayout;