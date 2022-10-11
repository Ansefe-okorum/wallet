import React, { useState }from "react";
import Popup from 'reactjs-popup';
import styles from "./css_modules/AddButton.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Meteor } from "meteor/meteor";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

//el trigger es el componente que se muestra al comienzo y el que activa el contenido que está en la función close
const AddButton = (props) => {
    const [addAmount, setAddAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const addMoney = ()=>{
        Meteor.call('Transactions.insertAdd', {sourceWalletId:props.sourceWallet, addAmount}, (errorResponse)=>{
            if(errorResponse){
                setError(errorResponse.error);
                setTimeout(()=>setError(""), 4000);
            }else{
                setAddAmount("");
                setSuccess("Money Added");          
                setTimeout(()=>setSuccess(""), 4000);
            }
        });
    }
    return(

        <Popup trigger= { <Button variant="contained">Add Money</Button> } modal nested > 
        {close => ( 
        <div className={styles.container}> 
            <Button variant="text" onClick={close} color="warning">Close</Button>
            {error && <ErrorAlert error={error}/>}
            {success && <SuccessAlert success={success}/>}
            <div className={styles.textico}> Add money to your wallet</div>
            <TextField id="outlined-basic" label="Amount" variant="outlined" fullWidth onChange={(e)=>{setAddAmount(Number(e.target.value))}} type="number" value={addAmount}/>
            <div className={styles.sendButton}>
                <Button onClick={addMoney} variant="contained">Add</Button>
            </div>
        </div> )} 
        </Popup>
    
    ); 
};

export default AddButton;
