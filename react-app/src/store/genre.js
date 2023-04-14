

const GET_ALL_GENRES = '/genres/GET_ALL'


const setGenres = (genres) => {

    return {
        type: GET_ALL_GENRES,
        genres
    }

}


export const getAllGenres = () => async (dispatch) => {

    const res = await fetch('/api/genres')

    if (res.ok) {
        const data = await res.json()

        dispatch(setGenres(data))
    }

    return res

}


const initialState = {genres: {}}

export default function genreReducer(state=initialState, action) {
    let newState = {}
    switch(action.type){
        case GET_ALL_GENRES:
            newState = {...state}
            newState.genres = action.genres
            return newState
        default:
            return state
    }
}
