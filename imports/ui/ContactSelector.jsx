import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/Collections/ContactsCollection";
import styles from "./css_modules/ContactList.css";

export default function ContactSelector({destinationWallet, setDestinationWallet}) {

  const handleChange = (event) => {
    setDestinationWallet(event.target.value);
  };

  //Al subscribirse se ejecuta esa publicación desde el backend y el minimongo se carga unicamente con la información que este le permita
  const isLoading2 = useSubscribe("allContacts");




  //con useFind se está buscando la información pero dentro del minimongo, este ya contiene la información filtrada por el backend en el paso anterior
  const contacts = useFind(()=>{ //Este hook trae la información de la base de datos
    return ContactsCollection.find({}, {sort:{createdAt:-1}}); //Esto retorna un cursor
  }
  );
  
  if(isLoading2()){
    return <p>Loading...</p>  //AllContacts retornará esto mientras no se encuentre la información en la base de datos
  }



  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={destinationWallet}
          label="Select User"
          onChange={handleChange}
        >
            {contacts.map((contact)=>{
                return(
                    // en onChange se toma el value de "MenuItem" y se guarda en destinationWallet, el value del select es solo lo que se muestra como seleccionado
                    <MenuItem value={contact.walletId} key={contact._id}>  
                        <div className={styles.contactListTrans}>
                            <img src={contact.url} alt={contact.url}/>
                            <p>
                                {contact.name}
                            </p>
                        </div>
                    </MenuItem>
                );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
