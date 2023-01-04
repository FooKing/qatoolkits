import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import React from "react";


export default function SidebarSection({ name, prettyName, component }: { name: string, prettyName: string, component: any }) {

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Accordion expanded={expanded === name} onChange={handleChange(name)}>
            <AccordionSummary aria-controls={`${name}-content`} id={`${name}-header`}>
                <Typography fontSize={18} fontWeight={"semi bold"} >{prettyName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {component}
            </AccordionDetails>
        </Accordion>
    )
}
