import SingleStory from "../components/SingleStory"
import { getSingleUser } from "./users"

const GET_ALL_FOLLOWERS = 'followers/ALL'
const GET_ALL_FOLLOWING = 'followings/ALL'
const CREATE_FOLLOW = 'following/CREATEFOLLOW' 
const DELTE_FOLLOW = 'foolowing/DELETEFOLLOW'


const getFollower = (payload) => { 
    return { 
        type: GET_ALL_FOLLOWERS,
        payload
    }
}

const getFollowing = (payload) => { 
    return { 
        type: GET_ALL_FOLLOWING,
        payload
    }
}

const createFollower = (payload) => { 
    return { 
        type: CREATE_FOLLOW,
        payload
    }
}

const deleteFollower = (payload) => { 
    return { 
        type: DELTE_FOLLOW,
        payload
    }
}
export const getAllFollower = (userId) => async dispatch => {
    const res = await fetch(`/api/follows/${userId}/followers`)

    if(res.ok){ 
        const data = await res.json()
        dispatch(getFollower(data))
    }
    return res
}


export const getAllFollowing = (userId) => async dispatch => { 
    const res = await fetch(`/api/follows/${userId}/following`)

    if(res.ok){
        const data = await res.json()
        dispatch(getFollowing(data))
    }
    return res
}


export const createFollow = (payload ,userId) => async dispatch => { 
    const res = await fetch(`/api/follows/follow/${userId}`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(res.ok){ 
        const data = await res.json()
        dispatch(createFollower(data))
        dispatch(getAllFollower(userId))
    }
    return res
} 

export const deleteFollow = (userId) => async dispatch => { 
    const res = await fetch(`/api/follows/follow/${userId}`, { 
        method: 'DELETE',
    })

    if(res.ok){ 
        const data = await res.json()
        dispatch(getAllFollower(userId))
    }
    return res
}


const initialState = { followers: [], following: []}
const followsReducer = (state = initialState, action) => { 
    switch(action.type){ 
        case GET_ALL_FOLLOWERS:
            return { 
                ...state,
                followers: action.payload
            }
        case GET_ALL_FOLLOWING:
            return { 
                ...state, 
                following: action.payload
            }
        case CREATE_FOLLOW:
            return { 
                ...state,
                followers: [...state.followers, action.payload]
            }
        case DELTE_FOLLOW:
            return { 
                ...state, 
                followers: state.followers.filter(follower => follower.id !== action.payload.id)
            }
        default:
            return state
    }
}

export default followsReducer;
