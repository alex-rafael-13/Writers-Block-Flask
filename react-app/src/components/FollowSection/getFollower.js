import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { getAllFollower, getAllFollowing } from "../../store/follower";


function GetFollower(userId){ 
    const dispatch = useDispatch();
    const allFollwer = useSelector(state => state.follows.followers)

    useEffect(() => { 
        dispatch(getAllFollower(userId.userId))
    }, [dispatch])

    return (
        <div>
            <ul>
            {allFollwer?.map(follower => (
                <li>{follower.username}</li>
            ))}
            </ul>
        </div>
    )
}


export default GetFollower
