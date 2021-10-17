import React from 'react'
import withStyles from '@mui/styles/withStyles';
import { green } from '@mui/material/colors'
import Radio from '@mui/material/Radio'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

export default function StandaloneRadio() {
    const [selectedValue, setSelectedValue] = React.useState('a')

    function handleChange(event) {
        setSelectedValue(event.target.value)
    }

    return (
        <div>
            <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'B' }}
            />
            <GreenRadio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'C' }}
            />
            <Radio
                checked={selectedValue === 'd'}
                onChange={handleChange}
                value="d"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'D' }}
            />
            <Radio
                checked={selectedValue === 'e'}
                onChange={handleChange}
                value="e"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'E' }}
                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
            />
        </div>
    )
}
