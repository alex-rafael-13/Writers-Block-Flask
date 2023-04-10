const GET_ALL_STORIES = 'stories/GET_ALL'

const setStories = (stories) => {
    return {
        type: GET_ALL_STORIES,
        stories: stories
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

const initialState = {stories:[]}
export default function storyReducer(state = initialState, action){
    let newState = {}
    switch(action.type){
        case GET_ALL_STORIES:
            newState = {...state}
            newState.stories = action.stories
            return newState
        default:
            return state
    }
}