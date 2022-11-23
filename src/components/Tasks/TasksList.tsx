import { Box, CircularProgress, Typography } from '@mui/material';
import { isSameWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openSnackbar } from '../../app/slices/snackbarSlice';
import { openTaskDialog } from '../../app/slices/taskDialogSlice';
import { removeTask, setTasks, TaskType, updateTask } from '../../app/slices/tasksSlice';
import { useAxios } from '../../hooks/useAxios';
import TaskItem from './TaskItem';

const TasksList = () => {
    const dispatch = useAppDispatch();
    const { date } = useAppSelector((state) => state.calendar);
    const { data: tasks } = useAppSelector((state) => state.tasks);
    const { id: userId } = useAppSelector((state) => state.auth.user);
    const [previewsDate, setPreviewsDate] = useState<string>(date);
    const { data, loaded, error, axiosReq } = useAxios(`tasks/${userId}/${date}`, 'GET');
    const {  axiosReq: updateAxiosReq } = useAxios(`tasks/update`, 'PUT');
    const { axiosReq: deleteAxiosReq } = useAxios('', 'DELETE');

    const openUpdateDialog = (task: TaskType) => {
        dispatch(openTaskDialog(task));
    }


    useEffect(() => {
        const datesInTheSameWeek = isSameWeek(new Date(date), new Date(previewsDate));
        if (!datesInTheSameWeek) {
            axiosReq();
        }

        setPreviewsDate(date);
    }, [date, previewsDate, axiosReq])

    useEffect(() => {
        dispatch(setTasks(data));
    }, [data, dispatch]);

    useEffect(() => {
        axiosReq();
    }, []);


    const handleCheckboxClick = (task: TaskType, value: boolean) => {
        updateAxiosReq({ ...task, done: value }).then(() => {
            dispatch(updateTask({
                ...task,
                done: value ? 1 : 0
            }));
        })
        .catch(() => {
            dispatch(openSnackbar({
                snackbarMessage: 'Task update faild: try again later',
                snackbarType: 'error'
            }));
        })
    }

    const deleteTaskById = (id: number) => {
        deleteAxiosReq(null, `tasks/${id}`).then((data) => {
            dispatch(openSnackbar({
                snackbarMessage: 'Task deleted successfully',
                snackbarType: 'success'
            }));
            dispatch(removeTask(id));
        })
            .catch((err) => {
                dispatch(openSnackbar({
                    snackbarMessage: 'Task delete faild: try again later',
                    snackbarType: 'error'
                }));
            })
    }



    if (!loaded)
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>

    if (error)
        <Box sx={{ display: 'flex' }}>
            <Typography variant='h4'>Tasks List: Something went wrong</Typography>
        </Box>


    return (
        <>
            <Typography sx={{ mt: 2, ml: 2 }} variant='h4'>Week Tasks</Typography>
            <Box sx={{ maxHeight: '90vh', overflowY: 'scroll', overflowX: 'hidden' }}>

                {
                    tasks?.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            deleteTaskById={deleteTaskById}
                            openUpdateDialog={openUpdateDialog}
                            handleCheckboxClick={handleCheckboxClick}
                        />
                    ))
                }
            </Box>
        </>

    )
}

export default TasksList;
