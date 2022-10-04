import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactList = () => {
  //Tracker es un recurso de meteor que permite sincronizarse con la base de datos y actualizarse cada que detecta un cambio
  let contacts = useTracker(() => {
    return ContactsCollection.find({}).fetch();
  });

  return (
    <div>
      <h3>Contact List</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email}
          </li> //Se debe agregar el key como props para que react no de error
        ))}
      </ul>
    </div>
  );  
};
