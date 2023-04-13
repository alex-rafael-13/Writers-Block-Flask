const SINGLE_USER = 'users/SINGLE_USER'

const setSignleUser = (payload) => { 
    return { 
        type: SINGLE_USER,
        payload
    }
}


export const getSingleUser = (id) => async dispatch => { 
    const res = await fetch(`/api/users/${id}`)

    if(res.ok){ 
        const data = await res.json()
        dispatch(setSignleUser(data))
    }
    return res
}


const initialState = {user: []}
const userReducer = (state = initialState, action) => { 
    let newState = {...state}
    switch(action.type){ 
        case SINGLE_USER:
            newState.user = action.payload
            return newState
        default: 
        return state
    }
}

export default userReducer
