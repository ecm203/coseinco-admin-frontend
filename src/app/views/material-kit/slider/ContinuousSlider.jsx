import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import Slider from '@mui/material/Slider'

const useStyles = makeStyles({
    root: {
        width: 200,
    },
})

export default function ContinuousSlider() {
    const classes = useStyles()
    const [value, setValue] = React.useState(30)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                Volume
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <VolumeDown />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        aria-labelledby="continuous-slider"
                    />
                </Grid>
                <Grid item>
                    <VolumeUp />
                </Grid>
            </Grid>
            <Slider
                disabled
                defaultValue={30}
                aria-labelledby="continuous-slider"
            />
        </div>
    )
}
