import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {browser} from "webextension-polyfill-ts";

let RegenXValue: number;
function handleTourCommand(command: string) {
    console.log(command);
    browser.tabs.executeScript({
        code: 'window.wrappedJSObject.__debugApi__'+command
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
                        <Button variant="contained" onClick={() =>handleTourCommand(".navigation.drawPath()")}>Draw Route</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand(".navigation.drawEdges()")}>Draw Edges</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand(".navigation.drawNodes()")}>Draw Nodes</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand(".navigation.drawPrunedNodes()")}>Draw Pruned</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand(".navigation.drawWidgetBounds()")}>Widget Bounds</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand(".clear()")}>Clear All</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ConsoleCommands;