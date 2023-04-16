import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAComment } from "../../store/comment";

function DelelteAComment(storyId){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const submit = e => { 
        e.preventDefault();

        dispatch(deleteAComment(storyId.storyId))
        closeModal();
    }
    return (
        <div>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this Comment?</h3>
        <button  className='button-55'
        onClick={submit}
        >Yes(Delete Comment)</button>
        <button  className='button-55'
        onClick={closeModal}
        >No(Keep Comment)</button>
    </div>
    )
}

export default DelelteAComment;
