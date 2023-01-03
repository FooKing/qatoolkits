import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import React, {ChangeEvent, useState} from "react";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

//User feedback timer vars
const timerDefault = 3;
let timerCount = timerDefault;
let feedbackLoopRunning = false;
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function populateTabs(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function Bolt() {
    //setup arrays first, then they can be used for initial values.
    const environmentArray = Array(9).fill( 9).map((_, i) => {
        return {Code: `project${i}.`, Name: `Project ${i}`, Jenkins: `project${i}`}
    })
    // Append Live into the array at the beginning.
    environmentArray.unshift({Code: ' ', Name: "Live", Jenkins: "master"})

    const regionArray = [
        {Code: 'com', Name: "UK", Jenkins: 'build-gb'},
        {Code: "us", Name: "US", Jenkins: 'build-us'}
    ];

    const jenkinsJobsArray = [
        {Job: 'planner3d-gameci-native', Name: "Planner3D Mac", Modfier:' '},
        {Job: "planner3d-gameci-native-windows", Name: "Planner3D Win", Modfier:' '},
        {Job: "planner3d-assets-gameci", Name: "Planner3D Assets", Modfier:' '},
        {Job: "planner3d-light-atlasser-vr2", Name: "Planner3D Light Atlasser", Modfier:' '},
        {Job: "wrender-gameci-test", Name: "Planner3D HQ", Modfier:' '},
        {Job: "selenium-end-to-end-tests", Name: "Selenium Tests", Modfier:'build?delay=0sec'},
        {Job: "planner2d", Name: "Planner2D", Modfier:' '},
        {Job: "frontend", Name: "Frontend", Modfier:' '},
        {Job: "feeder", Name: "Feeder", Modfier:' '},
    ];
//https://jenkins.wrenkitchens.com/job/selenium-end-to-end-tests/job/build-gb/job/project0/build?delay=0sec

    const rundeckJobsArray =[
        {JobUK:'f043b6c7-fe91-48c9-93fe-76d9fefbf32e', JobUS: '4903331f-02aa-4272-930e-6a3ba3495b87', Name:'Clear Redis' },
        {JobUK:'1904f5bc-d485-419f-ba4e-a87d0b752c68', JobUS: '5fd464e6-bd70-4130-9fbf-a643d1376379', Name:'Refresh Elastic' }
    ];
    const [boltFeedback, setBoltFeedback] = useState('');
    const [value, setValue] = React.useState(0);
    const [frontendEnvironment, setFrontendEnvironment] = useState(environmentArray[0].Code);
    const [frontendRegion, setFrontendRegion] = useState(regionArray[0].Code);
    const [jenkinsEnvironment, setJenkinsEnvironment] = useState(environmentArray[0].Jenkins);
    const [jenkinsRegion, setJenkinsRegion] = useState(regionArray[0].Jenkins);
    const [jenkinsJob, setJenkinsJob] = useState(jenkinsJobsArray[0].Job);
    const [jenkinsModifier, setJenkinsModifier] = useState(jenkinsJobsArray[0].Modfier);
    const handleFrontendEnvironmentChange = (e:SelectChangeEvent) => setFrontendEnvironment(e.target.value);
    const handleFrontendRegionChange = (e:SelectChangeEvent) => setFrontendRegion(e.target.value);
    const handleJenkinsEnvironmentChange = (e:SelectChangeEvent) => setJenkinsEnvironment(e.target.value);
    const handleJenkinsRegionChange = (e:SelectChangeEvent) => setJenkinsRegion(e.target.value);
    const handleJenkinsJobChange = (e: SelectChangeEvent) => {
        setJenkinsJob(e.target.value);
        const Jobindex = jenkinsJobsArray.findIndex(item => item.Job === e.target.value);
        const jenkinsMod = jenkinsJobsArray[Jobindex].Modfier;
        setJenkinsModifier(jenkinsMod);
        console.log(jenkinsMod);
        // ...
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    //Loop delays
    async function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function updateFeedback(message:string)
    {
        if (feedbackLoopRunning) {
            // The loop is already running, reset counter and message but don't start a new loop.
            timerCount = timerDefault;
            setBoltFeedback(message);
        }
        else {
            feedbackLoopRunning = true;
            setBoltFeedback(message);

            while (timerCount > 0) {
                timerCount--;
                await delay(1000);
            }
            //Loop finished clear messages reset timer and loop status
            feedbackLoopRunning = false;
            setBoltFeedback('');
            timerCount = timerDefault;
        }
     }

    async function frontendGoButton() {
        let frontendUrl = `Https://frontend.${frontendEnvironment}wrenkitchens.${frontendRegion}`.replace(/\s+/g, '');
        try {
            const response = await fetch(frontendUrl);
            if (response.ok) {
                console.log(frontendUrl);
                window.open(frontendUrl);
            } else {

            }
        } catch (error) {
            console.log(error)
            await updateFeedback(`${error}`);
        }
    }

    async function jenkinsGoButton() {
        let jenkinsUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/${jenkinsRegion}/job/${jenkinsEnvironment}/${jenkinsModifier}`.replace(/\s+/g, '');
        try {
            const response = await fetch(jenkinsUrl);
            console.log(jenkinsUrl)
            if (response.ok){
                window.open(jenkinsUrl)
            }
            else{
                jenkinsUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/build-gb/job/${jenkinsEnvironment}/`;
                window.open(jenkinsUrl)
                 updateFeedback("Url unreachable, check you're on internal network and VPN connection")
            }
        } catch (error) {
             console.log(error)
             updateFeedback(`${error}`);
        }
    }


    return (
        <div>
        <Box sx={{ flexGrow: 1, display: 'flex',width:350,height:250, borderRadius:1, border:1, padding:"5px"}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider', minWidth:100 }}
            >
                <Tab label="Frontend" {...populateTabs(0)} />
                <Tab label="Jenkins" {...populateTabs(1)} />
                <Tab label="Rundeck" {...populateTabs(2)} />

            </Tabs>
            {/*Frontend Panel*/}
            <TabPanel value={value} index={0}>
                <Box >
                   <FormControl sx={{ m: 1,width:90 }} variant="standard">
                       <InputLabel>Environment</InputLabel>
                        <Select size="small" id="projectSelect" defaultValue={frontendEnvironment} onChange={(e: SelectChangeEvent) => handleFrontendEnvironmentChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {environmentArray.map((item, index) => {
                                return <MenuItem key={index} value={item.Code}>{item.Name}</MenuItem>
                            })}
                        </Select>
                   </FormControl >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" defaultValue={frontendRegion} onChange={(e: SelectChangeEvent) => handleFrontendRegionChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map((item, index) => {
                                return <MenuItem key={index} value={item.Code}>{item.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Box  sx={{display: 'flex', justifyContent: 'right', paddingTop:"auto"}}>
                        <Button  onClick={frontendGoButton} variant="contained" > Go </Button>
                    </Box>
                </Box>
            </TabPanel>
            {/*Jenkins panel*/}
            <TabPanel value={value} index={1}>
                <Box >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Jenkins Job</InputLabel>
                        <Select size="small" id="jenkinsSelect" defaultValue={jenkinsJob} onChange={(e: SelectChangeEvent) => handleJenkinsJobChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {jenkinsJobsArray.map((item, index) => {
                                return <MenuItem key={index} value={item.Job}>{item.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Environment</InputLabel>
                        <Select size="small" id="projectSelect" defaultValue={jenkinsEnvironment} onChange={(e: SelectChangeEvent) => handleJenkinsEnvironmentChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {environmentArray.map((item, index) => {
                                return <MenuItem key={index} value={item.Jenkins}>{item.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" defaultValue={jenkinsRegion} onChange={(e: SelectChangeEvent) => handleJenkinsRegionChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map((item, index) => {
                                return <MenuItem key={index} value={item.Jenkins}>{item.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="right" >
                    <Button onClick={jenkinsGoButton} variant="contained"> Go </Button>
                    </Box>
                </Box>
            </TabPanel>
            {/*Rundeck panel*/}
            <TabPanel value={value} index={2}>
                Rundecks
            </TabPanel>
        </Box>
            {/*User Feedback panel*/}
            <p>{boltFeedback}</p>
</div>
    );
}
export default Bolt;