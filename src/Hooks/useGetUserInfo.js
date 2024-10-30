export const useGetUserInfo=()=>{
    const {name, ProfilePic, userID, isAuth}=JSON.parse(localStorage.getItem("auth")) || {};
    return {name, ProfilePic, userID, isAuth};
}