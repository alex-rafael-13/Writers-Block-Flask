import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewComment } from "../../store/comment";
import './CommentSection.css'

function CreateComment(storyId){ 
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const currentUser = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    console.log(currentUser)
    const handleSubmit = async (e) => { 
        e.preventDefault();

        const payload = {
            storyId: storyId.storyId,
            userId : currentUser.id,
            comment
        }
       
        if(payload){
        return dispatch(createNewComment(payload, storyId.storyId))
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
                    placeholder="Comment"
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    >
                    </input>
                </label>
                <button  className='button-55' type="submit">Comment</button>
            </form>
        </>
    )
}


export default CreateComment;
