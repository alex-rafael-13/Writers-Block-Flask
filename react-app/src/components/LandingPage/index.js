import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as storyActions from '../../store/story'
import StoryCard from "./storyCard"


export default function LandingPage(){
    const dispatch = useDispatch()
    const allStories = useSelector(state => state.stories.stories)

    useEffect(() => {
        dispatch(storyActions.retrieveStories())
    },[dispatch])



    return (
        <div>
            {allStories?.map(story =>(
                <StoryCard story={story}/>
            ))}
        </div>
    )

}