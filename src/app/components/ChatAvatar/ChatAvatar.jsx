import React from 'react'
import { Avatar } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    avatar: {
        height: '40px',
        width: '40px',
    },
    status_circle: {
        position: 'absolute',
        height: '14px',
        width: '14px',
        borderRadius: '7px',
        bottom: '0px',
        right: '-3px',
        border: '2px solid white',
    },
}))

const ChatAvatar = ({ src, status }) => {
    const classes = useStyles()

    return (
        <div className="relative">
            <Avatar className={classes.avatar} src={src} />
            <div
                className={`${classes.status_circle} ${
                    status === 'online' ? 'bg-primary' : 'bg-error'
                }`}
            />
        </div>
    )
}

export default ChatAvatar
