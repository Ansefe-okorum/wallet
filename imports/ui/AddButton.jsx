import React, { useState }from "react";
import Popup from 'reactjs-popup';
import styles from "./css_modules/AddButton.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//el trigger es el componente que se muestra al comienzo y el que activa el contenido que está en la función close
const AddButton = () => {
    const [addAmount, setAddAmount] = useState("");
    return(

        <Popup trigger= { <Button variant="contained">Add Money</Button> } modal nested > 
        {close => ( 
        <div className={styles.container}> 
            <Button variant="text" onClick={close} color="warning">Close</Button>
            <div className={styles.textico}> Add money to your wallet</div> 
            <p>Name</p>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth onChange={(e)=>{setAddAmount(e.target.value)}}/>
            <div className={styles.sendButton}>
                <Button variant="contained">Add</Button>
            </div>
        </div> )} 
        </Popup>
    
    ); 
};

export default AddButton;
