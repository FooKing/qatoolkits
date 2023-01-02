import React from "react";
import {Box, Button} from "@mui/material";
import {browser} from "webextension-polyfill-ts";
import {Simulate} from "react-dom/test-utils";

function JsonTools() {

    function sendDebugCommand(command: string) {
        console.log(command);
        browser.tabs.executeScript({
            code: `window.wrappedJSObject.${command}`
        }).then()
    }
    async function handleLoadJsonButton() {
        //Read users clipboard and create a variable from it.
        let clipText = await navigator.clipboard.readText()

        //Check if it's a URL link to json.
        if (clipText.startsWith("https://feeder")) {
            sendDebugCommand(`__debugApi__.set2DJsonByUrl("${clipText}")`);
        }
        else {
            const preparedJSON = JSON.stringify(clipText)
            sendDebugCommand(`__debugApi__.set2DJson(${preparedJSON})`);
        }
    }

    async function handleGetPlanImages() {
        let clipText = await navigator.clipboard.readText()
        console.log(clipText);
        if(clipText.startsWith("https://feeder")) {
            const parts = clipText.split("/");
            const domain = parts[2]; // should output the feederURL.
            const orderNumberPart = parts[5]; // should output order number with all extra details.
            const orderNumberSplit = orderNumberPart.split("-");
            const orderNumber = orderNumberSplit[0]; // should output clean order number
            const feederPlanImageUrl = `https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`;
            console.log(`https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`);
            window.open(feederPlanImageUrl);
        }
        else {
            console.log("Not a feeder link")
        }
    }

    return (
        <Box sx={{width: 350, height:125, borderRadius:1, border:1, padding:"10px", gap:2, display: 'grid'}}>
            <Button variant="contained" onClick={handleLoadJsonButton} >Load Json From Clipboard</Button>
            <Button variant="contained" onClick={handleGetPlanImages} >Get Plan Images From Json URL</Button>
        </Box>
    );
}
export default JsonTools;