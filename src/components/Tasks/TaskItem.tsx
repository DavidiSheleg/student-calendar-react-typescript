import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { makeStyles } from "tss-react/mui";
import { TaskType } from "../../app/slices/tasksSlice";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskItemProps = {
    task: TaskType,
    deleteTaskById: any,
    openUpdateDialog: any,
    handleCheckboxClick: any
}
const TaskItem: FunctionComponent<TaskItemProps> = ({ task, deleteTaskById, openUpdateDialog, handleCheckboxClick }) => {
    const { id, task_name, date, done } = task;

    const useStyles = makeStyles()((theme) => ({
        root: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(4),
            marginLeft: theme.spacing(2),
            borderLeftWidth: 4,
            borderRadius: 5,
            borderLeftStyle: 'solid',
            backgroundColor: '#FAFAFA',
        },
    }));

    const { classes, cx } = useStyles();

    return (
        <Grid container className={cx(classes.root)} sx={{ borderLeftColor: done === 1 ? 'green' : 'red'}}>
            <Grid item xs={2}>
                <Checkbox checked={Boolean(done)}  color={'success'} onChange={(event) => handleCheckboxClick(task, event.target.checked)}/>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="body1">{task_name}</Typography>
                <Typography variant="body2" color={'grey'}>{date?.toString()}</Typography>
            </Grid>
            <Grid item xs={3}>
                <IconButton aria-label="delete" onClick={() => openUpdateDialog(task)}>
                    <ModeIcon />
                </IconButton>
                <IconButton onClick={() => deleteTaskById(id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default TaskItem;
