import PropTypes from "prop-types";

import styles from './contact-list.module.css'

const ContactList = ({ contacts, onDelete }) => {
  const contactsList = contacts.map(contact => (
      <li className={styles.item} key={contact.id}>
        <p className={styles.text}>{contact.name}: {contact.number}</p>
        <button className={styles.button} type="button" onClick={() => onDelete(contact.id)}>Delete</button>
      </li>
    ));
  return <ul className={styles.list}>{contactsList}</ul>;
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }
    )).isRequired,
    onDelete: PropTypes.func.isRequired,
}
