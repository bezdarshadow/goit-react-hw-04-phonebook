import { useState, useEffect, useRef, useMemo } from 'react';
import { nanoid } from 'nanoid';

import ContactFilter from './ContactFilter';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

import styles from './phonebook.module.css';

const Phonebook = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const firstRenderRef = useRef(true)

  useEffect(() => {
    if(firstRenderRef.current){
      const contacts = localStorage.getItem('contacts')
      const parsedContacts = JSON.parse(contacts)
      if(parsedContacts){
        setContacts(parsedContacts)
      }
      firstRenderRef.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts))

  }, [contacts])
 
  const addContact = newContact => {
    const newCont = {
      ...newContact,
      id: nanoid(),
    };
    if (contacts.find(contact => contact.name === newCont.name)) {
      alert(`${newCont.name} is already in contacts`);
      return;
    }

    setContacts(state => [...state, newCont])
  };
  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };
  const changeFilter = event => {
    const { value } = event.target;
    setFilter(value)
  };
  const filteredContacts = useMemo(() => {
    const normalizeFilter = filter.toLowerCase();
    const contactsList = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
    return contactsList;
  }, [filter, contacts]);

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Phonebook</h2>
      <ContactForm onChange={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <ContactFilter value={filter} onChange={changeFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};

export default Phonebook;
