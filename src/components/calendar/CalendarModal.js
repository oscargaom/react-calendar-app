import React, { useState, useEffect } from 'react'

import moment from 'moment';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import { customStyles } from '../../helpers/modal-styles'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActive, eventUpdated } from '../../actions/events';

Modal.setAppElement("#root");

const today = moment().minutes(0).seconds(0).add(1, 'hour');
const todayPlus1Hr = today.clone().add(1, 'hour');

const initialEvent = {
    title: '',
    notes: '',
    start: today.toDate(),
    end: todayPlus1Hr.toDate()
};

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { ui: { modalOpen }, event: { activeEvent } } = state;

    /*  Las fechas se deben manejar en formato nativo de javaScript */
    const [initialDateTime, setInitialDateTime] = useState(today.toDate());
    const [finalDateTime, setFinalDateTime] = useState(todayPlus1Hr.toDate());
    const [dataValid, setDataValid] = useState(true);

    // console.log(state);

    const [formValues, setFormValues] = useState(initialEvent);

    const { notes, title } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
        else {
            setFormValues(initialEvent);
        }
    }, [activeEvent, setFormValues])

    // console.log('CalendarModal.today');
    // console.log(today);
    // console.log('CalendarModal.todayPlus1Hr');
    // console.log(todayPlus1Hr);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };


    const handleSubmitForm = (e) => {
        e.preventDefault();
        // console.log(formValues);
        // console.log(initialDate, finalDate);

        const { start, end } = formValues;

        if (moment(start).isSameOrAfter(moment(end))) {
            return Swal.fire('Error de fechas',
                'Le fecha final no puede ser mayor o igual que la fecha final',
                'error');
        }

        if (!title && title.trim().length < 2) {
            return setDataValid(false);
        }

        if (activeEvent) {
            dispatch(eventUpdated(formValues));
        } else {
            dispatch(eventAddNew({
                ...formValues,
                id: moment().toDate().getTime(),
                user: {
                    _id: "132",
                    name: "Manuel"
                }
            }));
        }

        setDataValid(true);
        handleRequestClose();
    };

    const handleAfterClose = () => {
        console.log('CalendarModal.handleAfterClose');
    };

    const handleRequestClose = () => {
        // console.log('CalendarModal.handleRequestClose');
        dispatch(uiCloseModal());
        dispatch(eventClearActive());
        setFormValues(initialEvent);
        setDataValid(true);
        // console.log(state);
    };

    const handleChangeDtStart = (value) => {
        // console.log('CalendarModal.handleChangeDtStart');
        // console.log(value);
        setInitialDateTime(value);
        /*  Este módulo se resuelve de esta manera porque los inputs son de tipo
            DateTimePicker y no se puede asociar con el name del input como con
            title y notes.
        */
        setFormValues({
            ...formValues,
            start: value
        });
    };

    const handleChangeDtEnd = (value) => {
        // console.log('CalendarModal.handleChangeDtEnd');
        // console.log(value);
        setFinalDateTime(value);
        setFormValues({
            ...formValues,
            end: value
        });
    };

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                style={customStyles}
                onAfterClose={handleAfterClose}
                onRequestClose={handleRequestClose}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1> Nuevo evento </h1>
                <hr />
                <form
                    className="container"
                    onSubmit={handleSubmitForm}
                >

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            className="form-control"
                            onChange={handleChangeDtStart}
                            value={initialDateTime}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            className="form-control"
                            onChange={handleChangeDtEnd}
                            minDate={initialDateTime}
                            value={finalDateTime}
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!dataValid && 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            value={title}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    )
}
