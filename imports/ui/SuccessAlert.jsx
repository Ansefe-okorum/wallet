import React from "react";
import Alert from '@mui/material/Alert';

const SuccessAlert = ({success}) =>{
    return(
        <Alert severity="success">{success}</Alert>
    )    
}

export default SuccessAlert;