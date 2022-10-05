import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";
import styles from "./css_modules/ContactList.css";
import { Meteor } from "meteor/meteor";

export const ContactList = () => {
  //Tracker es un recurso de meteor que permite sincronizarse con la base de datos y actualizarse cada que detecta un cambio
  let contacts = useTracker(() => {
    return ContactsCollection.find({}, {sort:{createdAt:-1}}).fetch();
  });

  const removeContact = (_id)=>{
    Meteor.call("remove.contact", {contactID: _id}, (errorResponse)=>{
      if(errorResponse){
        alert(errorResponse);  
      }
    })
  }
  

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
            <button onClick={()=> removeContact(contact._id)}>Delete</button>
          </li> //Se debe agregar el key como props para que react no de error
        ))}
      </ul>
    </div>
  );
};
