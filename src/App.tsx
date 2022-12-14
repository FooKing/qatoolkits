import {
 Box, Button,
    createTheme, CssBaseline,
    ThemeProvider,
} from '@mui/material';
import React from 'react';
import ColourSelector from "./ColourSelector";
import Bolt from "./Bolt";
import DebugCommands from "./DebugCommands";
import ThreeDDownloader from "./ThreeDDownloader";
import JsonTools from "./JsonTools";
import optionsIcon from "./Icons/optionsIcon.svg"
import {browser} from "webextension-polyfill-ts";
import SeleniumIntegration from "./Automation";
import SidebarSection from "./SidebarSection";


function App() {
    const lightTheme = createTheme({
        palette: {
            action: {
                active: '#6B7280',
                focus: 'rgba(55, 65, 81, 0.12)',
                hover: 'rgba(55, 65, 81, 0.04)',
                selected: 'rgba(55, 65, 81, 0.08)',
                disabledBackground: 'rgba(55, 65, 81, 0.12)',
                disabled: 'rgba(55, 65, 81, 0.26)'
            },
            background: {
                default: '#F9FAFC',
                paper: '#FFFFFF'
            },
            divider: '#E6E8F0',
            primary: {
                main: '#5048E5',
                light: '#828DF8',
                dark: '#3832A0',
                contrastText: '#FFFFFF'
            },
            secondary: {
                main: '#10B981',
                light: '#3FC79A',
                dark: '#0B815A',
                contrastText: '#FFFFFF'
            },
            success: {
                main: '#14B8A6',
                light: '#43C6B7',
                dark: '#0E8074',
                contrastText: '#FFFFFF'
            },
            info: {
                main: '#2196F3',
                light: '#64B6F7',
                dark: '#0B79D0',
                contrastText: '#FFFFFF'
            },
            warning: {
                main: '#FFB020',
                light: '#FFBF4C',
                dark: '#B27B16',
                contrastText: '#FFFFFF'
            },
            error: {
                main: '#D14343',
                light: '#DA6868',
                dark: '#922E2E',
                contrastText: '#FFFFFF'
            },
            text: {
                primary: '#121828',
                secondary: '#65748B',
                disabled: 'rgba(55, 65, 81, 0.48)'
            }
        },
        typography: {
            fontFamily: 'Barlow',
        }
    });

    function handleOptionsButton() {
        let newValue = 'basket';
        let script = `
    let selectElement = document.querySelector('input[class="gLFyf"]');
    if (selectElement) {
      selectElement.value = '${newValue}';
    }
  `;
        browser.tabs.executeScript({
            code: script
        });
    }

       // browser.runtime.openOptionsPage().then(r => {console.log(r)});

    return (
      <ThemeProvider theme={lightTheme}>
      <CssBaseline />
          <SidebarSection name={"colourPicker"} prettyName={"Colour picker"} component={<ColourSelector />}/>
          <SidebarSection name={"Bolt"} prettyName={"Bolt"} component={<Bolt />}/>
          <SidebarSection name={"jsonTools"} prettyName={"JSON Tools"} component={<JsonTools />}/>
          <SidebarSection name={"DebugCommands"} prettyName={"Debug Commands"} component={<DebugCommands />}/>
          <SidebarSection name={"Downloader"} prettyName={"3D Downloader"} component={<ThreeDDownloader />}/>
          <SidebarSection name={"Automation"} prettyName={"Automation"} component={<SeleniumIntegration />}/>



          {/*<Accordion expanded={expanded === 'colourPicker'} onChange={handleChange('colourPicker')}>*/}
          {/*    <AccordionSummary aria-controls="colourPicker-content" id="colourPicker-header">*/}
          {/*        <Typography fontSize={18} fontWeight={"semi bold"} >Colour picker</Typography>*/}
          {/*    </AccordionSummary>*/}
          {/*    <AccordionDetails>*/}
          {/*        <ColourSelector />*/}
          {/*    </AccordionDetails>*/}
          {/*</Accordion>*/}
          {/*<Accordion expanded={expanded === 'Bolt'} onChange={handleChange('Bolt')}>*/}
          {/*    <AccordionSummary aria-controls="Bolt-content" id="Bolt-header">*/}
          {/*        <Typography fontSize={18} fontWeight={"semi bold"} >Bolt</Typography>*/}
          {/*    </AccordionSummary>*/}
          {/*    <AccordionDetails>*/}
          {/*          <Bolt></Bolt>*/}
          {/*    </AccordionDetails>*/}
          {/*</Accordion>*/}
          {/*<Accordion expanded={expanded === 'jsonTools'} onChange={handleChange('jsonTools')}>*/}
          {/*    <AccordionSummary aria-controls="jsonTools-content" id="jsonTools-header">*/}
          {/*        <Typography fontSize={18} fontWeight={"semi bold"} >Json Tools</Typography>*/}
          {/*    </AccordionSummary>*/}
          {/*    <AccordionDetails>*/}
          {/*        <Typography>*/}
          {/*            <JsonTools></JsonTools>*/}
          {/*        </Typography>*/}
          {/*    </AccordionDetails>*/}
          {/*</Accordion>*/}
          {/*<Accordion expanded={expanded === 'DebugCommands'} onChange={handleChange('DebugCommands')}>*/}
          {/*    <AccordionSummary aria-controls="DebugCommands-content" id="DebugCommands-header">*/}
          {/*        <Typography fontSize={18} fontWeight={"semi bold"} >Debug Commands</Typography>*/}
          {/*    </AccordionSummary>*/}
          {/*    <AccordionDetails>*/}
          {/*        <Typography>*/}
          {/*            <DebugCommands></DebugCommands>*/}
          {/*        </Typography>*/}
          {/*    </AccordionDetails>*/}
          {/*</Accordion>*/}
          {/*<Accordion expanded={expanded === 'Downloader'} onChange={handleChange('Downloader')}>*/}
          {/*    <AccordionSummary aria-controls="Downloader-content" id="Downloader-header">*/}
          {/*        <Typography fontSize={18} fontWeight={"semi bold"} >3D Downloader</Typography>*/}
          {/*    </AccordionSummary>*/}
          {/*    <AccordionDetails>*/}
          {/*        <Typography>*/}
          {/*            <ThreeDDownloader></ThreeDDownloader>*/}
          {/*        </Typography>*/}
          {/*    </AccordionDetails>*/}
          {/*</Accordion>*/}
          {/*<Accordion expanded={expanded === 'seleniumInt'} onChange={handleChange('seleniumInt')}>*/}
          {/*    <AccordionSummary aria-controls="seleniumInt-content" id="seleniumInt-header">*/}
          {/*        <Typography fontSize={18} fontWeight={"semi bold"} >Selenium Intergration</Typography>*/}
          {/*    </AccordionSummary>*/}
          {/*    <AccordionDetails>*/}
          {/*        <Typography>*/}
          {/*            <SeleniumIntergration></SeleniumIntergration>*/}
          {/*        </Typography>*/}
          {/*    </AccordionDetails>*/}
          {/*</Accordion>*/}
          <Box display="flex" justifyContent="right" alignItems="flex-end" bottom="0" >
            <Button sx={{width: 30, height: 40}} onClick={handleOptionsButton}>
                <img alt="Options" height="25px" src={optionsIcon}/>
            </Button>
          </Box>
      </ThemeProvider>

  );
}

export default App;
