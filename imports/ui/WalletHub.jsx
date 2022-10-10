import React from "react";
import AddButton from "./AddButton.jsx";
import TransferButton from "./TransferButton.jsx";
import styles from "./css_modules/WalletHub.css";
import { Typography } from "@mui/material";
import { WalletsCollection } from "../api/WalletsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";

const WalletHub = () => {
  const isLoading = useSubscribe("wallets");

  const [wallet] = useFind(() => {
    return WalletsCollection.find({});
  });

  if(isLoading()){
    return <p>Loading...</p>  //ContactList retornará esto mientras no se encuentre la información en la base de datos
  }

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <Typography variant="h6">Main Account</Typography>
        <div className={styles.card}>
          <div className={styles.subcard}>
            <div className={styles.walletid}>
              <Typography variant="subtitle1">Wallet ID</Typography>
              <Typography variant="h5">{wallet._id}</Typography>
            </div>
          </div>
          <Typography variant="h5">{wallet.balance} {wallet.currency}</Typography>
        </div>
        <div className={styles.buttons}>
          <AddButton />
          <TransferButton sourceWallet={wallet._id}/>
        </div>
      </div>
    </div>
  );
};

export default WalletHub;
