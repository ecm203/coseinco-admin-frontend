import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Input from '@mui/material/Input'
import VolumeUp from '@mui/icons-material/VolumeUp'

const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
})

export default function InputSlider() {
    const classes = useStyles()
    const [value, setValue] = React.useState(30)

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleBlur = () => {
        if (value < 0) {
            setValue(0)
        } else if (value > 100) {
            setValue(100)
        }
    }

    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
                Volume
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <VolumeUp />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
