import React from "react";
import {Box, Button} from "@mui/material";
import {browser} from "webextension-polyfill-ts";
import {kMaxLength} from "buffer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

function JsonTools() {

    function sendDebugCommand(command: string) {
        console.log(command);
        browser.tabs.executeScript({
            code: `window.wrappedJSObject.${command}`
        }).then()
    }
    async function handleLoadJsonButton() {
        console.log('Handlecalled')
        let clipText = await navigator.clipboard.readText()

        if (clipText.startsWith("https://feeder")) {
            sendDebugCommand(`__debugApi__.set2DJsonByUrl("${clipText}")`);
            console.log(`Starts with `);
        } else {
            const preparedJSON = JSON.stringify(clipText)
            sendDebugCommand(`__debugApi__.set2DJson(${preparedJSON})`);
            console.log(clipText)
            console.log(preparedJSON)
            console.log(`Else`);
        }

        // }).catch(error => {
        //     console.log(error);
        // });
    }

    return (
        <Box sx={{width: 350, height:125, borderRadius:1, border:1, padding:"10px"}}>
            <Button variant="contained" onClick={handleLoadJsonButton} >Load Json From Clipboard</Button>
        </Box>
    );
}
export default JsonTools;