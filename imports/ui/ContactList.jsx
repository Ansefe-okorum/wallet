import React, { memo }from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";
import styles from "./css_modules/ContactList.css";
import { Meteor } from "meteor/meteor";

export const ContactList = () => {
  //Tracker es un recurso de meteor que permite sincronizarse con la base de datos y actualizarse cada que detecta un cambio
  // let contacts = useTracker(() => {
  //   return ContactsCollection.find({}, {sort:{createdAt:-1}}).fetch();
  // });

  const isLoading = useSubscribe("allContacts"); //Este hoock recibe el nombre del publish de la carpeta api, devuelve una función que si encuentra la información retorna false, mientras la está buscando retorna true;
  console.log(isLoading);
  const contacts = useFind(()=>{ //Este hook trae la información de la base de datos
    return ContactsCollection.find({}, {sort:{createdAt:-1}}); //Esto retorna un cursor
  }
  );

  if(isLoading()){
    return <p>Loading...</p>  //ContactList retornará esto mientras no se encuentre la información en la base de datos
  }

  const removeContact = (_id)=>{
    Meteor.call("remove.contact", {contactID: _id}, (errorResponse)=>{
      if(errorResponse){
        alert(errorResponse);  
      }
    })
  }

  const ContactItem = memo((props)=>{ //Se debe agregar el key como props para que react no de error
    return(
      <li key={props._id}>
        <img src={props.url} alt={props._id}/>
        <div>
          <p>{props.name}</p>
          <p>{props.email}</p>
        </div>
        <button onClick={()=> removeContact(props._id)}>Delete</button>
    </li> 
    );
  });
  

  return (
    <div className={styles.container}>
      <h3>Contact List</h3>
      <ul>
        {contacts.map((contact) => (
          <ContactItem _id={contact._id} name={contact.name} email={contact.email} url={contact.url}/>
        ))}
      </ul>
    </div>
  );
};
