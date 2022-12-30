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
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [environment, setEnvironment] = useState('');
    const [region, setRegion] = useState('');
    const [jenkinsJob, setJenkinsJob] = useState('');

    const handleEnvironmentChange = (e:SelectChangeEvent) => setEnvironment(e.target.value);
    const handleRegionChange = (e:SelectChangeEvent) => setRegion(e.target.value);
    const handleJenkinsChange = (e:SelectChangeEvent) => setJenkinsJob(e.target.value);
    const environmentArray = Array(9).fill( 9).map((_, i) => {
        console.log(`${i}`)
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

    function frontendGoButton() {
        let currentUrl = "Https://frontend."+environment+"wrenkitchens."+region;
        console.log(currentUrl.replace(/\s+/g, ''));
        window.open((currentUrl.replace(/\s+/g, '')));
    }


    async function jenkinsGoButton() {
        let jenkinsUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/${region}/job/${environment}/`;

        try {
            const response = await fetch(jenkinsUrl);
            if (response.ok){
                window.open(jenkinsUrl)
            }
            else{
                jenkinsUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/build-gb/job/${environment}/`;
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
            <TabPanel value={value} index={0}>
                <Box >
                   <FormControl sx={{ m: 1, width:90 }} variant="standard">
                       <InputLabel>Environment</InputLabel>
                        <Select size="small" id="projectSelect" onChange={handleEnvironmentChange}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {environmentArray.map(({Code, Name},index ) => {
                                return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                            })}
                        </Select>
                   </FormControl >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" onChange={handleRegionChange}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map(({Code, Name},index ) => {
                                return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                <Button onClick={frontendGoButton}> Go </Button>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Jenkins Job</InputLabel>
                        <Select size="small" id="regionSelect" onChange={handleJenkinsChange}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {jenkinsJobsArray.map(({Code, Name},index ) => {
                                return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Environment</InputLabel>
                        <Select size="small" id="projectSelect" onChange={handleEnvironmentChange}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {environmentArray.map(({Jenkins, Name},index ) => {
                                return <MenuItem key={index} value={Jenkins}>{Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl >
                    <FormControl sx={{ m: 1, width:90 }} variant="standard">
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" onChange={handleRegionChange}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            {regionArray.map(({Jenkins, Name},index ) => {
                                return <MenuItem key={index} value={Jenkins}>{Name}</MenuItem>
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