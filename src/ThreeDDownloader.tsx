import {
    Box,
    Button,
    FormControl, Input,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
} from "@mui/material";
import React, {useState} from "react";
import {browser,} from "webextension-polyfill-ts";


function ThreeDDownloader() {

    const [currentVersion, setCurrentVersion] = useState('');
    const [environment, setEnvironment] = useState('');
    const handleVersionChange = (e:React.ChangeEvent<HTMLInputElement>) => setCurrentVersion(e.currentTarget.value);
    const handleEnvironmentChange = (e:SelectChangeEvent) => setEnvironment(e.target.value);
    let [userFeedbackMessage, setUserFeedbackMessage] = useState('');

    const environmentArray = [
        {Code: "Https://static.wrenkitchens.com/planner3d/gameCI/"+currentVersion+"/Planner3D.zip", Name: "Live"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project0/"+currentVersion+"/Planner3D.zip", Name: "Project 0"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project1/"+currentVersion+"/Planner3D.zip", Name: "Project 1"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project2/"+currentVersion+"/Planner3D.zip", Name: "Project 2"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project3/"+currentVersion+"/Planner3D.zip", Name: "Project 3"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project4/"+currentVersion+"/Planner3D.zip", Name: "Project 4"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project5/"+currentVersion+"/Planner3D.zip", Name: "Project 5"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project6/"+currentVersion+"/Planner3D.zip", Name: "Project 6"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project7/"+currentVersion+"/Planner3D.zip", Name: "Project 7"},
        {Code: "Https://project-static.wrenkitchens.com/planner3d/gameCI/project8/"+currentVersion+"/Planner3D.zip", Name: "Project 8"}

    ];

    async function trackDownloadProgress(downloadItem: number) {

        const id = setInterval(async () => {
            const downloads = await browser.downloads.search({id: (downloadItem)});
            const download = downloads[0];
            console.log(downloadItem);
            console.log(`Totalbytes = ${download.totalBytes} and bytesRecieved = ${download.bytesReceived}`)
            let downloadPercent = (download.bytesReceived / download.totalBytes) * 100;
            console.log(`Download progress: ${downloadPercent}%`);
            if (download.state === 'complete' || download.state === 'interrupted') {
                clearInterval(id)
            }
        }, 2000);
    }
   async function handleDownloadButton() {
        if ((environment ?? null) && (currentVersion ?? null)) {
            let currentUrl = environment;
            await browser.downloads.download({url: currentUrl, filename: 'Planner3D v' + currentVersion + '.zip'}).then((downloadItem) => {
                trackDownloadProgress(downloadItem)
            });
        }
     }
    return (
        <Box sx={{ flexGrow: 1, height: 100, borderRadius:1, border:1, padding:"5px"}}>
            <FormControl sx={{ m: 1, width:90 }} variant="standard">
                <InputLabel>Version</InputLabel>
                <Input type= "number" value={currentVersion} onChange={handleVersionChange}></Input>
            </FormControl>
            <FormControl sx={{ m: 1, width:90 }} variant="standard">
                <InputLabel>Environment</InputLabel>
                <Select size="small" id="projectSelect" value={environment} onChange={handleEnvironmentChange}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                    {environmentArray.map(({Code, Name},index ) => {
                        return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                    })}
                </Select>
            </FormControl >
                <Button  sx={{ m: 1, alignItems:"baseline"}} size="small" variant="contained" onClick={handleDownloadButton}> Download </Button>
            <p> Hey update please {userFeedbackMessage}</p>
        </Box>
    );
}
export default ThreeDDownloader;