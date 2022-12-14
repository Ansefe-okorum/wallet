import React, { memo }from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/Collections/ContactsCollection";
import styles from "./css_modules/ContactList.css";
import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../api/Collections/WalletsCollection";
import { Typography } from "@mui/material";


export const ContactList = () => {
  //Tracker es un recurso de meteor que permite sincronizarse con la base de datos y actualizarse cada que detecta un cambio
  // let contacts = useTracker(() => {
  //   return ContactsCollection.find({}, {sort:{createdAt:-1}}).fetch();
  // });

  //Al subscribirse se ejecuta esa publicación desde el backend y el minimongo se carga unicamente con la información que este le permita
  const isLoading3 = useSubscribe("allContacts"); //Este hoock recibe el nombre del publish de la carpeta api, devuelve una función que si encuentra la información retorna false, mientras la está buscando retorna true;
  

  //con useFind se está buscando la información pero dentro del minimongo, este ya contiene la información filtrada por el backend en el paso anterior
  const contacts = useFind(()=>{ //Este hook trae la información de la base de datos
    return ContactsCollection.find({}, {sort:{createdAt:-1}}); //Esto retorna un cursor
  }
  );

  const isLoading4 = useSubscribe("wallets");
  const wallets = useFind(()=>{
    return WalletsCollection.find({});
  });

  if(isLoading3() || isLoading4()){
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
      <li>
        <img src={props.url} alt={props._id}/>
        <div>
          <p>Name: {props.name}</p>
          <p>Email: {props.email}</p>
          <p>Wallet Id: {props.walletId}</p>
        </div>
        <Typography variant="h5">{props.balance} USD</Typography>
        <button onClick={()=> removeContact(props._id)}>Delete</button>
    </li> 
    );
  });
  

  return (
    <div className={styles.container}>
      <h3>Contact List</h3>
      <ul>
        {contacts.map((contact, index) => {
          const wallet = wallets.filter((objeto)=>contact.walletId==objeto.walletId);
          return(
            <ContactItem key={contact._id} name={contact.name} email={contact.email} url={contact.url} _id={contact._id} walletId={contact.walletId} balance={wallet[0].balance}/>
          )
        }
        )}
      </ul>
    </div>
  );
};
