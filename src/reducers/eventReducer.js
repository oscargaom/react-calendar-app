import moment from 'moment';
import { types } from '../types/types';


const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Mi cumple',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        /*  A continuación agregamos los recursos adicionales 
            que utilizaremos de manera personalizada conforme 
            nuestras necesidades en la aplicación.
        */
        notes: 'Comprar pastel',
        user: {
            _id: "3Fa3R25ft",
            name: "Oscar"
        }
    }],
    activeEvent: null
};

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            };
            case types.eventClearActive:
                return {
                    ...state,
                    activeEvent: null
                };
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( event => event.id === action.payload.id ? action.payload : event)
            };
        case types.eventDeleted:
            return {
                ...state, 
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            };
        default:
            return state;
    }
};