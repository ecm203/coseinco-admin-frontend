import { themeColors } from './themeColors'
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { forEach, merge } from 'lodash'
import themeOptions from './themeOptions'

function createMatxThemes() {
    let themes = {}

    forEach(themeColors, (value, key) => {
        themes[key] = createTheme(adaptV4Theme(merge({}, themeOptions, value)))
    })
    return themes
}
export const themes = createMatxThemes()
