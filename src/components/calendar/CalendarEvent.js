import React from 'react'

export const CalendarEvent = ({ event }) => {

    const { title, user: { name } } = event;

    return (
        <div>
            <strong>{title}</strong>
            <span> - </span>
            <span>{name}</span>

        </div>
    )
}
