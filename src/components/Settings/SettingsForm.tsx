import React, { FunctionComponent } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { ControlType, InputValuesType } from '../../hooks/useGenericForm';

type SettingsFormProps = {
    controls: ControlType[],
    inputsValues: InputValuesType
    onFormChange: any,
    handleSubmit: any
}

export const SettingsForm: FunctionComponent<SettingsFormProps> = ({ controls, inputsValues, onFormChange, handleSubmit }) => {
    return (
        <Grid container spacing={2} component="form" onSubmit={handleSubmit} sx={{ padding: 5 }}>
            {
                controls.map(({ key, label, inputType, disabled = false }) => (
                    <Grid item key={key} xs={12}>
                        <TextField
                            fullWidth
                            id={key}
                            label={label}
                            value={inputsValues[key]}
                            onChange={(event) => onFormChange(key, event.target.value)}
                            type={inputType}
                            disabled={disabled}
                        />
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                >
                    Update
                </Button>
            </Grid>
        </Grid>
    )
}

