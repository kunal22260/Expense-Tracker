import {auth, googleProvider} from "../../config/firebase-config.js"
import {signInWithPopup} from 'firebase/auth'
import {useNavigate, Navigate} from 'react-router-dom'
import { useGetUserInfo } from "../../Hooks/useGetUserInfo.js"


export const Auth=()=>{
    const navigate = useNavigate();
    const { isAuth }=useGetUserInfo();
    const SignInWithGoogle= async()=>{
        const result= await signInWithPopup(auth, googleProvider)
        const authInfo={
            userID: result.user.uid,
            name: result.user.displayName,
            ProfilePic: result.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate("/expense-tracker");
    }
    if(isAuth){
        return <Navigate to="/expense-tracker"/>
    }
    return(
        <div className="login">
            <h1 className="login_h">Please Login with google</h1>
            <button className="login_button" onClick={SignInWithGoogle}> Sign In With Google</button>

        </div>
    )
}