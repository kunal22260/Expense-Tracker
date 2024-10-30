import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useAddTransaction=()=>{
    let transactionRef=collection(db, "Transactions");
    const {userID}= useGetUserInfo();
    const addTransaction=async({description, amount, type})=>{
        await addDoc(transactionRef,{
            userID,
            description,
            amount,
            type,
            createdAt:serverTimestamp(),
        });
    }
    return{addTransaction};
}
