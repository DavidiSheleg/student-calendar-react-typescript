import { Grid } from '@mui/material';
import { FunctionComponent, useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import CustomCalendar from '../../components/Calendar/CustomCalendar';
import TasksList from '../../components/Tasks/TasksList';

export const MainPage: FunctionComponent = () => {
    const { date, view, lessons } = useAppSelector((state) => state.calendar);
    const { data: tasks } = useAppSelector((state) => state.tasks);
    return (
        <Grid container spacing={4}>
            <Grid item sm={5} xs={12}>
                {
                    useMemo(() => (
                        <TasksList />
                    ), [date, tasks])
                }
            </Grid>
            <Grid item sm={7} xs={12}>
                {
                    useMemo(() => (
                        <CustomCalendar />
                    ), [date, view, lessons])
                }
            </Grid>
        </Grid>
    )
}


