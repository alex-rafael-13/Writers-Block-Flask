import './CommentSection.css'


export default function CommentSection({comments}){
    return(
        <div className="comments-section">
            <h3>Comments</h3>
            {comments?.map(comment => (
                <div key={comment.username}className="comment-body">
                    <div className="user-comment">{comment.username}</div>
                    <div className="comment-contents">{comment.comment}</div>
                    <hr></hr>
                </div>
            ))}
        </div>
    )
}