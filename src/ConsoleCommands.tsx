import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, Color,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {browser} from "webextension-polyfill-ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const boxBGColour: string = "#1f1f1f";
let RegenXValue: number;
function handleTourCommand(command: string) {
    console.log(command);
    browser.tabs.executeScript({
        code: 'window.wrappedJSObject.__debugApi__.navigation.' + command
    }).then(undefined)
}

function regenXChange() {

}

function ConsoleCommands() {


    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Box sx={{ width: 1,  borderRadius:1, border:1 } }>
            <Accordion expanded={expanded === '3DTours'} onChange={handleChange('3DTours')}>
                <AccordionSummary aria-controls="3DTours-content" id="3DTours-header">
                    <Typography fontSize={18} fontWeight={"semi bold"} >3D Tours</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: 'auto',display: 'grid', gap:2}}>
                        <Box>
                            <TextField id="RegenX" onChange={regenXChange} value={RegenXValue} label="X" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <TextField id="RegenY" label="Y" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <Button variant="contained" fullWidth onClick={() =>handleTourCommand("regeneratePath()")}> Regen Route </Button>
                        </Box>
                        <Button variant="contained" onClick={() =>handleTourCommand("drawPath()")}>Draw Route</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("drawEdges()")}>Draw Edges</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("drawNodes()")}>Draw Nodes</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("drawPruned()")}>Draw Pruned</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("drawWidgetBounds()")}>Widget Bounds</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ConsoleCommands;