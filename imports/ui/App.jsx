import React from 'react';
import ContactForm from './ContactForm.jsx';
import { ContactList } from './ContactList.jsx';
import styles from "./css_modules/ContactForm.css"


//Contact: name, email, imageURL
export const App = () => (
  <>
    <div className={styles.container_head}>
      <h1>Ñequi</h1>
      <ContactForm/>
    </div>
      <ContactList/>
  </>
);
