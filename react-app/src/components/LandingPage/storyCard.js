import { NavLink } from 'react-router-dom'
import './landingPage.css'

export default function StoryCard({story}){


    return(
        <>
            <NavLink exact to={`/stories/${story.id}`}>
                <div className="story-card">
                    <h3>{story.title}</h3>
                    <img className='preview-image' src={story.image} alt='image.txt'></img>
                    <div className='author-name'>By {story.username}</div>
                    <div className='genres-cont'>
                        {story.genres.map(genre => (
                            <div key={genre} className={`genre ${genre}`}>{genre}</div>
                        ))}
                    </div>
                </div>
            </NavLink>
        </>
    )
}
