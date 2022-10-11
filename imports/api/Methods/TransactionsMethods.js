import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TransactionsCollection } from "../Collections/TransactionsCollection.js";

Meteor.methods({
    'Transactions.insert'({sourceWalletId, destinationWalletId, amount}){
        if(!destinationWalletId){
            throw new Meteor.Error("Destination Wallet is Needed");
        }
        if(!sourceWalletId){
            throw new Meteor.Error("Source Wallet is Needed");
        }
        if(amount<=0 || !amount){
            throw new Meteor.Error("Amount can't be 0 or negative")
        }
        return TransactionsCollection.insert({
            type: "transfer",
            sourceWalletId,
            destinationWalletId,
            amount,
            createdAt: new Date()
        })
    },
    'Transactions.insertAdd'({sourceWalletId, addAmount}){
        if(addAmount<=0 || !addAmount){
            throw new Meteor.Error("Amount can't be 0 or negative")
        }
        return TransactionsCollection.insert({
            type: "add",
            sourceWalletId,
            amount: addAmount,
            createdAt: new Date()
        })
    }

})