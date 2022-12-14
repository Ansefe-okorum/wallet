import React, { useState } from "react";
import Popup from 'reactjs-popup';
import styles from "./css_modules/AddButton.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContactSelector from "./ContactSelector";
import { Meteor } from "meteor/meteor";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

//el trigger es el componente que se muestra al comienzo y el que activa el contenido que está en la función close
const TransferButton = (props) => {
    const [transferAmount, setTransferAmount] = useState("");
    const [destinationWallet, setDestinationWallet] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const tranferMoney = (e)=>{
        Meteor.call('Transactions.insert', {sourceWalletId: props.sourceWallet, destinationWalletId: destinationWallet, amount: transferAmount}, (errorResponse)=>{
            
            if(errorResponse){
                setError(errorResponse.error);
                setTimeout(()=>setError(""), 4000);
            } else{
                setDestinationWallet("");
                setTransferAmount(0);
                setSuccess("Succesful Transaction");          
                setTimeout(()=>setSuccess(""), 4000);
            }
        })
    
    }

    return(

        <Popup trigger={<Button variant="contained">Transfer Money</Button>} modal nested > 
        {close => ( 
        <div className={styles.container}> 
            <Button variant="text" onClick={close} color="warning">Close</Button>
            {error && <ErrorAlert error={error}/>}
            {success && <SuccessAlert success={success}/>}
            <div className={styles.textico}> Destination Wallet</div>
            
            {/* El siguiente componente recibe como props, el state y el set state, ya que este valor es utilizado en ambos componentes y no se puede recibir información en ambos sentidos */}
            
            <ContactSelector destinationWallet={destinationWallet} setDestinationWallet={setDestinationWallet}/>
            <p>Name</p>
            <TextField id="outlined-basic" label="Amount" variant="outlined" type="number" fullWidth onChange={(e)=>{setTransferAmount(Number(e.target.value))}} value={transferAmount}/>
            <div className={styles.sendButton}>
                <Button variant="contained" onClick={tranferMoney}>Send</Button>
            </div>
        </div> )} 
        </Popup>
    
    ); 
};

export default TransferButton;