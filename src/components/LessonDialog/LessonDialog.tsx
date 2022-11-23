import { FunctionComponent, useEffect, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { format } from 'date-fns';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { theme } from '../../theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { LessonDialogColors } from './LessonDialogColors';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LessonForm } from './LessonForm';
import { hoursOptions } from '../../utils/hoursOptions';
import { useAxios } from '../../hooks/useAxios';
import { useGenericForm } from '../../hooks/useGenericForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeLessonDialog } from '../../app/slices/lessonDialogSlice';
import { addLesson, updateLesson } from '../../app/slices/calendarSlice';
import { openSnackbar } from '../../app/slices/snackbarSlice';

export const LessonDialog: FunctionComponent = () => {

  const { isOpen, lesson } = useAppSelector((state) => state.lessonDialog);
  const isCreateForm: boolean = lesson ? false : true;

  const controls = [
    {
      key: 'title',
      label: 'Title',
      inputType: 'text' as const,
      gridValues: { xs: 12 },
      defaultValue: !isCreateForm ? lesson?.title : ''
    },
    {
      key: 'date',
      label: 'Date',
      inputType: 'datetime' as const,
      gridValues: { xs: 12 },
      defaultValue: !isCreateForm ? format(lesson?.start ?? new Date(), 'yyyy-MM-dd').toString() : new Date().toString()
    },
    {
      key: 'start_hour',
      label: 'Start Hour',
      inputType: 'select' as const,
      options: hoursOptions,
      gridValues: { xs: 12, sm: 6 },
      defaultValue: lesson?.start ? format(lesson?.start, 'HH:mm').toString() : hoursOptions[0].value
    },
    {
      key: 'end_hour',
      label: 'End Hour',
      inputType: 'select' as const,
      options: hoursOptions,
      gridValues: { xs: 12, sm: 6 },
      defaultValue: lesson?.end ? format(lesson?.end, 'HH:mm').toString() : hoursOptions[1].value
    },
  ];

  const colors = [
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ];

  const { inputsValues, onFormChange, clearForm, setDefaultValues } = useGenericForm(controls);
  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [formErrors, setFormErrors] = useState<string>('');
  const { data, error, axiosReq } = useAxios(
    isCreateForm ? 'lessons/create' : 'lessons/update',
    isCreateForm ? 'POST' : 'PUT'
  );

  const handleSelectedColor = (color: string) => {
    setSelectedColor(color);
  }

  const closeDialog = () => {
    clearForm();
    setSelectedColor(colors[0]);
    setFormErrors('');
    dispatch(closeLessonDialog());
  }


  const handleSubmit = () => {
    setFormErrors('');
    console.log(inputsValues);
    const { date, start_hour, end_hour, title } = inputsValues;

    if (isEmpty(String(title))) {
      setFormErrors('Title is requerid');
      return;
    }

    if (isEmpty(String(end_hour)) || isEmpty(String(start_hour))) {
      setFormErrors('Hours is requerid');
      return;
    }

    const start = `${format(new Date(`${date}`), "yyyy-MM-dd")} ${start_hour}`;
    const end = `${format(new Date(`${date}`), "yyyy-MM-dd")} ${end_hour}`;

    if (isCreateForm) {
      axiosReq({
        title,
        start,
        end,
        color: selectedColor
      });
    }
    else {
      axiosReq({
        id: lesson?.id,
        title,
        start,
        end,
        color: selectedColor
      });
    }
  };

  useEffect(() => {
    if (data) {
      if (isCreateForm) {
        dispatch(addLesson({
          ...data,
          start: new Date(data.start),
          end: new Date(data.end)
        }));
      }
      else {
        dispatch(updateLesson({
          ...data,
          start: new Date(data.start),
          end: new Date(data.end)
        }));
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
    setSelectedColor(lesson?.color || colors[0]);
  }, [lesson]);


  return (
    <div>
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>{isCreateForm ? 'Create' : 'Update'} Lesson</DialogTitle>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DialogContent>
            <LessonForm
              controls={controls}
              inputsValues={inputsValues}
              onFormChange={onFormChange}
            />
            <LessonDialogColors
              colors={colors}
              selectedColor={selectedColor}
              handleSelectedColor={handleSelectedColor}
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