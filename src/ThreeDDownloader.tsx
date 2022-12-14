import {Box,Button,FormControl,Input,InputLabel,MenuItem,Select,SelectChangeEvent, LinearProgress}
    from "@mui/material";
import React, {useState}
    from "react";
import {browser,}
    from "webextension-polyfill-ts";

// timer loop vars
const timerDefault = 3;
let timerCount = timerDefault;
let feedbackLoopRunning = false;



function ThreeDDownloader() {
// setup arrays first for initial values of hooks
    const enviroArray = [
        {Code: " ", Name: "Live", Static: "static"},
        {Code: "project0/", Name: "Project 0", Static: "project-static"},
        {Code: "project1/", Name: "Project 1", Static: "project-static"},
        {Code: "project2/", Name: "Project 2", Static: "project-static"},
        {Code: "project3/", Name: "Project 3", Static: "project-static"},
        {Code: "project4/", Name: "Project 4", Static: "project-static"},
        {Code: "project5/", Name: "Project 5", Static: "project-static"},
        {Code: "project6/", Name: "Project 6", Static: "project-static"},
        {Code: "project7/", Name: "Project 7", Static: "project-static"},
        {Code: "project8/", Name: "Project 8", Static: "project-static"}

    ];
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadPercent, setDownloadPercent] = useState(Number);
    const [hideDownloadBar, setHideDownloadBar] =  React.useState<'inherit' | 'none'>('none');
    const [downloadColour, setDownloadColour] =  React.useState<'primary' | 'success' | 'error'>('primary');
    const [isLatest, setIsLatest] = useState(true);
    const [customVersion, setCustomVersion] = useState('');
    const [environment, setEnvironment] = useState(enviroArray[0].Code);
    const [staticLocation, setStaticLocation] = useState('static');
    const [currentPlatform, setCurrentPlatform] = useState('gameCI');
    const [userFeedbackMessage, setUserFeedbackMessage] = useState('');
    const handleVersionChange = (e:React.ChangeEvent<HTMLInputElement>) => setCustomVersion(e.target.value);
    const handleEnvironmentChange = (e:SelectChangeEvent) => {
        setEnvironment(e.target.value);
        const currentEnvironment = enviroArray.find(env => env.Code === e.target.value);
        if (currentEnvironment) {
            setStaticLocation(currentEnvironment.Static);
        }
    };

    // loop delays.
    async function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function handleCheckVersionButton() {
        const requestUrl = new XMLHttpRequest();
        const versionCheckUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/${currentPlatform}/${environment}version.txt`.replace(/\s+/g,'');
        requestUrl.open('GET', versionCheckUrl);
        requestUrl.send();
        requestUrl.onload = async function () {
            if (requestUrl.status === 200) {
                const latestVersion = requestUrl.responseText;
                setUserFeedbackMessage(requestUrl.responseText);

            } else {
                console.error(`Error ${requestUrl.status}: ${requestUrl.statusText}`);
            }

        }
    }

    const handleDownloadButton = async () => {
        let currentDownloadUrl = "";

        if (isLatest) {
            const requestUrl = new XMLHttpRequest();
            const versionCheckUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/${currentPlatform}/${environment}version.txt`.replace(/\s+/g,'');
            requestUrl.open('GET', versionCheckUrl);
            requestUrl.send();
            requestUrl.onload = async function () {
                if (requestUrl.status === 200) {
                    const latestVersion = requestUrl.responseText;
                    currentDownloadUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/${currentPlatform}/${environment}${latestVersion}/Planner3D.zip`.replace(/\s+/g,'');
                    await handleDownload(currentDownloadUrl, "Planner3D.zip");
                } else {
                    console.error(`Error ${requestUrl.status}: ${requestUrl.statusText}`);
                }

            }}
        else
        {
            currentDownloadUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/${currentPlatform}/${environment}${customVersion}/Planner3D.zip`.replace(/\s+/g,'');
            await handleDownload(currentDownloadUrl, "Planner3D.zip");
        }
    }

    const handleDownloadManifestButton = async () => {
        const manifestUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/assets/${environment}2021.3.4f1/standaloneosx/standaloneosx.manifest`.replace(/\s+/g,'');
        await handleDownload(manifestUrl, 'standaloneosx.manifest')
       };

    const handleLatestChange = (e: SelectChangeEvent) => {
        setIsLatest(e.target.value === 'true');
    };

    const handlePlatformChange = (e: SelectChangeEvent) => {
        setCurrentPlatform(e.target.value);
    };


    const handleDownload = async (downloadUrl: string, saveAs: string) => {
        setUserFeedbackMessage(`Download Started`);
        await browser.downloads.download({
            url: downloadUrl,
            conflictAction: "overwrite",
            filename: saveAs
        }).then((downloadItem) => {
            trackDownloadProgress(downloadItem)
            setIsDownloading(true);
            console.log(downloadUrl);
        });
    }

    async function updateFeedback(message: string) {
        console.log("UpdateFeedback called");
        setUserFeedbackMessage(message);

        if (feedbackLoopRunning) {
            // The loop is already running, reset counter and message but don't start a new loop.
            timerCount = timerDefault;
            setUserFeedbackMessage(message);
        } else {
            feedbackLoopRunning = true;
            setUserFeedbackMessage(message);

            while (timerCount > 0) {
                timerCount--;
                await delay(1000);
            }
            //Loop finished clear messages reset timer and loop status
            feedbackLoopRunning = false;
            setUserFeedbackMessage('');
            setHideDownloadBar("none");
            timerCount = timerDefault;
        }
    }
    async function trackDownloadProgress(downloadItem: number) {
        let downloadComplete = false;
        while (!downloadComplete) {
            const downloads = await browser.downloads.search({id: (downloadItem)});
            const download = downloads[0];
            let downloadPercent = Math.round((download.bytesReceived / download.totalBytes) * 100);
            switch (download.state) {
                case 'complete':
                    downloadComplete = true;
                    updateFeedback(`Download complete`);
                    setDownloadPercent(100);
                    setIsDownloading(false);
                    setDownloadColour('success')
                    break;
                case 'interrupted':
                    downloadComplete = true;
                    updateFeedback(`Download failed`);
                    setIsDownloading(false);
                    setDownloadColour('error')
                    break;
                case 'in_progress':
                    setHideDownloadBar('inherit');
                    setDownloadColour('primary')
                    setDownloadPercent(downloadPercent);
                    updateFeedback(`Downloading`);
            }

            // Delay for 250 milliseconds before checking the download status again
            await delay(250);
        }
    }

    return (
        <Box title='3D downloader' sx={{ flexGrow: 1, width:350, borderRadius:1, border:1, padding:"5px"}}>
            <FormControl sx={{ m: 1,width:"40%" }} variant="standard">
                <InputLabel>Platform</InputLabel>
                <Select size="small" id="LatestSelect" defaultValue={'gameCI'} onChange={handlePlatformChange}>
                    <MenuItem value={'gameCI'}>Mac</MenuItem>
                    <MenuItem value={'gameci-windows'}>Win</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1,width:"40%" }} variant="standard">
                <InputLabel>Environment</InputLabel>
                <Select size="small" id="projectSelect" value={environment} onChange={handleEnvironmentChange}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                    {enviroArray.map(({Code, Name},index ) => {
                        return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                    })}
                </Select>
            </FormControl >
            <FormControl sx={{ m: 1,width:"40%" }} variant="standard">
                <InputLabel>Version</InputLabel>
                <Select size="small" id="LatestSelect" defaultValue={'true'} onChange={handleLatestChange}>
                    <MenuItem value={'true'}>Latest</MenuItem>
                    <MenuItem value={'false'}>Custom</MenuItem>
                </Select>
                </FormControl>
            <FormControl sx={{ m: 1,width:"40%" }} variant="standard">
                <InputLabel>Custom</InputLabel>
                <Input type= "number" value={customVersion} disabled={isLatest} onChange={handleVersionChange}></Input>
            </FormControl>
                <Button  sx={{ m: 1, alignItems:"center", width:"40%"}} size="small" variant="contained" onClick={handleDownloadButton} disabled={isDownloading}> Download </Button>
                <Button  sx={{ m: 1, alignItems:"center", width:"40%"}} size="small" variant="contained" onClick={handleDownloadManifestButton} disabled={isDownloading}> Manifest Download </Button>
            <Button  sx={{ m: 1, alignItems:"center", width:"40%"}} size="small" variant="contained" onClick={handleCheckVersionButton} disabled={isDownloading}> Check Latest Version </Button>

            <p>{userFeedbackMessage}</p>
                <LinearProgress variant="determinate" color={downloadColour} style={{display:hideDownloadBar}} value={downloadPercent}></LinearProgress>
        </Box>
    );
}
export default ThreeDDownloader;