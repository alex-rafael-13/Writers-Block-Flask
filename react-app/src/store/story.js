import SingleStory from "../components/SingleStory"
import { getSingleUser } from "./users"

const GET_ALL_STORIES = 'stories/GET_ALL'
const GET_ONE_STORY = 'stories/GET_ONE'
const REFRESH_SINGLE_STORY = 'stories/REFRESH_SINGLE_STORY'
const GET_CURRENTUSER_STORY = 'stories/CURRENTUSERSTORY'
const CREATE_STORY = 'stories/CREATE_STORY'


const setStories = (stories) => {
    return {
        type: GET_ALL_STORIES,
        stories: stories
    }
}

const setSingleStory = (story) => {
    return {
        type: GET_ONE_STORY,
        story
    }
}

export const refreshSingleStory = () => {
    return {
        type: REFRESH_SINGLE_STORY,
    }
}



export const createSTory = (story) => async (dispatch) => {

    const res = await fetch('/api/stories/',{
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(story),

    })

    if (res.ok) {

        const newStory = await res.json()
        return newStory

    }

    return res

}


const currentUserStory = (story) => {
    return {
        type: GET_CURRENTUSER_STORY,
        story
    }
}


export const retrieveStories = () => async (dispatch) => {
    const response = await fetch('/api/stories/', {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if(response.ok){
        const data = await response.json()
        if(data.errors){
            return
        }

        dispatch(setStories(data))
    }
    return response
}

export const retrieveOneStory = (id) => async (dispatch) => {
    const response = await fetch(`/api/stories/${id}`,{
        headers: {
            "Content-Type": "application/json",
        }
    })

    if(response.ok){
        const data = await response.json()
        if(data.errors){
            return
        }

        dispatch(setSingleStory(data))
    }
    return response
}

export const editStory = (story) => async (dispatch) => {

    console.log(story,'sending')

    const res = await fetch(`/api/stories/${story.id}`,{
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(story),

    })

    if (res.ok) {

        const newStory = await res.json()
        return newStory

    }

    return res
}

export const getCurrentUseStory = () => async dispatch => {
    const res = await fetch('/api/stories/current')

    if(res.ok){
        const data = await res.json()
        dispatch(currentUserStory(data))
    }
    return res
}

const DELETE_STORY = 'stories/DELETE'
const deleteAStory = (payload) => { 
    return { 
        type: DELETE_STORY,
        payload
    }
}

export const deleteStory = (userId, storyId) => async (dispatch) => { 
    const res = await fetch(`/api/stories/${storyId}`, { 
        method: 'DELETE',
    })

    if(res.ok){ 
        const data = await res.json()
        dispatch(getSingleUser(userId))
        dispatch(getCurrentUseStory(userId))
    }
    return res 
}

const initialState = {stories:[], story:{}, current: []}
export default function storyReducer(state = initialState, action){
    let newState = {}
    switch(action.type){
        case GET_ALL_STORIES:
            newState = {...state}
            newState.stories = action.stories
            return newState
        case GET_ONE_STORY:
            newState = {...state}
            newState.story = action.story
            return newState
        case REFRESH_SINGLE_STORY:
            newState = {...state}
            newState.story = {}
            return newState
        case GET_CURRENTUSER_STORY:
            newState = {...state}
            newState.current = action.story
            return newState
        case DELETE_STORY:
            newState = { ...state };
            newState.stories = newState.stories.filter((story) => story.id !== action.payload.id);
            newState.story = {};
            newState.current = newState.current.filter((story) => story.id !== action.payload.id);
            return newState;
        default:
            return state
    }
}
