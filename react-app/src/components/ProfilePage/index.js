import { useDispatch, useSelector } from "react-redux"
import './profile.css'
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
import { currentUserComment } from "../../store/comment"
import { getCurrentUseStory } from "../../store/story"


function ProfilePage(){ 
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)    
    const allStories = useSelector(state => state.stories.current)
    const allComments = useSelector(state => state.comments.current)
    const [toggleStory, setToggleStory] = useState(true)
    const [toggleComment, setToggleComment] = useState(false)
    
    console.log(allComments)
    
    const clickComment = () => { 
        setToggleComment(true)
        setToggleStory(false)
    }

    const clickStory = () => { 
        setToggleStory(true)
        setToggleComment(false)
    }

    useEffect(() => {
        dispatch(getCurrentUseStory())
        dispatch(currentUserComment())
    },[dispatch])
    

 
    const replaceIconIfNull = () => { 
        if (!currentUser.icon){ 
            return <img className='user-icon-placeholder' src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"></img>
        }else { 
            return <img src={currentUser.icon}></img>
        }
    }

    const nostory = () => {
         if(toggleStory && !allStories.length){ 
        return <h1>You dont have any story</h1>
     }
}
    const noComment = () => {
         if(toggleComment && !allComments.length){ 
        return <h1>You dont have any comment</h1>
     }
}

    return (
        <div>
        <h1>Profile</h1>
        {replaceIconIfNull()}
        <h3>{currentUser.firstname} {currentUser.lastname}</h3>
        <h3>Email: {currentUser.email}</h3>
        <h3>Bio: {currentUser.bio}</h3>
        <div className='navbar-in-profile'>

        <button onClick={clickStory}>Story</button>
        <button onClick={clickComment}>Comments</button>
        {nostory()}
        {noComment()}
        {toggleStory? allStories?.map(story => (
                <NavLink exact to={`/stories/${story.id}`}>
                  <div className="story-card" key={story.id}>
                    <h3>{story.title}</h3>
                    <img className='preview-image' src={!story.image?'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg' : story.image } alt='image.txt'></img>
                    <div className='author-name'>By {story.username}</div>
                    <div className='genres-cont'>
                      {story.genres.map(genre => (
                        <nav key={genre} className={`genre ${genre}`}>{genre}</nav>
                        ))}
                    </div>
                  </div>
                </NavLink>)):null}

        
        {toggleComment? allComments?.map(comment => (
                <div key={comment.username}className="comment-body">
                    <div className="user-comment">Story Name: {comment.story}</div>
                    <div className="comment-contents">Comment: {comment.comment}</div>
                </div>
            )):null}
            
        </div>
        </div>
    )
}


export default ProfilePage;
