import { useState } from "react";

export type OptionType = {
    value: string | number,
    label: string
}

type InputType = 'text' | 'select' | 'checkbox' | 'password' | 'email' | 'datetime';

export type ControlType = {
    key: string,
    label: string,
    inputType: InputType,
    defaultValue?: string | null,
    options?: OptionType[], // In case the input is Select
    gridValues?: { xs?: number, sm?: number },
    disabled?: boolean
}

export type InputValuesType = { [key: string]: string | OptionType };


export const useGenericForm = (controls: ControlType[]) => {

    const inputs: { [key: string]: string } = {};

        controls.forEach(({ key, defaultValue }) => {
            inputs[key] = defaultValue ?? '';
        })

    const [inputsValues, setInputsValues] = useState<InputValuesType>(inputs);

    const onFormChange = (type: string, value: string | OptionType): void => {
        setInputsValues({
            ...inputsValues,
            [type]: value
        });
    }

    const clearForm = () => {
        controls.forEach(({ key }) => {
            inputs[key] = '';
            setInputsValues(inputs);
        })
    }

    const setDefaultValues = () => {
        controls.forEach(({ key, defaultValue }) => {
            inputs[key] = defaultValue || '';
            setInputsValues(inputs);
        })
    }

    return {
        inputsValues,
        onFormChange,
        clearForm,
        setDefaultValues
    }
}



