import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteStory } from "../../store/story";
import { getSingleUser } from "../../store/users";
import { useEffect } from "react";


function DeleteStory (prop){ 
    const { closeModal } = useModal(); 
    const dispatch = useDispatch();
    const { props } = prop

    const submit = async (e) => { 
     e.preventDefault();
        
    await dispatch(deleteStory(props.userId, props.storyId));
    closeModal();
  
};

    return (
        <div>
            <h3>Are you sure you want to delete this story?</h3>
            <button  className='button-55' onClick={submit}>Yes(Delete Story)</button>
            <button  className='button-55' onClick={closeModal}>No(Keep story)</button>
        </div>
    )
}


export default DeleteStory
