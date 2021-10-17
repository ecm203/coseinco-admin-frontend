import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import { amber, green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import WarningIcon from '@mui/icons-material/Warning'
import makeStyles from '@mui/styles/makeStyles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyles1 = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))

function MySnackbarContentWrapper(props) {
    const classes = useStyles1()
    const { className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                    size="large">
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
        .isRequired,
}

const useStyles2 = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

export default function CustomizedSnackbars() {
    const classes = useStyles2()
    const [open, setOpen] = React.useState(false)

    function handleClick() {
        setOpen(true)
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="outlined"
                className={classes.margin}
                onClick={handleClick}
            >
                Open success snackbar
            </Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="success"
                    message="This is a success message!"
                />
            </Snackbar>
            <MySnackbarContentWrapper
                variant="error"
                className={classes.margin}
                message="This is an error message!"
            />
            <MySnackbarContentWrapper
                variant="warning"
                className={classes.margin}
                message="This is a warning message!"
            />
            <MySnackbarContentWrapper
                variant="info"
                className={classes.margin}
                message="This is an information message!"
            />
            <MySnackbarContentWrapper
                variant="success"
                className={classes.margin}
                message="This is a success message!"
            />
        </div>
    )
}
