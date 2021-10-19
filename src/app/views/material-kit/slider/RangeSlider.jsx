import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'

const useStyles = makeStyles({
    root: {
        width: 300,
    },
})

function valuetext(value) {
    return `${value}°C`
}

export default function RangeSlider() {
    const classes = useStyles()
    const [value, setValue] = React.useState([20, 37])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Temperature range
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    )
}
