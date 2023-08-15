import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as storyActions from '../../store/story'
import StoryCard from "./storyCard"
import SideNavBar from "../SideNavBar"
import './landingPage.css'



export default function LandingPage(){
    const dispatch = useDispatch()
    const allStories = useSelector(state => state.stories.stories)
  
    useEffect(() => {
        dispatch(storyActions.retrieveStories())
        dispatch(storyActions.refreshSingleStory())
    },[dispatch])

    // console.log(allStories)

    return (
        <div className="story-list">
            {allStories?.map(story =>(
                <StoryCard key={story.id} story={story}/>
            ))}
        </div>
    )

}
