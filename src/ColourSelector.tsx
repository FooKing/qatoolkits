import {ColorResult, SliderPicker} from "@hello-pangea/color-picker";
import {Box, Button} from "@mui/material";
import React from "react";

const colorPickerChange = (color: ColorResult) => {
    navigator.clipboard.writeText(color.hex)
};
const randomColourClicked = () =>{
    let randomColour = Math.floor(Math.random() * 16777216).toString(16);
    navigator.clipboard.writeText('#000000'.slice(0, -randomColour.length) + randomColour)
}

function ColourSelector(): JSX.Element {
    return (
        <div>
            <SliderPicker onChangeComplete={colorPickerChange}></SliderPicker>
            <Box sx={{ m: '2rem' }} />
            <Button variant="contained" onClick={randomColourClicked} >Random Colour</Button>
        </div>
    );
}
export default ColourSelector;