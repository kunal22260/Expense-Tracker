import { useEffect, useState } from "react"
import {collection, where, query, orderBy, onSnapshot} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransaction=()=>{
    const [transactions, setTransactions]=useState([]);
    const [transactionTotals, setTransactionTotals]=useState({
        balance:0.0,
        credit:0.0,
        debit:0.0,
    });
    let transactionRef=collection(db, "Transactions");
    const {userID}= useGetUserInfo();
    const getTransactions=async()=>{
        let unsubscribe;
        try {
            const queryTran=query(transactionRef, where("userID","==",userID ), orderBy("createdAt"))
            unsubscribe=onSnapshot(queryTran,(snapshot)=>{

                let docs=[];
                let totalIncome = 0;
                let totalExpenses = 0;
                snapshot.forEach((doc)=>{
                    const data=doc.data();
                    const id=doc.id;
                    docs.push({...data,id});
                    if (data.type === "debit") {
                        totalExpenses += Number(data.amount);
                      } else {
                        totalIncome += Number(data.amount);
                      }
                      
                });
                setTransactions(docs)
                let balance = totalIncome - totalExpenses;
                setTransactionTotals({
                    balance,
                    debit: totalExpenses,
                    credit: totalIncome,
                      });  
            });    
        } catch (error) {
            console.error(error)
        }
        return()=>{unsubscribe();}
    }
    useEffect(()=>{
        getTransactions();
    }, [])
    return {transactions,transactionTotals};
}