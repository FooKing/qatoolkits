import {Box, Button, Input, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Typography} from "@mui/material";
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

function TestConsoleButton() {
    console.log("ButtonPressed")
    window.open(("Https://www.frontend.wrenkitchens.com"))
    browser.tabs.executeScript({
        code: 'alert("hello");'
    }).then(r => console.log("CompletedRequest") );
}

function Bolt() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {

    };
    const [project, setProject] = useState('');
    const environmentArray = [
        "Live",
        "Project0",
        "Project1",
        "Project2",
        "Project3",
        "Project4",
        "Project5",
        "Project6",
        "Project7",
        "Project8",
    ];

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
                   <label>Env: </label>
                    <Select size="small" id="projectSelect" sx={{width:100}} onChange={handleSelectChange}>
                        {environmentArray.map((environmentValue) => {
                            return <MenuItem value={environmentValue}>{environmentValue}</MenuItem>
                        })}
                    </Select>
                <Button onClick={TestConsoleButton} > Go </Button>
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