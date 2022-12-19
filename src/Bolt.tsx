import {
    Box,
    Button,
    FormControl,
    Input, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import React, {useState} from "react";
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

function a11yProps(index: number) {
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
        {Code: 'us', Name: "US"},
        {Code: "com", Name: "UK"}
    ];

    function frontendGoButton() {
        let currentUrl = "Https://www."+environment+"frontend.wrenkitchens."+region;
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
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Frontend" {...a11yProps(0)} />
                <Tab label="Jenkins" {...a11yProps(1)} />
                <Tab label="Rundeck" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Box >
                   <FormControl sx={{width:100}}>
                       <InputLabel>Environment</InputLabel>
                        <Select size="small" id="projectSelect" onChange={handleEnvironmentChange}>
                            {environmentArray.map(({Code, Name},index ) => {
                                return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                            })}
                        </Select>
                   </FormControl>
                    <FormControl sx={{width:100}}>
                        <InputLabel>Region</InputLabel>
                        <Select size="small" id="regionSelect" onChange={handleRegionChange}>
                            {regionArray.map(({Code, Name},index ) => {
                                return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                <Button onClick={frontendGoButton}> Go </Button>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
}
export default Bolt;