import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";
import styles from "./css_modules/ContactList.css";

export const ContactList = () => {
  //Tracker es un recurso de meteor que permite sincronizarse con la base de datos y actualizarse cada que detecta un cambio
  let contacts = useTracker(() => {
    return ContactsCollection.find({}).fetch();
  });

  return (
    <div className={styles.container}>
      <h3>Contact List</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <img src={contact.url} alt={contact._id}/>
            <div>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
          </li> //Se debe agregar el key como props para que react no de error
        ))}
      </ul>
    </div>
  );
};
