import React, { useReducer } from 'react'
import uuid from 'uuid';
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
        ]
    }

    const [ state, dispatch ] = useReducer( contactReducer, initialState );

    // Add Contact

    // Delete Contact

    // set CUrrent Contact

    // clear contacts

    // update contact

    // filter contacts

    // clear contacts

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
