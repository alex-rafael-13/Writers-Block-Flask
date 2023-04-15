import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { setAllComment, updateUserComment } from "../../store/comment";
import { retrieveOneStory } from "../../store/story";

function UpdateComment(storyId){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const storyComment = useSelector(state => state.stories.story.comments) 
    const currentUser = useSelector(state => state.session.user)
    let userComment
    storyComment.forEach(comment => { 
        if(comment.username === currentUser.username){ 
            userComment = comment.comment
        }
    })
    
    const [comment, setComment] = useState(userComment);
    
    
    useEffect(() => { 
        dispatch(retrieveOneStory(storyId))
    },[dispatch])
    

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const payload = {
            comment
        }
        if(payload){
        return dispatch(updateUserComment(payload, storyId.storyId))
        .then(closeModal())
        }
    }
    
    return(
        <>
            <h1>Comment</h1>
            <form onSubmit={handleSubmit}>
                <label>

                    <input
                    className="comment-input"
                    placeholder="comment"
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    >
                    </input>
                </label>
                <button   className='button-55' type="submit">Comment</button>
            </form>
        </>
    )
}


export default UpdateComment;
