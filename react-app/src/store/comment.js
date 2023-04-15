import { retrieveOneStory } from "./story"

const SET_COMMENTS = 'comments/SETCOMMENTS'
const CREATE_COMMENT = 'comments/POST'
const DELETE_COMMENT = 'comments/DELETE'
const CURRENTUSER_COMMENT = 'comments/CURRENTUSERCOMMENT'
const UPDATE_COMMENT = 'comments/UPDATE'


const setComments = (payload) => { 
  return { 
    type: SET_COMMENTS,
    payload
  }
}

const createComment = (payload) => { 
    return { 
        type: CREATE_COMMENT,
        payload
    }
}

const currentComment = (payload) => { 
    return { 
      type: CURRENTUSER_COMMENT,
      payload
    }
}

const updateComment = (payload) => { 
  return { 
    type: UPDATE_COMMENT,
    payload
  }
}

export const setAllComment = (storyId) => async dispatch => { 
  const res = await fetch(`/api/comments/${storyId}`)

  if(res.ok){ 
    const data = await res.json()
    dispatch(setComments(data))
  }
  return res 
}

export const createNewComment = (payload,storyId) => async dispatch => { 
    const res = await fetch(`/api/comments/${storyId}`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(res.ok){ 
        const newComment = await res.json()
        dispatch(createComment(newComment))
        dispatch(setAllComment(storyId))
    }
    return res
}

export const deleteAComment = (storyId) => async dispatch => { 
    const res = await fetch(`/api/comments/${storyId}`, { 
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'},
    })

    if(res.ok){ 
      const data = await res.json()
      dispatch(deleteAComment(data))
      dispatch(setAllComment(storyId))
    }
    return res 
}

export const currentUserComment = () => async dispatch => { 
    const res = await fetch('/api/comments/current')

    if(res.ok){ 
      const data = await res.json()
      dispatch(currentComment(data))
    }
    return res 
}

export const updateUserComment = (payload,storyId) => async dispatch => { 
  const res =await fetch(`/api/comments/${storyId}`, { 
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
  })

  if(res.ok){ 
    const data = await res.json()
    dispatch(setAllComment(storyId))
    return data
  }
}

const initialState = {comment: [], current:[]}
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT:
        return {
          ...state,
          comment: [...state.comment, action.payload]
        };
      case DELETE_COMMENT:
        return {
          ...state, 
          comment: state.comment.filter(comment => comment.id !== action.payload.id)
        };
      case CURRENTUSER_COMMENT:
          let newState = {...state}
          newState.comment = action.payload
          return newState
      case SET_COMMENTS: 
          return { 
            ...state, 
            comment: action.payload
          }
      case UPDATE_COMMENT: 
          return { 
            ...state, 
            comment: action.payload
          }
      default:
        return state;
    }
  };
  

export default commentReducer
