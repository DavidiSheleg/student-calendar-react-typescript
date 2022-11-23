import { FunctionComponent } from 'react';
import { ControlType, InputValuesType, OptionType } from '../../hooks/useGenericForm';
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

type LessonFormProps = {
    controls: ControlType[],
    inputsValues: InputValuesType,
    onFormChange: any
}

export const LessonForm: FunctionComponent<LessonFormProps> = ({ controls, inputsValues, onFormChange }) => {

    return (
        <Grid container spacing={2}>
            {
                controls.map(({ key, label, inputType, gridValues, options = null }) => {
                    if (inputType === 'datetime')
                        return <Grid item xs={gridValues?.xs} sm={gridValues?.sm} key={key}>
                            <DesktopDatePicker
                                label={label}
                                inputFormat="yyyy-MM-dd"
                                value={inputsValues[key]}
                                onChange={(date: any) => onFormChange(key, date)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Grid>

                    if (inputType === 'select')
                        return <Grid item xs={gridValues?.xs} sm={gridValues?.sm} key={key}>
                            <FormControl fullWidth>
                                <InputLabel id={key}>{label}</InputLabel>
                                <Select
                                    required
                                    labelId={key}
                                    value={inputsValues[key]}
                                    label={label}
                                    onChange={(event) => onFormChange(key, event.target.value)}
                                >
                                    {
                                        options?.map((option: OptionType) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    return <Grid item xs={gridValues?.xs} sm={gridValues?.sm} key={key}>
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