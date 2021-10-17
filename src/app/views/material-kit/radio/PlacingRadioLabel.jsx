import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function PlacingRadioLabel() {
    const [value, setValue] = React.useState('female')

    function handleChange(event) {
        setValue(event.target.value)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">labelPlacement</FormLabel>
            <RadioGroup
                aria-label="position"
                name="position"
                value={value}
                onChange={handleChange}
                row
            >
                <FormControlLabel
                    value="top"
                    control={<Radio color="primary" />}
                    label="Top"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="Start"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="bottom"
                    control={<Radio color="primary" />}
                    label="Bottom"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="end"
                    control={<Radio color="primary" />}
                    label="End"
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    )
}
