import React, { FunctionComponent } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { ControlType, InputValuesType } from '../../hooks/useGenericForm';

type LoginFormProps = {
    controls: ControlType[],
    inputsValues: InputValuesType
    onFormChange: any,
    handleSubmit: any
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ controls, inputsValues, onFormChange, handleSubmit }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            {
                controls.map(({ key, label, inputType }) => (
                    <TextField
                        key={key}
                        margin="normal"
                        required
                        fullWidth
                        id={key}
                        label={label}
                        value={inputsValues[key]}
                        type={inputType}
                        onChange={(event) => onFormChange(key, event.target.value)}
                    />
                ))
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
            >
                Sign In
            </Button>
        </Box>
    )
}

