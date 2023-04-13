import { retrieveOneStory } from "./story"

const CREATE_LIKE = 'likes/CREATE'
const SET_LIKE = 'like/SETLIKES'
const DELETE_LIKE = 'likes/DELETE'


const createLikes = (payload) => { 
    return { 
        type: CREATE_LIKE,
        payload
    }
}

const setLikes = (payload) => { 
    return { 
        type: SET_LIKE,
        payload
    }
}

const deleteLikes = (payload) => { 
    return { 
        type: DELETE_LIKE,
        payload
    }
}


export const createALike = (payload, storyId) => async dispatch => { 
    const res = await fetch(`/api/stories/${storyId}/like`,{ 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(res.ok){ 
        const data = await res.json()
        dispatch(createLikes(data))
        dispatch(retrieveOneStory(storyId))
    }
    return res
}

export const deleteALike = (storyId) => async dispatch => { 
    const res = await fetch(`/api/stories/${storyId}/like`,{ 
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok){ 
        const data = res.json()
        dispatch(deleteALike(data))
        dispatch(retrieveOneStory(storyId))
    }
    return res
}

export const allLikesInStory = (storyId) => async dispatch => { 
    const res = await fetch(`/api/stories/${storyId}/like`)

    if(res.ok){ 
        const data = await res.json()
        dispatch(setLikes(data))
        dispatch(retrieveOneStory(storyId))
    }
    return res 
}


const initialState = {like: []}
const likeReducer = (state = initialState, action) => { 
    let newState = {...state}
    switch(action.type){ 
        case CREATE_LIKE:
            return { 
                ...state,
                like: [...state.like, action.payload]
            }
        case SET_LIKE: 
            newState.like = action.payload 
            return newState
        case DELETE_LIKE: 
            return newState
        default:
            return state       
    }
}


export default likeReducer;
