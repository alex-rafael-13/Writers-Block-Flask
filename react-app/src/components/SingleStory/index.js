import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveOneStory } from "../../store/story"
import { useParams } from "react-router-dom"
import './SingleStory.css'
import CommentSection from "../CommentSection"
import OpenModalButton from "../OpenModalButton"
import CreateComment from "../CommentSection/createComment"
import DelelteAComment from "../CommentSection/deleteComment"


export default function SingleStory() {
    const { storyId } = useParams()
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(retrieveOneStory(parseInt(storyId)))
    }, [dispatch])

    let imgUrl
    if (!story.image) {
        imgUrl = 'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg'
    } else {
        imgUrl = story.image
    }

    
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
            <img className="story-image" src={imgUrl} alt='story-img' />
            <div className="author-like-button">
                <div className="author-cont">By {story?.user}</div>
                <div className="likes-cont">
                    <div className="like-button">Like</div>
                    <div>5</div>
                </div>
            </div>
            <div className="story-content-cont">
                {storyContent?.content}
            </div>
            <hr></hr>
            {/* <CommentSection comments={story?.comments} /> */}
            <div className="comments-section">
            <h3>Comments</h3>
            {!commented?createCommentModal():null}
            {story?.comments?.map(comment => (
                <div key={comment.username}className="comment-body">
                    <div className="user-comment">{comment.username}</div>
                    <div className="comment-contents">{comment.comment}</div>
                   
                    {commented && comment.username === currentUser.username?
                     deleteCommentModal() : null}
                    <hr></hr>
                </div>
            ))}
        </div>
        </div>

    )
}
