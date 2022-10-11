import { mergeBreakpointsInOrder } from "@mui/system";
import { Mongo } from "meteor/mongo";
import { WalletsCollection } from "./WalletsCollection";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const TransactionsCollection = new Mongo.Collection("Transactions");

TransactionsCollection.before.insert(function(userId, transactionDocument){
    //before.insert sirve para ejecutar código antes de que se interte el documento a la base de datos, se puede modificar el documento e incluso intertar info en otras bases de datos
    //userId es undefined y transactionDocument es el documento completo que se le envía al call method que hace un insert.
    console.log("este es el user id:" ,userId);
    console.log("este es el documento: ",transactionDocument.sourceWalletId);
    //obtenemos el cocumento que corresponde al walletId que envía el dinero, se le puede pasar al "findOne" el id entre paréntesis (mágia)
    //o se le envía una query para filtrar el documento (normal)
    const sourceWallet = WalletsCollection.findOne({_id:transactionDocument.sourceWalletId});
    if(transactionDocument.type === "add"){
        WalletsCollection.update({_id: transactionDocument.sourceWalletId},{$inc:{balance: transactionDocument.amount}});
    }else{
        if(sourceWallet.balance < transactionDocument.amount){
            throw new Meteor.Error("Insufficiente founds");
        }else{
            WalletsCollection.update({_id: transactionDocument.sourceWalletId},{$inc:{balance: -transactionDocument.amount}});
            WalletsCollection.update({walletId: transactionDocument.destinationWalletId},{$inc:{balance:transactionDocument.amount}});
        }
    }  

});

const TransacionSchema = new SimpleSchema({
    type:{
        type: String,
        allowedValues: ["add", "transfer"],
        optional: true
    },
    sourceWalletId:{
        type: String
    },
    destinationWalletId:{
        type: String,
        optional: true
    },
    amount:{
        type: Number
    },
    createdAt:{
        type: Date
    }
});

//aldee:collection2 permite utilizar attatchSchema para hacer "clean" y "validation" de la información automáticamente.

TransactionsCollection.attachSchema(TransacionSchema);

