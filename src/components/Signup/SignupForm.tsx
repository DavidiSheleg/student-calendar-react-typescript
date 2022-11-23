import React, { FunctionComponent } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { ControlType, InputValuesType } from '../../hooks/useGenericForm';

type SignupFormProps = {
    controls: ControlType[],
    inputsValues: InputValuesType,
    onFormChange: any,
    handleSubmit: any
}

export const SignupForm: FunctionComponent<SignupFormProps> = ({ controls, inputsValues, onFormChange, handleSubmit }) => {
    return (
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            {
                controls.map(({ key, label, gridValues, inputType }) => (
                    <Grid item xs={gridValues?.xs} sm={gridValues?.sm} key={key}>
                        <TextField
                            required
                            fullWidth
                            id={key}
                            label={label}
                            value={inputsValues[key]}
                            onChange={(event) => onFormChange(key, event.target.value)}
                            type={inputType}
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
                    Sign In
                </Button>
            </Grid>
        </Grid>
    )
}

