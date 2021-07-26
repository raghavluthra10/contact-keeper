import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const  { contacts } = contactContext;

    return (
        <>
            {contacts.map(c => (
                <ContactItem key={c.id} contact={c} />
            ))}
        </>
    )
}

export default Contacts
