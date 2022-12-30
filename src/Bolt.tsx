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
import React, {useState} from "react";



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
    // Put Live at the front so that it appears first
    environmentArray.unshift({Code: ' ', Name: "Live", Jenkins: "master"})

    const regionArray = [
        {Code: 'com', Name: "UK", Jenkins: 'build-gb'},
        {Code: "us", Name: "US", Jenkins: 'build-us'}
    ];

    const jenkinsJobsArray = [
        {Code: 'planner3d-gameci-native/', Name: "Planner3D Mac"},
        {Code: "planner3d-gameci-native-windows/", Name: "Planner3D Win"},
        {Code: "planner3d-assets-gameci", Name: "Planner3D Assets"},
        {Code: "planner3d-light-atlasser-vr2", Name: "Planner3D Light Atlasser"},
        {Code: "wrender-gameci-test", Name: "Planner3D HQ"},
        {Code: "planner2d", Name: "Planner2D"},
        {Code: "frontend/", Name: "Frontend"},
        {Code: "feeder", Name: "Feeder"},
    ];

    const [value, setValue] = React.useState(0);
    const [frontendEnvironment, setFrontendEnvironment] = useState(environmentArray[0].Code);
    const [frontendRegion, setFrontendRegion] = useState(regionArray[0].Code);
    const [jenkinsEnvironment, setJenkinsEnvironment] = useState(environmentArray[0].Jenkins);
    const [jenkinsRegion, setJenkinsRegion] = useState(regionArray[0].Jenkins);
    const [jenkinsJob, setJenkinsJob] = useState(jenkinsJobsArray[0].Code);
    const handleFrontendEnvironmentChange = (e:SelectChangeEvent) => setFrontendEnvironment(e.target.value);
    const handleFrontendRegionChange = (e:SelectChangeEvent) => setFrontendRegion(e.target.value);
    const handleJenkinsEnvironmentChange = (e:SelectChangeEvent) => setJenkinsEnvironment(e.target.value);
    const handleJenkinsRegionChange = (e:SelectChangeEvent) => setJenkinsRegion(e.target.value);
    const handleJenkinsJobChange = (e:SelectChangeEvent) => setJenkinsJob(e.target.value);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    function frontendGoButton() {
        let currentUrl = "Https://frontend."+frontendEnvironment+"wrenkitchens."+frontendRegion;
        console.log(currentUrl.replace(/\s+/g, ''));
        window.open((currentUrl.replace(/\s+/g, '')));
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
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
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
                        <Select size="small" id="projectSelect" defaultValue={environmentArray[0].Code} onChange={(e: SelectChangeEvent) => handleFrontendEnvironmentChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {environmentArray.map((env, index) => {
                                return <MenuItem key={index} value={env.Code}>{env.Name}</MenuItem>
                            })}
                        </Select>
                   </FormControl >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" defaultValue={regionArray[0].Code} onChange={(e: SelectChangeEvent) => handleFrontendRegionChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map((env, index) => {
                                return <MenuItem key={index} value={env.Code}>{env.Name}</MenuItem>
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
                        <Select size="small" id="jenkinsSelect" defaultValue={jenkinsJobsArray[0].Code} onChange={(e: SelectChangeEvent) => handleJenkinsJobChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {jenkinsJobsArray.map((env, index) => {
                                return <MenuItem key={index} value={env.Code}>{env.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Environment</InputLabel>
                        <Select size="small" id="projectSelect" defaultValue={environmentArray[0].Jenkins} onChange={(e: SelectChangeEvent) => handleJenkinsEnvironmentChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {environmentArray.map((env, index) => {
                                return <MenuItem key={index} value={env.Jenkins}>{env.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" defaultValue={regionArray[0].Jenkins} onChange={(e: SelectChangeEvent) => handleJenkinsRegionChange(e)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map((env, index) => {
                                return <MenuItem key={index} value={env.Jenkins}>{env.Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Button onClick={jenkinsGoButton}> Go </Button>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Rundecks
            </TabPanel>
        </Box>
    );
}
export default Bolt;