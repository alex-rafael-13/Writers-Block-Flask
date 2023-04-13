const GET_ALL_FOLLOWERS = 'followers/ALL'
const GET_ALL_FOLLOWING = 'followings/ALL'


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
        default:
            return state
    }
}

export default followsReducer;
