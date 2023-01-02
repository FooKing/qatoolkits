import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import React, {useState, useCallback} from "react";
import {browser} from "webextension-polyfill-ts";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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
        {Job: 'planner3d-gameci-native', Name: "Planner3D Mac"},
        {Job: "planner3d-gameci-native-windows", Name: "Planner3D Win"},
        {Job: "planner3d-assets-gameci", Name: "Planner3D Assets"},
        {Job: "planner3d-light-atlasser-vr2", Name: "Planner3D Light Atlasser"},
        {Job: "wrender-gameci-test", Name: "Planner3D HQ"},
        {Job: "planner2d", Name: "Planner2D"},
        {Job: "frontend", Name: "Frontend"},
        {Job: "feeder", Name: "Feeder"},
    ];
    const [boltFeedback, setBoltFeedback] = useState('');
    const [value, setValue] = React.useState(0);
    const [frontendEnvironment, setFrontendEnvironment] = useState(environmentArray[0].Code);
    const [frontendRegion, setFrontendRegion] = useState(regionArray[0].Code);
    const [jenkinsEnvironment, setJenkinsEnvironment] = useState(environmentArray[0].Jenkins);
    const [jenkinsRegion, setJenkinsRegion] = useState(regionArray[0].Jenkins);
    const [jenkinsJob, setJenkinsJob] = useState(jenkinsJobsArray[0].Job);
    const handleFrontendEnvironmentChange = (e:SelectChangeEvent) => setFrontendEnvironment(e.target.value);
    const handleFrontendRegionChange = (e:SelectChangeEvent) => setFrontendRegion(e.target.value);
    const handleJenkinsEnvironmentChange = (e:SelectChangeEvent) => setJenkinsEnvironment(e.target.value);
    const handleJenkinsRegionChange = (e:SelectChangeEvent) => setJenkinsRegion(e.target.value);
    const handleJenkinsJobChange = (e:SelectChangeEvent) => setJenkinsJob(e.target.value);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    async function updateFeedback(message:string)
    {
        // Reset message delay
        let timer = 2;
        setBoltFeedback(``);
        setBoltFeedback(message);
        // Setup a timer and reset message
        const timerID = setInterval(async () => {
            if (timer > 0 ){
                timer--;
            }
            else {
                clearInterval(timerID);
                setBoltFeedback(``);
            }
            },500);
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
        let jenkinsUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/${jenkinsRegion}/job/${jenkinsEnvironment}/`;
        try {
            const response = await fetch(jenkinsUrl);
            if (response.ok){
                window.open(jenkinsUrl)
            }
            else{
                jenkinsUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/build-gb/job/${jenkinsEnvironment}/`;
                window.open(jenkinsUrl)
                await updateFeedback("Url unreachable, check you're on internal network and VPN connection")
            }
        } catch (error) {
            console.log(error)
            await updateFeedback(`${error}`);
        }
    }


    return (
        <div>
        <Box sx={{ flexGrow: 1, display: 'flex', height: 224,width: 350, borderRadius:1, border:1, padding:"5px"}}>
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
                   <FormControl sx={{ m: 1, width:90 }} variant="standard">
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
                <Button onClick={frontendGoButton}> Go </Button>
                </Box>
            </TabPanel>
            {/*Jenkins panel*/}
            <TabPanel value={value} index={1}>
                <Box >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Jenkins Job</InputLabel>
                        <Select size="small" id="jenkinsSelect" defaultValue={jenkinsJob} onChange={handleJenkinsJobChange}
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
                    <Button onClick={jenkinsGoButton}> Go </Button>
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