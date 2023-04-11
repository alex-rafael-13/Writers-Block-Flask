import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveOneStory } from "../../store/story"
import { useParams } from "react-router-dom"
import './SingleStory.css'


export default function SingleStory(){
    const { storyId } = useParams()
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(retrieveOneStory(parseInt(storyId)))
    },[dispatch])

    let imgUrl
    if(!story.image){
        imgUrl = 'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg' 
    } else{
        imgUrl = story.image
    }

    console.log(story?.genre)
    
    const storyContent = story?.story


    return(
        <div className="single-story-cont">
            <div className="title-genre-cont">
                <h1>{storyContent?.title}</h1>
                <div className="single-story-genres">
                    {story?.genre?.map(genre => (
                        <div key={genre} className={`genre ${genre}`}>{genre}</div>
                    ))}

                </div>
            </div>
            <img className="story-image" src={imgUrl} alt='story-img'/>
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
        </div>
    )
}