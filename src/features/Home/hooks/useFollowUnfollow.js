import { useSelector } from "react-redux";
import { useFollowUnfollowUserMutation } from "../../../../store/profileApiSlice";

const useFollowUnfollow = () => {

    const [followUnfollowUser] = useFollowUnfollowUserMutation();
    const currentUser = useSelector((state)=> state.user.user.username);
    //console.log("CURR USER FROM HOOK", currentUser);


    const ToggleFollow = async(userId , userName)=>{
        //console.log(userName , userId, "IN HOOK FUNC");
        try {
          const res = await followUnfollowUser({userId : userId , currentUser : currentUser, userName : userName}).unwrap();
          return res;
        } catch (error) {
          console.log(error);
        }
    }

    return {ToggleFollow }

}


export default useFollowUnfollow;