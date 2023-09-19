import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveOneStory } from "../../store/story"
import { NavLink, useParams, Link } from "react-router-dom"
import './SingleStory.css'
import OpenModalButton from "../OpenModalButton"
import CreateComment from "../CommentSection/createComment"
import DelelteAComment from "../CommentSection/deleteComment"
import UpdateComment from "../CommentSection/updateComment"
import { allLikesInStory, createALike, deleteALike } from "../../store/like"



export default function SingleStory() {
    const { storyId } = useParams()
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const [liked, setLiked] = useState(false)
    const likes = useSelector(state => state.likes.like)
    
    // let userAlreadyLiked = likes?.find(like => like.user_id === currentUser?.id)
    // console.log(userAlreadyLiked)
    useEffect(() => {
        dispatch(retrieveOneStory(parseInt(storyId)))
        dispatch(allLikesInStory(parseInt(storyId)))
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
        localStorage.setItem(`liked_${storyId}`, true)
    }
    if(liked){ 
        await dispatch(deleteALike(storyId))
        .then(setLiked(false))
        localStorage.removeItem(`liked_${storyId}`)
    }
}

useEffect(() => {
    
    const likedFromStorage = localStorage.getItem(`liked_${storyId}`)
    if (likedFromStorage) {
        setLiked(true)
    }
}, [storyId])


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
            <img className="story-image" src={story?.story?.image} alt='story-img' />
            <div className="author-like-button">
            
               <div className="author-cont">{currentUser?.id === story?.story?.user_id ? <Link to={'/profile'}>By {story?.user}</Link>:<Link to={`/${story?.story?.user_id}/profile`} className="author-cont">By {story?.user}</Link>}</div>
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
