import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionActions from '@mui/material/AccordionActions'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}))

export default function DetailedExpansionPanel() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>
                            Location
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>
                            Select trip destination
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <Chip label="Barbados" onDelete={() => {}} />
                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                            Select your destination of choice
                            <br />
                            <a
                                href="#sub-labels-and-columns"
                                className={classes.link}
                            >
                                Learn more
                            </a>
                        </Typography>
                    </div>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}
