import {FormControl, InputLabel, Menu, MenuItem, Select} from "@mui/material";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import classes from "*.module.css";


const projectCount = 9;
const wren = "wrenkitchens"
function Bolt() {
    function handleChange() {

    }

    let service;
    return (
        <div>
                <InputLabel id="demo-simple-select-label">Service</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={service}
                    label="Service"
                    onChange={handleChange}
                    fullWidth={true}
                    >
                <MenuItem value={'Frontend'}>Frontend</MenuItem>
                <MenuItem value={'Jenkins'}>Jenkins</MenuItem>
                <MenuItem value={'Jira'}>Jira</MenuItem>
                <MenuItem value={'Rundeck'}>Rundeck</MenuItem>
            </Select>
            <Grid2  className={classes.Frontend} id={'FrontendContent'}  container spacing={2} sx={{ visibility: 'hidden' }}>
                <Grid2 xs={8}>
                    <div>xs=8</div>
                </Grid2>
                <Grid2 xs={4}>
                    <div>xs=4</div>
                </Grid2>
                <Grid2 xs={4}>
                    <div>xs=4</div>
                </Grid2>
                <Grid2 xs={8}>
                    <div>xs=8</div>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Bolt;