import { useAddTransaction } from "../../Hooks/useAddTransaction"
import { useState } from "react";
import { useGetTransaction } from "../../Hooks/useGetTransaction";
import { useGetUserInfo } from "../../Hooks/useGetUserInfo";
import "./style.css"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
export const ExpenseTracker=()=>{
    const {addTransaction} = useAddTransaction();
    const{transactions,transactionTotals}=useGetTransaction();
    const { balance, credit, debit } = transactionTotals;
    const [description, setDescription]=useState("")
    const [amount, setAmount]=useState(0)
    const [type, setType]=useState("debit")   
    const {name, ProfilePic}= useGetUserInfo();
    const navigate=useNavigate();
    const onSubmit =(e)=>{
        e.preventDefault();
        addTransaction({
            description,
            amount,
            type,                    
        });
        setDescription("");
        setAmount("");
    };
    const SignOut=async()=>{
        await signOut(auth);
        localStorage.clear();
        navigate("/");
    }
    return(
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1>{name}'s Expense Tracker</h1>
                <div className="balance">
                    <h3>Your Balance: </h3>
                    <h2>{balance} Rs</h2>
                </div>
                <div className="summary">
                    <div className="credit">
                        <h4>Credit: </h4>
                        <p>{credit} Rs</p>
                    </div>
                    <div className="debit">
                        <h4>Debit: </h4>
                        <p>{debit} Rs</p>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Description" required onChange={(e)=>{setDescription(e.target.value)} }className="input-1" value={description}/>
                    <input type="number" placeholder="Amount" required onChange={(e)=>{setAmount(e.target.value)}}className="input-1" value={amount}/>
                    <br />
                    <div className="radio-input">
                    <label className="label">
                    <input type="radio" id="debit" value="debit" checked={type === "debit"} onChange={(e)=>{setType(e.target.value)}} className="input"/>
                    <p className="text"> Debit</p></label>
                    
                    <label className="label">
                    <input type="radio" id="credit" value="credit" checked={type === "credit"} onChange={(e)=>{setType(e.target.value)}} className="input"/>
                    <p className="text"> Credit</p></label>
                    <br />
                    </div>
                    <button type="submit">Add Transaction</button>
                </form>
            </div>
            <div className="cardo">
            {ProfilePic && <div className="card__content"><img src={ProfilePic}className="profile-photo" alt="" />
            <button className="signout" onClick={SignOut}>Sign Out</button>
           
                </div>}
            </div>
        </div>
        <div className="transactions">
                <h3 className="tran">Transactions</h3>
                <ul>
                    {transactions.map((transactions)=>{
                        const {description,amount,type}=transactions;
                        return(
                        <li>
                            <h4>{description}</h4>
                            <p>{amount} Rs.</p><label style={{color: type==="debit" ? "red" : "green"}}>{type}</label>
                        </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}