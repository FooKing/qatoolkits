import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    createTheme, CssBaseline,
    ThemeProvider,
    Typography,
    useMediaQuery
} from '@mui/material';
import React from 'react';
import ColourSelector from "./ColourSelector";
import { browser } from "webextension-polyfill-ts";
import Bolt from "./Bolt";


function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#dcdc27',
            },
            background: {
                default: '#111111',
                paper: '#212121',
            },
            text: {
                primary: '#ff1744',
            },
        },
        typography: {
            fontFamily: 'Open Sans',
            h1: {
                fontFamily: 'Ubuntu Mono',
            },
            h2: {
                fontFamily: 'Ubuntu Mono',
            },
            h3: {
                fontFamily: 'Ubuntu Mono',
            },
            h4: {
                fontFamily: 'Ubuntu Mono',
            },
            h6: {
                fontFamily: 'Ubuntu Mono',
            },
            h5: {
                fontFamily: 'Ubuntu Mono',
            },
            subtitle1: {
                fontFamily: 'Ubuntu Mono',
            },
            subtitle2: {
                fontFamily: 'Ubuntu Mono',
            },
            button: {
                fontFamily: 'Ubuntu Mono',
                fontWeight: 900,
            },
            overline: {
                fontFamily: 'Ubuntu Mono',
            },
        },
    });

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
  return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          <Accordion expanded={expanded === 'colourPicker'} onChange={handleChange('colourPicker')}>
              <AccordionSummary aria-controls="colourPicker-content" id="colourPicker-header">
                  <Typography fontSize={18} fontWeight={"semi bold"} >Colour picker</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <ColourSelector></ColourSelector>
              </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'Bolt'} onChange={handleChange('Bolt')}>
              <AccordionSummary aria-controls="Bolt-content" id="Bolt-header">
                  <Typography fontSize={18} fontWeight={"semi bold"} >Bolt</Typography>
              </AccordionSummary>
              <AccordionDetails>
                    <Bolt></Bolt>
              </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'jsonTools'} onChange={handleChange('jsonTools')}>
              <AccordionSummary aria-controls="jsonTools-content" id="jsonTools-header">
                  <Typography fontSize={18} fontWeight={"semi bold"} >Json Tools</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      Json Tools here
                  </Typography>
              </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '3dTours'} onChange={handleChange('3dTours')}>
              <AccordionSummary aria-controls="3dTours-content" id="3dTours-header">
                  <Typography fontSize={18} fontWeight={"semi bold"} >3D Tours</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      3D tours here.
                  </Typography>
              </AccordionDetails>
          </Accordion>
      </ThemeProvider>

  );
}

export default App;
