import { useState, useRef, memo } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import styles from './contact-form.module.css';

const initialState = {
  name: '',
  number: '',
};

const ContactForm = ({ onChange }) => {
  const [contact, setContact] = useState(initialState);
  const nameInputId = useRef(nanoid());
  const numberInputId = useRef(nanoid());
  const handleChange = event => {
    const { value, name } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onChange(contact);
    resetForm();
  };

  const resetForm = () => {
    setContact(initialState);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputList}>
          <label className={styles.label} htmlFor={nameInputId.current}>
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={contact.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            id={nameInputId.current}
          />
        </div>
        <div className={styles.inputList}>
          <label className={styles.label} htmlFor={numberInputId.current}>
            Number
          </label>
          <input
            className={styles.input}
            type="tel"
            name="number"
            value={contact.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={handleChange}
            required
            id={numberInputId.current}
          />
        </div>
        <button className={styles.button} type="submit">
          Добавить контакт
        </button>
      </form>
    </>
  );
};


export default memo(ContactForm);

ContactForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};
