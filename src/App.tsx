import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography} from '@mui/material';
import React from 'react';
import TestFunction from "./TestScript";




function App() {

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

  return (
      <div>
          <Accordion expanded={expanded === 'colourPicker'} onChange={handleChange('colourPicker')}>
              <AccordionSummary aria-controls="colourPicker-content" id="colourPicker-header">
                  <Typography>Colour picker</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Box sx={{ m: '2rem' }} />
                  <Button variant="contained">Random Colour</Button>
              </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'jsonTools'} onChange={handleChange('jsonTools')}>
              <AccordionSummary aria-controls="jsonTools-content" id="jsonTools-header">
                  <Typography>Json Tools</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      Json Tools here
                  </Typography>
              </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '3dTours'} onChange={handleChange('3dTours')}>
              <AccordionSummary aria-controls="3dTours-content" id="3dTours-header">
                  <Typography>3D Tours</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      3D tours here.
                  </Typography>
              </AccordionDetails>
          </Accordion>
      </div>

  );
}

export default App;
