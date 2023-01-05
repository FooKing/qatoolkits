
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, FormControl, InputLabel, MenuItem, Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {browser} from "webextension-polyfill-ts";


function SeleniumIntergration(): JSX.Element {

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const projectArray = Array(9).fill( 9).map((_, i) => {
        return {value: `project${i}`, name: `Project ${i}`}
    })
    //Arrays
    const jenkinsSeleniumArray = [
        {name: 'Alerts', value:'alerts'},
        {name: 'Auto Planning Bespoke Worktops', value:'autoPlanningBespokeWorktops'},
        {name: 'Auto Planning Specialist Worktops', value:'autoPlanningSpecialistWorktops'},
        {name: 'Auto Planning Worktops', value:'autoPlanningWorktops'},
        {name: 'Basket', value:'basket'},
        {name: 'Crit Frontend Smoke', value:'criticalFrontendSmoke'},
        {name: 'Crit Tests', value:'criticalTests'},
        {name: 'Cooks Pantry', value:'cooksPantry'},
        {name: 'CPP', value:'cpp'},
        {name: 'Custom', value:'customTest'},
        {name: 'Decor', value:'decors'},
        {name: 'Fillers', value:'fillers'},
        {name: 'Kitchen Layout', value:'kitchenLayout'},
        ];
    const regionArray = [
        {name: 'UK', value:'com', build:'build-gb'},
        {name: 'US', value:'us', build:'build-us'},
    ]

    const [jenkinsSuite, setJenkinsSuite] = useState(jenkinsSeleniumArray[0].value);
    const handleSeleniumTestChange = (e:SelectChangeEvent) => setJenkinsSuite(e.target.value);

    const [projectSelect, setProjectSelect] = useState(projectArray[0].value);
    const handleProjectChange= (e:SelectChangeEvent) => setProjectSelect(e.target.value);

    const [regionSelect, setRegionSelect] = useState(regionArray[0].build);
    const handleRegionChange= (e:SelectChangeEvent) => setRegionSelect(e.target.value);


    // async function selSuiteGoButton() {
    //     let suiteUrl = `https://jenkins.wrenkitchens.${regionSelect}/job/selenium-end-to-end-tests/job/build-gb/job/${projectSelect}/build?delay=0sec`.replace(/\s+/g, '');
    //     console.log(suiteUrl);
    //     let newWindow = window.open(suiteUrl);
    //     if (newWindow) {
    //         console.log('New window request')
    //         newWindow.onload = function() {
    //             console.log('New window has finished loading');
    //         }
    //     }
    // }
function onCreated(tab:any){
    console.log(`Created new tab: ${tab.id}`);
    let newValue = jenkinsSuite;
    let script = `
    let selectElement = document.querySelector('select[name="value"]');
    if (selectElement) {
      selectElement.value = '${newValue}';
    }
  `;
    browser.tabs.executeScript({
        code: script
    });
}
    function onError(error: Error){
        console.log(`Created new tab: ${error}`);
    }
    function selSuiteGoButton() {
        let suiteUrl = `https://jenkins.wrenkitchens.com/job/selenium-end-to-end-tests/job/${regionSelect}/job/${projectSelect}/build?delay=0sec`;
        let newTab = browser.tabs.create({url:suiteUrl});
        newTab.then(onCreated, onError);
    };
    function selSuiteReportingGoButton() {
        let suiteUrl = `http://planner-tools.wrenkitchens.com:8080`;
        let newTab = browser.tabs.create({url:suiteUrl});
    };




     function debugMessage()
    {
        console.log("Does this do anything different?s")
    }


    return (
        <Box sx={{width:350 , display: 'grid', gap:1, border:1, borderRadius:1, padding:"10px"}}>
            <Accordion expanded={expanded === 'jenkinsSuites'} onChange={handleChange('jenkinsSuites')}>
                <AccordionSummary aria-controls="jenkinsSuites-content" id="jenkinsSuites-header">
                    <Typography fontSize={18} fontWeight={"semi bold"} >Jenkins Suites</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <FormControl sx={{width:'60%', m:1}} variant="standard">
                        <InputLabel>Suite</InputLabel>
                    <Select size="small" id="jenkinsSelect" defaultValue={jenkinsSuite} onChange={(e: SelectChangeEvent) => handleSeleniumTestChange(e)}
                            MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}>
                        {jenkinsSeleniumArray.map((item, index) => {
                            return <MenuItem key={index} value={item.value}> {item.name}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                    <FormControl sx={{width:'60%', m:1}} variant="standard">
                        <InputLabel>Project</InputLabel>
                    <Select size="small" id="projectSelect" defaultValue={projectSelect} onChange={(e: SelectChangeEvent) => handleProjectChange(e)}
                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                        {projectArray.map((item, index) => {
                            return <MenuItem key={index} value={item.value}> {item.name}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                    <FormControl sx={{width:'60%', m:1}} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="projectSelect" defaultValue={regionSelect} onChange={(e: SelectChangeEvent) => handleRegionChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map((item, index) => {
                                return <MenuItem key={index} value={item.build}> {item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Box  sx={{display: 'flex', justifyContent: 'right', paddingTop:"auto", gap:1}}>
                        <Button  onClick={selSuiteGoButton} variant="contained" > Go </Button>
                        <Button  onClick={selSuiteReportingGoButton} variant="contained" > Test Reports </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

        </Box>
    );
}
export default SeleniumIntergration;