import { FunctionComponent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { LessonType, removeLesson } from '../../app/slices/calendarSlice';
import { useDispatch } from 'react-redux';
import { openLessonDialog } from '../../app/slices/lessonDialogSlice';
import { useAxios } from '../../hooks/useAxios';
import { openSnackbar } from '../../app/slices/snackbarSlice';

type LessonDetailsDialogProps = {
    isOpen: boolean,
    lessonDetails: LessonType,
    closeDialog: any,
}
export const LessonDetailsDialog: FunctionComponent<LessonDetailsDialogProps> = (
    {
        isOpen, closeDialog, lessonDetails
    }) => {

    const { id, start, end, title } = lessonDetails;
    const dispatch = useDispatch();
    const { axiosReq: deleteAxiosReq } = useAxios(`lessons/${id}`, 'DELETE');

    const openUpdateDialog = () => {
        dispatch(openLessonDialog(lessonDetails));
        closeDialog();
    }

    const deleteTask = () => {
        deleteAxiosReq().then((data) => {
            dispatch(openSnackbar({
                snackbarMessage: 'Lesson deleted successfully',
                snackbarType: 'success'
            }));
            dispatch(removeLesson(id));
            closeDialog();
        })
            .catch((err) => {
                dispatch(openSnackbar({
                    snackbarMessage: 'Lesson delete faild: try again later',
                    snackbarType: 'error'
                }));
            })
    }


    return (
        <div>
            <Dialog open={isOpen} onClose={closeDialog}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography><b>Start of lesson:</b> {start?.toLocaleString()}</Typography>
                    <Typography><b>End of lesson:</b> {end?.toLocaleString()}</Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={deleteTask} color="error">Delete</Button>
                    <Button onClick={openUpdateDialog}>Update</Button>
                    <Button onClick={closeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}