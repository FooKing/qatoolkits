import {Box,Button,FormControl,Input,InputLabel,MenuItem,Select,SelectChangeEvent}
    from "@mui/material";
import React, {useState}
    from "react";
import {browser,}
    from "webextension-polyfill-ts";


function ThreeDDownloader() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLatest, setIsLatest] = useState(true);
    const [customVersion, setCustomVersion] = useState('');
    const [environment, setEnvironment] = useState('');
    const [staticLocation, setStaticLocation] = useState('static');
    const [currentPlatform, setCurrentPlatform] = useState('gameCI');
    const handleVersionChange = (e:React.ChangeEvent<HTMLInputElement>) => setCustomVersion(e.target.value);
    const handleEnvironmentChange = (e:SelectChangeEvent) => {
        setEnvironment(e.target.value);
        const currentEnvironment = enviroArray.find(env => env.Code === e.target.value);
        if (currentEnvironment) {
            setStaticLocation(currentEnvironment.Static);
        }

    };
    let [userFeedbackMessage, setUserFeedbackMessage] = useState('');

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

    const handleDownloadButton = async () => {
        let currentDownloadUrl = "";
        if (isLatest) {
            const requestUrl = new XMLHttpRequest();
            const versionCheckUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/gameCI/${environment}version.txt`.replace(/\s+/g,'');
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
        const manifestUrl = `https://${staticLocation}.wrenkitchens.com/planner3d/gameCI/${environment}manifest.json`.replace(/\s+/g,'');
        await handleDownload(manifestUrl, 'manifest.json')
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
        });
    }
    async function trackDownloadProgress(downloadItem: number) {
        const id = setInterval(async () => {
            const downloads = await browser.downloads.search({id: (downloadItem)});
            const download = downloads[0];
            switch (download.state) {
                case 'complete':
                    setUserFeedbackMessage(`Download complete`);
                    clearInterval(id);
                    setIsDownloading(false);
                    break;
                case 'interrupted':
                    setUserFeedbackMessage(`Download failed`);
                    clearInterval(id);
                    setIsDownloading(false);
                    break;
                case 'in_progress':
                    let downloadPercent = Math.round((download.bytesReceived / download.totalBytes) * 100);
                    setUserFeedbackMessage(`Downloading ${downloadPercent}% complete`);
                    break;
            }
        }, 500);
    }

    return (
        <Box title='3D downloader' sx={{ flexGrow: 1, height: 200, width:300, borderRadius:1, border:1, padding:"5px"}}>
            <FormControl sx={{ m: 1, width:90 }} variant="standard">
                <InputLabel>Platform</InputLabel>
                <Select size="small" id="LatestSelect" defaultValue={'gameCI'} onChange={handlePlatformChange}>
                    <MenuItem value={'gameCI'}>Mac</MenuItem>
                    <MenuItem value={'winCI'}>Win</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width:90 }} variant="standard">
                <InputLabel>Environment</InputLabel>
                <Select size="small" id="projectSelect" value={environment} onChange={handleEnvironmentChange}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                    {enviroArray.map(({Code, Name},index ) => {
                        return <MenuItem key={index} value={Code}>{Name}</MenuItem>
                    })}
                </Select>
            </FormControl >
            <FormControl sx={{ m: 1, width:90 }} variant="standard">
                <InputLabel>Version</InputLabel>
                <Select size="small" id="LatestSelect" defaultValue={'true'} onChange={handleLatestChange}>
                    <MenuItem value={'true'}>Latest</MenuItem>
                    <MenuItem value={'false'}>Custom</MenuItem>
                </Select>
                </FormControl>
            <FormControl sx={{ m: 1, width:90 }} variant="standard">
                <InputLabel>Custom</InputLabel>
                <Input type= "number" value={customVersion} disabled={isLatest} onChange={handleVersionChange}></Input>
            </FormControl>
                <Button  sx={{ m: 1, alignItems:"center"}} size="small" variant="contained" onClick={handleDownloadButton} disabled={isDownloading}> Download </Button>
                <Button  sx={{ m: 1, alignItems:"center"}} size="small" variant="contained" onClick={handleDownloadManifestButton} disabled={isDownloading}> Manifest Download </Button>
                <p>{userFeedbackMessage}</p>
        </Box>
    );
}
export default ThreeDDownloader;