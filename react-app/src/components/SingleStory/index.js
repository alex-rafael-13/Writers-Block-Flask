import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveOneStory } from "../../store/story"
import { NavLink, useParams, Link } from "react-router-dom"
import './SingleStory.css'
import CommentSection from "../CommentSection"
import OpenModalButton from "../OpenModalButton"
import CreateComment from "../CommentSection/createComment"
import DelelteAComment from "../CommentSection/deleteComment"
import { setAllComment } from "../../store/comment"
import UpdateComment from "../CommentSection/updateComment"
import { allLikesInStory, createALike, deleteALike } from "../../store/like"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { createFollow, deleteFollow, getAllFollower } from "../../store/follower"


export default function SingleStory() {
    const history = useHistory()
    const { storyId } = useParams()
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes.like)
    const [liked, setLiked] = useState(false)
    const allFollwers = useSelector(state => state.follows.followers)

    

    useEffect(() => {
        dispatch(retrieveOneStory(parseInt(storyId)))
        dispatch(allLikesInStory(parseInt(storyId)))
        dispatch(getAllFollower(story?.story?.user_id))
    }, [dispatch])

    // let imgUrl
    // if (story.story && story.story.image && story.story.image === null) {
    //     imgUrl = 'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg'
    // } else {
    //     imgUrl = story.image
    // }
    // console.log(imgUrl)
    // console.log(story.image)

    
    const storyContent = story?.story


    let commented = false;
    if(story.comments && currentUser){ 
        story.comments.forEach(comment => { 
            if(comment.username === currentUser.username){ 
                commented = true
            }
        })
    }
    
    const createCommentModal = () => { 
        return <OpenModalButton 
        buttonText="Comment"
        modalComponent={<CreateComment storyId={storyId}/>}
        />
    }
    
    const deleteCommentModal = () => { 
        return <OpenModalButton 
        buttonText='Delete'
        modalComponent={<DelelteAComment storyId={storyId}/>}
        />
    }
    
    const updateCommentModal = () => { 
        return <OpenModalButton 
        buttonText='Update'
        modalComponent={<UpdateComment storyId={storyId} />}
        />
}

const clickToLike = async () => { 
    if(!liked){ 
        const payload = { 
            user_id: currentUser.id,
            story_id: storyId
        }
        await dispatch(createALike(payload,storyId))
        .then(setLiked(true))
    }
    if(liked){ 
        await dispatch(deleteALike(storyId))
        .then(setLiked(false))
    }
}


const followUser = async () =>  { 
    if(!currentUser){ 
        history.push('/login')
}else{
    const payload = { 
        follower_id: currentUser.id,
        following_id: story.story.user_id
    }
    await dispatch(createFollow(payload, currentUser.id))
}
}

 const deleteUser = async () => { 
     if(!currentUser){ 
    history.push('/login')
}else{
    await dispatch(deleteFollow(currentUser.id))
}
}

const followedOrNot = () => { 
    if(!currentUser){ 
        history.push('/login')
    }
    let followed = allFollwers?.filter(follower => currentUser && follower.id === currentUser.id)
    
    if(followed.length){ 
        return <button  className='button-55' onClick={deleteUser}>Unfollow</button>
    }else { 
        return <button  className='button-55' onClick={followUser}>Follow</button>
    }
}


    return (
        <div className="single-story-cont">
            <div className="title-genre-cont">
                <h1>{storyContent?.title}</h1>
                <div className="single-story-genres">
                    {story?.genre?.map(genre => (
                        <div key={genre} className={`genre ${genre}`}>{genre}</div>
                    ))}

                </div>
            </div>
            <img className="story-image" src={!story?.story?.image? 'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg': story?.story?.image} alt='story-img' />
            <div className="author-like-button">
            
               <div className="author-cont"><Link to={`/${story?.story?.user_id}/profile`} className="author-cont">By {story?.user}</Link>{followedOrNot()}</div>
                <div className="likes-cont">
                    <div className="like-button">
                        {currentUser?
                        <button className='like-button-1' onClick={clickToLike}>
                        {!liked?
                         <i class="fa-solid fa-heart" style={{ color: '#070707' }}>{story.likes}</i>
                         :<i class="fa-solid fa-heart" style={{ color: '#ed0202' }}>{story.likes}</i>}
                         </button>
                        :<div>Likes: {story.likes}</div>}
                        </div>
                </div>
            </div>
            <div className="story-content-cont">
                {storyContent?.content}
            </div>
            <hr></hr>
            {/* <CommentSection comments={story?.comments} /> */}
            <div className="comments-section">
            <h3>Comments</h3>
            {!commented&& currentUser?createCommentModal():null}
            {story?.comments?.map(comment => (
                <div key={comment.username}className="comment-body">
                    <div className="user-comment">{comment.username}</div>
                    <div className="comment-contents">{comment.comment}</div>
                   
                    {commented && comment.username === currentUser.username?
                     deleteCommentModal() : null}
                    {commented && comment.username === currentUser.username?
                     updateCommentModal() : null}
                    <hr></hr>
                </div>
            ))}
        </div>
        </div>

    )
}
