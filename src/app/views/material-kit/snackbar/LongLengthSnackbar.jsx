import React from 'react'
import Button from '@mui/material/Button'
import makeStyles from '@mui/styles/makeStyles';
import SnackbarContent from '@mui/material/SnackbarContent'

const action = (
    <Button color="secondary" size="small">
        lorem ipsum dolorem
    </Button>
)

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
    snackbar: {
        margin: theme.spacing(1),
    },
}))

export default function LongTextSnackbar() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <SnackbarContent
                className={classes.snackbar}
                message="I love snacks."
                action={action}
            />
            <SnackbarContent
                className={classes.snackbar}
                message={`I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.`}
            />
            <SnackbarContent
                className={classes.snackbar}
                message="I love candy. I love cookies. I love cupcakes."
                action={action}
            />
            <SnackbarContent
                className={classes.snackbar}
                message={
                    'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
                }
                action={action}
            />
        </div>
    )
}
