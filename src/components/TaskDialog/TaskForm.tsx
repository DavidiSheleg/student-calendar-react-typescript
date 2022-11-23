import { FunctionComponent } from 'react';
import { ControlType, InputValuesType } from '../../hooks/useGenericForm';
import { TextField, Grid } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

type TaskFormProps = {
    controls: ControlType[],
    inputsValues: InputValuesType,
    onFormChange: any
}

export const TaskForm: FunctionComponent<TaskFormProps> = ({ controls, inputsValues, onFormChange }) => {
    return (
        <Grid container spacing={2}>
            {
                controls.map(({ key, label, inputType }) => {
                    if (inputType === 'datetime')
                        return <Grid item key={key} xs={12}>
                            <DesktopDatePicker
                                label={label}
                                inputFormat="yyyy-MM-dd"
                                value={inputsValues[key]}
                                onChange={(date: any) => onFormChange(key, date)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Grid>

                    return <Grid item key={key} xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={key}
                            label={label}
                            value={inputsValues[key]}
                            type={inputType}
                            onChange={(event) => onFormChange(key, event.target.value)}
                        />
                    </Grid>
                })
            }
        </Grid>
    );
}