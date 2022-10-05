import React, { useState } from "react";
import styles from "./css_modules/ContactForm.css"
import { Meteor } from "meteor/meteor"

const ContactForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");

    const saveContact = () =>{
      //ContactsCollection.insert({name, email, url}); // Esta línea no debería estar en el lado del cliente, por esta razón 
      //se crea en lugar de esto, un llamado a un método de meteor que se crea en la carpeta "api" y se invoca en el lado del servidor
      Meteor.call('insert.contact', {name, email, url}, (errorResponse)=>{
        if(errorResponse){
          alert(errorResponse.error);
        }else{
          setEmail("");
          setName("");
          setUrl("");
        }
      })  //Esto es el equivalente a utilizar fetch, llamamos a un método, envíamos parámetros y recibimos un error
    }


  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={(e)=>{setName(e.target.value)}} value={name} />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
      </div>

      <div>
        <label htmlFor="imgURL">Image URL</label>
        <input type="text" id="imgURL" onChange={(e)=>{setUrl(e.target.value)}} value={url}/>
      </div>

      <div>
        <button type="button" onClick={saveContact}>Save Contact</button>
      </div>
    </form>
  );
};

export default ContactForm;
