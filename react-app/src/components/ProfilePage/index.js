import { useDispatch, useSelector } from "react-redux"
import './profile.css'
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
import { currentUserComment } from "../../store/comment"
import { getCurrentUseStory } from "../../store/story"
import { getAllFollower, getAllFollowing } from "../../store/follower"
import OpenModalButton from "../OpenModalButton"
import GetFollower from "../FollowSection/getFollower"
import GetFollowing from "../FollowSection/getFollowing"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import DeleteStory from "../StoryForm/deleteStory"


function ProfilePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const allStories = useSelector(state => state.stories.current)
  const allComments = useSelector(state => state.comments.comment)
  const [toggleStory, setToggleStory] = useState(true)
  const [toggleComment, setToggleComment] = useState(false)
  const allFollwers = useSelector(state => state.follows.followers)
  const allFollowing = useSelector(state => state.follows.following)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrentUseStory())
      dispatch(currentUserComment())
      dispatch(getAllFollower(currentUser.id))
      dispatch(getAllFollowing(currentUser.id))
        .then(() => setLoaded(true))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, currentUser])


  const clickComment = () => {
    setToggleComment(true)
    setToggleStory(false)
  }

  const clickStory = () => {
    setToggleStory(true)
    setToggleComment(false)
  }



  const replaceIconIfNull = () => {
    if (currentUser && !currentUser.icon) {
      return (
        <img
          className="user-icon-image"
          src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
        ></img>
      );
    } else if (currentUser && currentUser.icon) {
      return <img className='user-icon-image' src={currentUser.icon}></img>;
    }
  };

  const nostory = () => {
    if (toggleStory && !allStories.length) {
      return <h1>You dont have any story</h1>
    }
  }
  const noComment = () => {
    if (toggleComment && !allComments.length) {
      return <h1>You dont have any comment</h1>
    }
  }
  let followerButtonText = `followers:${allFollwers.length}`
  let followingButtonText = `following:${allFollowing.length}`

  const openFollowerModal = () => {
    return <OpenModalButton
      buttonText={followerButtonText}
      modalComponent={<GetFollower userId={currentUser?.id} />}
    />
  }

  const openFollowingModal = () => {
    return <OpenModalButton
      buttonText={followingButtonText}
      modalComponent={<GetFollowing userId={currentUser?.id} />}
    />
  }

  const openDeleteModal = (storyId) => {
    let props = {
      storyId,
      userId: currentUser?.id
    }
    return <OpenModalButton
      buttonText='Delete'
      modalComponent={<DeleteStory props={props} />}
    />
  }


  const toUpdateStory = (e, id) => {
    e.stopPropagation()
    history.push(`/stories/${id}/update-form`)
  }


  return (
    <>
      {loaded &&
      
        <div className="profile-container">
          {/* <h1>Your Profile</h1> */}
          <div className="img-username-cont">
            {replaceIconIfNull()}
            <div className="user-name-un-cont">
              <h1 className="name-cont">{currentUser?.firstname} {currentUser?.lastname}</h1>
              <h3 className="username-cont">@{currentUser?.username}</h3>
            </div>
          </div>
          <h4 className="following-follower-cont">{openFollowerModal()} {openFollowingModal()}</h4>
          <div className="bio-cont">{currentUser?.bio}</div>
          <div className='navbar-in-profile'>
            <button className={toggleStory ? 'button-56 active' : 'button-56'} onClick={clickStory}>Story</button>
            <button className={toggleComment ? 'button-56 active' : 'button-56'} onClick={clickComment}>Comments</button>
          </div>
          <div className="profile-content-cards">
            {nostory()}
            {noComment()}

            {toggleStory ? allStories?.map(story => (
              <>
                <div className="story-buttons-cont">
                  <NavLink exact to={`/stories/${story.id}`}>
                    <div className="story-card" key={story.id}>
                      <h3>{story.title}</h3>
                      <img className='preview-image' src={story.image} alt='image.txt'></img>
                      {story.genres.map(genre => (
                        <nav key={genre} className={`genre ${genre}`}>{genre}</nav>
                      ))}
                    </div>
                  </NavLink>
                  <div>
                    <button className='button-55' onClick={(e) => toUpdateStory(e, story.id)}>Update</button>
                    {openDeleteModal(story.id)}
                  </div>

                </div>
              </>
            )) : null}


            {toggleComment ? allComments?.map(comment => (
              <div key={comment.username} className="profile-comment">
                ________________________________________

                <NavLink exact to={`/stories/${comment.story_id}`}>
                  <div className="user-comment">{comment.story}</div>
                  <div className="comment-contents">{comment.comment}</div>
                </NavLink>
              </div>
            )) : null}
          </div>
        </div>
      }
    </>
  )
}


export default ProfilePage;
