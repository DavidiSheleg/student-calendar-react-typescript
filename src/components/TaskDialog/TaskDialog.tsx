import { FunctionComponent, useEffect, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { format, isSameWeek } from 'date-fns';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TaskForm } from './TaskForm';
import { useAxios } from '../../hooks/useAxios';
import { useGenericForm } from '../../hooks/useGenericForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openSnackbar } from '../../app/slices/snackbarSlice';
import { closeTaskDialog } from '../../app/slices/taskDialogSlice';
import { addTask, updateTask } from '../../app/slices/tasksSlice';

export const TaskDialog: FunctionComponent = () => {

    const { date } = useAppSelector((state) => state.calendar);
    const { isOpen, task } = useAppSelector((state) => state.taskDialog);
    const isCreateForm = task ? false : true;

    const controls = [
        {
            key: 'task_name',
            label: 'Task Name',
            inputType: 'text' as const,
            defaultValue: isCreateForm ? '' : task?.task_name
        },
        {
            key: 'date',
            label: 'Date',
            inputType: 'datetime' as const,
            defaultValue: isCreateForm ? new Date().toString() : format(new Date(task?.date ? task.date : ''), 'yyyy-MM-dd').toString()
        },
    ];

    const { inputsValues, onFormChange, clearForm, setDefaultValues } = useGenericForm(controls);
    const dispatch = useAppDispatch();
    const [formErrors, setFormErrors] = useState<string>('');
    const { data, error, axiosReq } = useAxios(
        isCreateForm ? 'tasks/create' : 'tasks/update',
        isCreateForm ? 'POST' : 'PUT'
    );

    const closeDialog = () => {
        clearForm();
        setFormErrors('');
        dispatch(closeTaskDialog());
    }


    const handleSubmit = () => {
        setFormErrors('');
        const { task_name, date } = inputsValues;

        if (isEmpty(String(task_name))) {
            setFormErrors('Name is requerid');
            return;
        }

        if (isCreateForm) {
            axiosReq({
                task_name,
                date: format(new Date(`${date}`), "yyyy-MM-dd"),
                done: false
            });
        }
        else {
            axiosReq({
                id: task?.id,
                task_name,
                date: format(new Date(`${date}`), "yyyy-MM-dd"),
                done: Boolean(task?.done)
            });
        }
    };

    useEffect(() => {
        if (data) {
            if (isCreateForm) {
                if (isSameWeek(new Date(data?.date), new Date(date)))
                    dispatch(addTask(data));
            }
            else {
                dispatch(updateTask(data));
            }

            dispatch(openSnackbar({
                snackbarMessage: `${isCreateForm ? 'Creation' : 'Update'} succeeded`,
                snackbarType: 'success'
            }));

            closeDialog();
        }
    }, [data]);

    useEffect(() => {
        if (error !== '') {
            dispatch(openSnackbar({
                snackbarMessage: `${isCreateForm ? 'Creation' : 'Update'} faild: something went wrong, try again later`,
                snackbarType: 'error'
            }));
            console.log('error', error);
            closeDialog();
        }
    }, [error]);


    useEffect(() => {
        setDefaultValues();
    }, [task]);


    return (
        <div>
            <Dialog open={isOpen} onClose={closeDialog}>
                <DialogTitle>{isCreateForm ? 'Create' : 'Update'} Task</DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DialogContent>
                        <TaskForm
                            controls={controls}
                            inputsValues={inputsValues}
                            onFormChange={onFormChange}
                        />
                        <Box sx={{ color: 'red', height: 20, mt: 2 }}>{formErrors !== "" && formErrors}</Box>
                    </DialogContent>
                </LocalizationProvider>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleSubmit}>{isCreateForm ? 'Create' : 'Update'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}