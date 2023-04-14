import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFollowing } from "../../store/follower";


function GetFollowing(userId){ 
    const dispatch = useDispatch();
    const allFollowing = useSelector(state => state.follows.following)

    useEffect(() => { 
        dispatch(getAllFollowing(userId.userId))
    }, [dispatch])

    return (
        <div>
            <ul>
            {allFollowing?.map(follower => (
                <li>{follower.username}</li>
            ))}
            </ul>
        </div>
    )
}


export default GetFollowing
