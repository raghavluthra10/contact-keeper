import React, { useReducer } from 'react'
import {v4 as uuid} from "uuid"; 
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER } from '../types';

const ContactState = (props) => {

    const initialState = {
        contacts: [
            {
                id: 1, 
                name: "raghav",
                phone: "33242434442",
                email: 'raghav@raghav.com',
                type: 'personal'
            },
            {
                id: 2, 
                name: "arjun",
                phone: "99999999",
                email: 'arjun@arjun.com',
                type: 'personal'
            },
            {
                id: 3, 
                name: "bobby",
                phone: "777777777",
                email: 'bobby@bobby.com',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    }

    const [ state, dispatch ] = useReducer( contactReducer, initialState );

    // Add Contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact })
    };

    // Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    };

    // set CUrrent Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    };

    // clear contacts
    const clearCurrent = contact => {
        dispatch({ type: CLEAR_CURRENT })
    };

    // update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    };

    // filter contacts
    const filterContacts = contact => {
        dispatch({ type: FILTER_CONTACTS, payload: contact })
    };

    // clear contacts
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            clearCurrent,
            setCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
