import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {browser} from "webextension-polyfill-ts";


function DebugCommands() {
    const [regenXValue, setRegenXValue] = useState<number | null>(null);
    const [regenYValue, setRegenYValue] = useState<number | null>(null);
    function handleTourCommand(command: string) {
        console.log(command);
        browser.tabs.executeScript({
            code: 'window.wrappedJSObject.' + command
        }).then(undefined)
    }

    const regenXChange = (e: React.ChangeEvent<HTMLInputElement>) => setRegenXValue(e.target.value === "" ? null : Number(e.target.value));
    const regenYChange = (e: React.ChangeEvent<HTMLInputElement>) => setRegenYValue(e.target.value === "" ? null : Number(e.target.value));

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    function handleRegenRouteButton() {
        if (regenXValue !== null && regenYValue !== null ) {
            handleTourCommand(`__debugApi__.navigation.regeneratePath(${regenXValue},${regenYValue})`);
        } else {
            handleTourCommand(`__debugApi__.navigation.regeneratePath()`)
        }
    }


    return (
        <Box sx={{width:350}}>
            <Accordion sx={{width: 1,border: 1,borderRadius: 1, marginBottom:"5px"}} expanded={expanded === '3DTours'} onChange={handleChange('3DTours')}>
                <AccordionSummary aria-controls="3DTours-content" id="3DTours-header">
                    <Typography fontSize={18} fontWeight={"semi bold"} >3D Tours</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: 'auto',display: 'grid', gap:2}}>
                        <Box>
                            <TextField id="RegenX" onChange={regenXChange} value={regenXValue} label="X" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <TextField id="RegenY" onChange={regenYChange} value={regenYValue} label="Y" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <Button variant="contained" fullWidth onClick={handleRegenRouteButton}> Regen Route </Button>
                        </Box>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.navigation.drawPath()")}>Draw Route</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.navigation.drawEdges()")}>Draw Edges</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.navigation.drawNodes()")}>Draw Nodes</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.navigation.drawPrunedNodes()")}>Draw Pruned</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.navigation.drawWidgetBounds()")}>Widget Bounds</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.clear()")}>Clear All</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: 1,border: 1,borderRadius: 1, marginBottom:"5px"}} expanded={expanded === 'FloorShapes'} onChange={handleChange('FloorShapes')}>
                <AccordionSummary aria-controls="FloorShapes-content" id="FloorShapes-header">
                    <Typography fontSize={18} fontWeight={"semi bold"} >Floor Shapes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: 'auto',display: 'grid', gap:2}}>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.drawFloorInnerFeatures()")}>Draw Floor Inner Features</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.drawFloorInnerShapes()")}>Draw Floor Inner Shapes</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.drawFloorOuterFeatures()")}>Draw Floor Outer Features</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.drawFloorOuterShapes()")}>Draw Floor Outer Shapes</Button>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.clear()")}>Clear All</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default DebugCommands;