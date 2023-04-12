import { retrieveOneStory } from "./story"

const CREATE_COMMENT = 'comments/POST'
const DELETE_COMMENT = 'comments/DELETE'
const CURRENTUSER_COMMENT = 'comments/CURRENTUSERCOMMENT'


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

export const createNewComment = (payload,storyId) => async dispatch => { 
    const res = await fetch(`/api/comments/${storyId}`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(res.ok){ 
        const newComment = await res.json()
        dispatch(createComment(newComment))
        dispatch(retrieveOneStory(storyId))
    }
    return res
}

export const deleteAComment = (storyId) => async dispatch => { 
    const res = await fetch(`/api/comments/${storyId}`, { 
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'},
    })

    if(res.ok){ 
        dispatch(retrieveOneStory(storyId))
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

const initialState = {comment: []}
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
          comment: state.comment.filter(comment => comment.id !== action.payload)
        };
      case CURRENTUSER_COMMENT:
          return { 
            ...state,
            comment: action.payload
          }
      default:
        return state;
    }
  };
  

export default commentReducer
