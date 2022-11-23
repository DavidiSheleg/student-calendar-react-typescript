import { FunctionComponent } from "react";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";

type LessonDialogColorsProps = {
    colors: string[],
    selectedColor: string,
    handleSelectedColor: Function
}

export const LessonDialogColors: FunctionComponent<LessonDialogColorsProps> = ({ colors, selectedColor, handleSelectedColor }) => {

    const ColoredBox = styled('div')((props) => ({
        width: 30,
        height: 30,
        borderRadius: 30,
        padding: 2,
        backgroundColor: props.color,
        borderWidth: 2, 
        borderStyle: 'solid',
        borderColor: '#fff',
        cursor: 'pointer'
    }));


    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
                <Typography variant="h6">Lesson Color</Typography>
            </Grid>
            {
                colors.map((item) => (
                    <Grid item xs={1} key={item}>
                        <ColoredBox
                            color={item} sx={selectedColor === item ? {  borderColor: '#000' } : {}}
                            onClick={() => handleSelectedColor(item)}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}