import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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

    const handleEnvironmentChange = (e:any) => setEnvironment(e.target.value);

    const handleRegionChange = (e:any) => setRegion(e.target.value);

    const environmentArray = [
        {Code: ' ', Name: "Live"},
        {Code: "project0.", Name: "Project 0"},
        {Code: "project1.", Name: "Project 1"},
        {Code: "project2.", Name: "Project 2"},
        {Code: "project3.", Name: "Project 3"},
        {Code: "project4.", Name: "Project 4"},
        {Code: "project5.", Name: "Project 5"},
        {Code: "project6.", Name: "Project 6"},
        {Code: "project7.", Name: "Project 7"},
        {Code: "project8.", Name: "Project 8"}
    ];
    const regionArray = [
        {Code: 'com', Name: "UK"},
        {Code: "us", Name: "US"}
    ];

    function frontendGoButton() {
        let currentUrl = "Https://frontend."+environment+"wrenkitchens."+region;
        console.log(currentUrl.replace(/\s+/g, ''));
        window.open((currentUrl.replace(/\s+/g, '')));
    }

    let projectValue;
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', height: 224, borderRadius:1, border:1, padding:"5px"}}>
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
                Jenkins
            </TabPanel>
            <TabPanel value={value} index={2}>
                Rundecks
            </TabPanel>
        </Box>
    );
}
export default Bolt;