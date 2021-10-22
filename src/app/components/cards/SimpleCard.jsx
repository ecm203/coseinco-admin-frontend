import React from 'react'
import { Card } from '@mui/material'
import { classList } from 'utils'

const SimpleCard = ({ children, title, subtitle, icon, hfull = true }) => {
    return (
        <Card elevation={6} className={`px-6 py-5 ${hfull ? 'h-full' : ''}`}>
            <div
                className={classList({
                    'card-title': true,
                    'mb-4': !subtitle,
                })}
            >
                {title}
            </div>
            {subtitle && <div className="card-subtitle mb-4">{subtitle}</div>}
            {children}
        </Card>
    )
}

export default SimpleCard
