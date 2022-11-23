import { FunctionComponent, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay, isSameWeek } from 'date-fns';
import { useAxios } from '../../hooks/useAxios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LessonType, setCalendarDate, setLessons, setView, updateLesson } from '../../app/slices/calendarSlice';
import { Box, CircularProgress, Typography } from '@mui/material';
import { openSnackbar } from '../../app/slices/snackbarSlice';
import { LessonDetailsDialog } from './LessonDetailsDialog';


type LessonModalType = {
  isOpen: boolean,
  lessonDetails: LessonType | null,
}
const CustomCalendar: FunctionComponent = () => {
  const { date, view, lessons } = useAppSelector((state) => state.calendar);
  const { id: userId } = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [lessonDetailsModal, setLessonDetailsModal] = useState<LessonModalType>({ isOpen: false, lessonDetails: null });

  const { data, loaded, error, axiosReq } = useAxios(`lessons/${userId}/${date}`, 'GET');
  const { error: updateError, axiosReq: updateAxiosReq } = useAxios('lessons/update', 'PUT');

  const onEventResize: withDragAndDropProps['onEventResize'] = (data: any) => {
    const updatedLesson = {
      ...data.event,
      start: data.start,
      end: data.end
    }
    dispatch(updateLesson(updatedLesson));
    updateAxiosReq(updatedLesson);
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data: any) => {
    const updatedLesson = {
      ...data.event,
      start: data.start,
      end: data.end
    }
    dispatch(updateLesson(updatedLesson));
    updateAxiosReq(updatedLesson);
  }

  const onChangeView = (view: 'week' | 'day' | 'month' | 'work_week' | 'agenda') => {
    dispatch(setView(view));
  }

  const onChangeDate = (newDate: any) => {
    const datesInTheSameWeek = isSameWeek(newDate, new Date(date));
    const formatedNewDate = format(newDate, 'yyyy-MM-dd');
    dispatch(setCalendarDate(formatedNewDate));

    if (!datesInTheSameWeek) {
      axiosReq(null, `lessons/${userId}/${formatedNewDate}`);
    }
  }

  const openLessonDetailsDialog = (event: any) => {
    setLessonDetailsModal({
      isOpen: true,
      lessonDetails: event
    });
  }

  const closeLessonDetailsDialog = (event: any) => {
    setLessonDetailsModal({
      isOpen: false,
      lessonDetails: null
    });
  }

  useEffect(() => {
    axiosReq();
  }, []);

  useEffect(() => {
    if (data) {
      const modify = data.map((item: any) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end)
      }))
      dispatch(setLessons(modify));
    }
  }, [data, dispatch]);


  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (updateError !== '') {
      dispatch(openSnackbar({
        snackbarMessage: 'Lesson update faild: something went wrong, try again later',
        snackbarType: 'error'
      }));
      console.log('error', updateError);
    }
  }, [updateError, dispatch])


  if (!loaded)
    return <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>

  if (error)
    <Box sx={{ display: 'flex' }}>
      <Typography variant='h4'>Calendar: Something went wrong</Typography>
    </Box>

  return (
    <>
      {
        lessonDetailsModal.lessonDetails &&
        <LessonDetailsDialog
          isOpen={lessonDetailsModal.isOpen}
          lessonDetails={lessonDetailsModal.lessonDetails}
          closeDialog={closeLessonDetailsDialog}
        />
      }
      <DnDCalendar
        date={date}
        onNavigate={(date) => onChangeDate(date)}
        defaultView='week'
        events={lessons}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onView={(view) => onChangeView(view)}
        onSelectEvent={(event) => openLessonDetailsDialog(event)}
        resizable
        style={{ height: '95vh' }}
        views={{ week: true, day: true }}
        view={view}
        eventPropGetter={(event: Event) => {
          const backgroundColor = event.color ? event.color : 'blue';
          return { style: { backgroundColor, color: '#000' } }
        }}
        min={min}
        max={max}
      />
    </>

  )
}

const min = new Date();
min.setHours(5);
min.setMinutes(0);
const max = new Date();
max.setHours(22);
min.setMinutes(0)

const locales = {
  'en-US': enUS,
}

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar)

export default CustomCalendar