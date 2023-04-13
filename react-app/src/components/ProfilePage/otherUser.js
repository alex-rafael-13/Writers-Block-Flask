import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { getSingleUser } from "../../store/users"
import { getAllFollower, getAllFollowing } from "../../store/follower"
import GetFollower from "../FollowSection/getFollower"
import GetFollowing from "../FollowSection/getFollowing"
import OpenModalButton from "../OpenModalButton"

function UsersProfile(){ 
    const { userId } = useParams()
    const dispatch = useDispatch()
    const allFollwers = useSelector(state => state.follows.followers)
    const allFollowing = useSelector(state => state.follows.following)
    const allUser = useSelector(state => state.users.user)
    let currentUser = allUser[0]
    
    console.log(currentUser)
    useEffect(() => { 
        dispatch(getSingleUser(userId))
        dispatch(getAllFollower(userId))
        dispatch(getAllFollowing(userId))
    }, [dispatch])

    const replaceIconIfNull = () => { 
        if (!currentUser.icon){ 
            return <img className='user-icon-placeholder' src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"></img>
        }else { 
            return <img src={currentUser.icon}></img>
        }
    }
   
    if(!currentUser || !currentUser.stories)return null

    const openFollowerModal = () => { 
        return <OpenModalButton 
        buttonText='follower'
        modalComponent={<GetFollower userId={currentUser.id}/>}
        />
    }

    const openFolloingModal = () => { 
        return <OpenModalButton 
        buttonText='following'
        modalComponent={<GetFollowing userId={currentUser.id}/>}
        />
    }

    return (
        <div>
        <h1>Profile</h1>
        {replaceIconIfNull()}
        <h3>{currentUser.firstname} {currentUser.lastname}</h3>
        <h3>Email: {currentUser.email}</h3>
        <h3>Bio: {currentUser.bio}</h3>
        <h4>{openFollowerModal()}:{allFollwers.length} {openFolloingModal()}: {allFollowing.length}</h4>

        <div className='navbar-in-profile'>
        {currentUser?.stories?.map(story => (
            <NavLink exact to={`/stories/${story.id}`}>
                  <div className="story-card" key={story.id}>
                    <h3>{story.title}</h3>
                    <img className='preview-image' src={!story.image?'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg' : story.image } alt='image.txt'></img>
                    <div className='author-name'>By {story.username}</div>
                    <div className='genres-cont'>
                     
                    </div>
                  </div>
                </NavLink>))}
                </div>
                </div>
    )
}


export default UsersProfile
