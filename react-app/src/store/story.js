const GET_ALL_STORIES = 'stories/GET_ALL'
const GET_ONE_STORY = 'stories/GET_ONE'
const REFRESH_SINGLE_STORY = 'stories/REFRESH_SINGLE_STORY'
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
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",

        },
        body: story

    })

    if (res.ok) {

        const newStory = await res.json()
        return newStory

    }

    return res

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

const initialState = {stories:[], story:{}}
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
        default:
            return state
    }
}
