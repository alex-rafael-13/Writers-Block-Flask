const GET_USER_PROFILE = 'users/GET_PROFILE'

const setProfile = (profile) => {
    return {
        profile,
        type: GET_USER_PROFILE
    }
}


export const retrieveProfile = id => async dispatch =>{
    const response = await fetch(`${id}`,{
        headers:{
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        const data = await response.json()
        if(data.errors){
            return
        }
        return dispatch(setProfile(data))
    }


}

const initialState = {user:{}}
export default function profileReducer(state = initialState, action){
    let newState = {}
    switch(action.type){
        case GET_USER_PROFILE:
            newState = {...state}
            newState.user = action.profile
            return newState
        default:
            return state
    }

        
}