import React, { useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";

const ContactForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");

    const saveContact = () =>{
        setEmail("");
        setName("");
        setUrl("");
        ContactsCollection.insert({name, email, url});
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
