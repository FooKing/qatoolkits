import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {browser} from "webextension-polyfill-ts";


function DebugCommands() {
    const [regenXValue, setRegenXValue] = useState<number | null>(null);
    const [regenYValue, setRegenYValue] = useState<number | null>(null);
    const [node1Value, setNode1Value] = useState<number | null>(null);
    const [node2Value, setNode2Value] = useState<number | null>(null);

    const regenXChange = (e: React.ChangeEvent<HTMLInputElement>) => setRegenXValue(e.target.value === "" ? null : Number(e.target.value));
    const regenYChange = (e: React.ChangeEvent<HTMLInputElement>) => setRegenYValue(e.target.value === "" ? null : Number(e.target.value));
    const node1Change = (e: React.ChangeEvent<HTMLInputElement>) => setNode1Value(e.target.value === "" ? null : Number(e.target.value));
    const node2Change = (e: React.ChangeEvent<HTMLInputElement>) => setNode2Value(e.target.value === "" ? null : Number(e.target.value));

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    function handleTourCommand(command: string) {
        console.log(command);
        browser.tabs.executeScript({
            code: 'window.wrappedJSObject.' + command
        }).then(undefined)
    }

    function handleRegenRouteButton() {
        if (regenXValue !== null && regenYValue !== null ) {
            handleTourCommand(`__debugApi__.navigation.regeneratePath(${regenXValue},${regenYValue})`);
        } else {
            handleTourCommand(`__debugApi__.navigation.regeneratePath()`)
        }
    }
    function handleDrawEdgeButton() {
        if (node1Value !== null && node2Value !== null ) {
            handleTourCommand(`__debugApi__.navigation.drawEdges(${node1Value},${node2Value})`);
        } else {
            handleTourCommand(`__debugApi__.navigation.drawEdges()`)
        }
    }


    return (
        <Box sx={{width:350 , display: 'grid', gap:1}}>
            <Accordion expanded={expanded === '3DTours'} onChange={handleChange('3DTours')}>
                <AccordionSummary aria-controls="3DTours-content" id="3DTours-header">
                    <Typography fontSize={18} fontWeight={"semi bold"} >3D Tours</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: 'auto',display: 'grid', gap:2}}>
                        <Box>
                            <TextField id="RegenX" onChange={regenXChange} value={regenXValue} label="X" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <TextField id="RegenY" onChange={regenYChange} value={regenYValue} label="Y" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <Button variant="contained" title="use X and Y to define start point or leave blank to use start point on plan" fullWidth onClick={handleRegenRouteButton}> Regenerate Route </Button>
                        </Box>
                        <Button variant="contained" title="Draws tour route onto canvas if route has been generated" onClick={() =>handleTourCommand("__debugApi__.navigation.drawPath()")}>Draw Route</Button>
                        <Box>
                            <TextField id="Node1" onChange={node1Change} value={node1Value} label="1st" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <TextField id="Node2" onChange={node2Change} value={node2Value} label="2nd" type="number" variant="outlined" size="small" sx={{ width: 80}}></TextField>
                            <Button fullWidth={true} variant="contained" title="draws lines between node numbers or between all nodes if empty" onClick={() =>handleDrawEdgeButton()}>Draw Edges</Button>
                        </Box>
                        <Button variant="contained" title="Draws nodes onto canvas (excludes pruned)" onClick={() =>handleTourCommand("__debugApi__.navigation.drawNodes()")}>Draw Nodes</Button>
                        <Button variant="contained" title="Draws prunded nodes only onto canvas" onClick={() =>handleTourCommand("__debugApi__.navigation.drawPrunedNodes()")}>Draw Pruned</Button>
                        <Button variant="contained" title="Draws all widget boundaries onto canvas" onClick={() =>handleTourCommand("__debugApi__.navigation.drawWidgetBounds()")}>Widget Bounds</Button>
                        <Button variant="contained" title="Clear all drawn items on the canvas" onClick={() =>handleTourCommand("__debugApi__.clear()")}>Clear All</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion  expanded={expanded === 'FloorShapes'} onChange={handleChange('FloorShapes')}>
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
            <Accordion  expanded={expanded === 'AutoLayout'} onChange={handleChange('AutoLayout')}>
                <AccordionSummary aria-controls="AutoLayout-content" id="AutoLayout-header">
                    <Typography fontSize={18} fontWeight={"semi bold"} >Auto Layout</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: 'auto',display: 'grid', gap:2}}>
                        <Button variant="contained" onClick={() =>handleTourCommand("__debugApi__.drawFloorInnerFeatures()")}>Draw Floor Inner Features</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default DebugCommands;