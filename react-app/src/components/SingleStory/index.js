import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveOneStory } from "../../store/story"
import { useParams } from "react-router-dom"


export default function SingleStory(){
    const { storyId } = useParams()
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(retrieveOneStory(parseInt(storyId)))
    },[dispatch])

    console.log(story)
    
    const storyContent = story?.story


    return(
        <h1>{storyContent?.title}</h1>
        // <div className="single-story-cont">
        // </div>
    )
}