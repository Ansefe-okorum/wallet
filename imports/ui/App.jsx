import React from 'react';
import ContactForm from './ContactForm.jsx';
import { ContactList } from './ContactList.jsx';

//Contact: name, email, imageURL
export const App = () => (
  <div>
    <h1>Meteor Wallet 2.0</h1>
    <ContactForm/>
    <ContactList/>
  </div>
);
