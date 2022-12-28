import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createTheme, CssBaseline,
    ThemeProvider,
    Typography,
} from '@mui/material';
import React from 'react';
import ColourSelector from "./ColourSelector";
import Bolt from "./Bolt";
import DebugCommands from "./DebugCommands";
import ThreeDDownloader from "./ThreeDDownloader";


function App() {
    const darkTheme = createTheme({
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
            button: {
                fontWeight: 600
            },
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.57
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.75
            },
            subtitle2: {
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.57
            },
            overline: {
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                lineHeight: 2.5,
                textTransform: 'uppercase'
            },
            caption: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.66
            },
            h1: {
                fontWeight: 700,
                fontSize: '3.5rem',
                lineHeight: 1.375
            },
            h2: {
                fontWeight: 700,
                fontSize: '3rem',
                lineHeight: 1.375
            },
            h3: {
                fontWeight: 700,
                fontSize: '2.25rem',
                lineHeight: 1.375
            },
            h4: {
                fontWeight: 700,
                fontSize: '2rem',
                lineHeight: 1.375
            },
            h5: {
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: 1.375
            },
            h6: {
                fontWeight: 600,
                fontSize: '1.125rem',
                lineHeight: 1.375
            }
        }
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
          <Accordion expanded={expanded === 'DebugCommands'} onChange={handleChange('DebugCommands')}>
              <AccordionSummary aria-controls="DebugCommands-content" id="ConsoleCommands-header">
                  <Typography fontSize={18} fontWeight={"semi bold"} >Debug Commands</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      <DebugCommands></DebugCommands>
                  </Typography>
              </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'Downloader'} onChange={handleChange('Downloader')}>
              <AccordionSummary aria-controls="Downloader-content" id="Downloader-header">
                  <Typography fontSize={18} fontWeight={"semi bold"} >3D Downloader</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      <ThreeDDownloader></ThreeDDownloader>
                  </Typography>
              </AccordionDetails>
          </Accordion>
      </ThemeProvider>

  );
}

export default App;
