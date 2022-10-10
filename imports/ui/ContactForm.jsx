import React, { useState } from "react";
import styles from "./css_modules/ContactForm.css"
import { Meteor } from "meteor/meteor"
import WalletHub from "./WalletHub.jsx";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ContactForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [walletId, setWalletId] = useState("");

    //estado para errores
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const saveContact = () =>{
      //ContactsCollection.insert({name, email, url}); // Esta línea no debería estar en el lado del cliente, por esta razón 
      //se crea en lugar de esto, un llamado a un método de meteor que se crea en la carpeta "api" y se invoca en el lado del servidor
      Meteor.call('insert.contact', {name, email, url, walletId}, (errorResponse)=>{
        if(errorResponse){
          setError(errorResponse.error);
          setTimeout(()=>setError(""), 4000);
        }else{
          setEmail("");
          setName("");
          setUrl("");
          setWalletId("");
          setSuccess("Contact Saved");
          setTimeout(()=>setSuccess(""), 4000);
        }
      })  //Esto es el equivalente a utilizar fetch, llamamos a un método, envíamos parámetros y recibimos un error
    }


  return (
    <div>
      <WalletHub/>
      <div className={styles.alerts}>
        {error&&<ErrorAlert error={error}/>}
        {success&&<SuccessAlert success={success}/>}
      </div>
      <form>
        <div>
          <TextField id="filled-basic" label="Name" variant="outlined" onChange={(e)=>{setName(e.target.value)}} color="secondary" focused sx={{ input: { color: 'white' } }} value={name}/>
        </div>

        <div>
          <TextField id="filled-basic" label="Email" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}} color="secondary" focused sx={{ input: { color: 'white' } }} value={email}/>
        </div>

        <div>
          <TextField id="filled-basic" label="Img Url" variant="outlined" onChange={(e)=>{setUrl(e.target.value)}} color="secondary" focused sx={{ input: { color: 'white' } }} value={url}/>
        </div>

      </form>
        <div className={styles.wallet_button}>
          <div className={styles.walletInput}>
            <TextField id="filled-basic" label="Wallet ID" variant="outlined" onChange={(e)=>{setWalletId(e.target.value)}} color="secondary" focused sx={{ input: { color: 'white' } }} value={walletId} fullWidth/>
          </div>
            <Button variant="contained" onClick={saveContact}>Save Contact</Button>
        </div>

      </div>  
  );
};

export default ContactForm;
