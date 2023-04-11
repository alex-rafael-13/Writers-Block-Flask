import './landingPage.css'

export default function StoryCard({story}){

    let imgUrl
    if(!story.image){
        imgUrl = 'https://cdn.leadx.org/wp-content/uploads/2017/06/Storytelling.jpg' 
    } else{
        imgUrl = story.image
    }

    console.log(story)
    return(
        <div className="story-card">
            <h3>{story.title}</h3>
            <img className='preview-image' src={imgUrl} alt='image.txt'></img>
            <div className='author-name'>By {story.username}</div>
            <div className='genres-cont'>
                {story.genres.map(genre => (
                    <nav className='genre'>{genre}</nav>
                ))}
            </div>
        </div>
    )
}