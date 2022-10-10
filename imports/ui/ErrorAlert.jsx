import React from "react";
import Alert from '@mui/material/Alert';

const ErrorAlert = ({error})=>{
    return(
        <Alert severity="error">{error}</Alert>
    )    
}

export default ErrorAlert;