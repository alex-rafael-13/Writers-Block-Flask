import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveOneStory } from "../../store/story"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"


export default function SingleStory(){
    const { storyId } = useParams()
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(retrieveOneStory(storyId))
    },[dispatch])

    return(
            <h1>{story?.story.title}</h1>
        // <div className="single-story-cont">
        // </div>
    )
}