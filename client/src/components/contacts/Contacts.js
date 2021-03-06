import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const  { contacts,filtered } = contactContext;

    if(contacts.length === 0) {
        return <h4> Please add a contact </h4>
    }

    return (
    <>
        <TransitionGroup>
            {filtered !== null ? filtered.map(contact => (
                <CSSTransition  key={contact.id} timeout={500} classNames="item">
                    <ContactItem contact={contact} />
                </CSSTransition>
            )) : contacts.map(c => (
                <CSSTransition  key={c.id} timeout={500} classNames="item">
                    <ContactItem contact={c} />
                </CSSTransition>
            ))}
        </TransitionGroup>
        
    </>
    )
}

export default Contacts
