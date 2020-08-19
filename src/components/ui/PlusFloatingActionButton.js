import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const PlusFloatingActionButton = () => {

    const dispatch = useDispatch();

    const handleEventAddNew = () => {
        dispatch(uiOpenModal());
    };

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleEventAddNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
