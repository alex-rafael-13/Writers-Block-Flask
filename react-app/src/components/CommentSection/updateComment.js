import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { setAllComment, updateUserComment } from "../../store/comment";
import { retrieveOneStory } from "../../store/story";

function UpdateComment(storyId){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const commented = useSelector(state => state.comments.comment) 
    const currentUser = useSelector(state => state.session.user)
    
    const currentUserComment = commented?.filter(comm => comm.user_id === currentUser.id) 
    const [comment, setComment] = useState(currentUserComment[0]?.comment);
    console.log(currentUserComment)
    useEffect(() => { 
        dispatch(retrieveOneStory(storyId))
        dispatch(setAllComment(storyId.storyId))
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
                    Comment
                    <input
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    >
                    </input>
                </label>
                <button type="submit">Comment</button>
            </form>
        </>
    )
}


export default UpdateComment;
