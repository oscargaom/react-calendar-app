import React, { useState } from 'react'

import moment from 'moment';
import 'moment/locale/es-us';

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActive } from '../../actions/events';
import { PlusFloatingActionButton } from '../ui/PlusFloatingActionButton';
import { DeleteFloatingActionButton } from '../ui/DeleteFloatingActionButton';

const localizer = momentLocalizer(moment);

const style = {
    backgroundColor: '#367CF7',
    borderRadius: '0px',
    opacity: 0.8,
    display: 'block',
    color: 'white'
};

const components = {
    event: CalendarEvent
};

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { event: { events, activeEvent } } = useSelector(state => state);

    const myEventsList = events;

    const [lastView, setlastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const eventStyleGetter = (event, start, end, isSelected) => {
        return {
            style
        };
    };

    const handleDoubleClick = (event, e) => {
        // console.log(event);
        dispatch(uiOpenModal());
    };

    const handleSelect = (event, e) => {
        // console.log(event);
        dispatch(eventSetActive(event));
    };

    const handleSelectSlot = (slotInfo) => {
        // console.log(slotInfo);
        dispatch(eventClearActive());
    };

    const handleView = (view) => {
        // console.log(view);
        setlastView(view);
        localStorage.setItem('lastView', view);
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                /*  style={{ height: 500 }} -> Toma el que esta en .rbc-calendar del archivo styles.css
                    esto se pudo ver desde el navegador web en la pestaña elements y detectar el nombre 
                    estilo que por default requiere el componente.
                */
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={components}
                onDoubleClickEvent={handleDoubleClick}
                onSelectEvent={handleSelect}
                onSelectSlot={handleSelectSlot}
                onView={handleView}
                view={lastView}
                selectable={true}
            />

            {activeEvent && < DeleteFloatingActionButton />}
            <PlusFloatingActionButton />

            <CalendarModal />
        </div>
    );
};