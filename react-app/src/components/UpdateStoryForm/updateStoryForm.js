import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllGenres } from "../../store/genre"
import { createSTory } from "../../store/story"
import { retrieveOneStory } from "../../store/story"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { editStory } from "../../store/story"
import { refreshSingleStory } from "../../store/story"
import './UpdateStoryForm.css'
import OpenModalButton from "../OpenModalButton"
import UpdateStoryImage from "./UpdateStoryImage"

export default function UpdateStoryForm() {

    const [title, setTitle] = useState('123')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [genres, setGenres] = useState([])

    const [errors, setErrors] = useState({})

    const [chatInput, setChatInput] = useState('')
    const [chatDisplay, setChatDisplay] = useState([{ role: 'system', content: "Your assistiing others with writing stories" }])
    const [initalDisplay, setInitalDisplay] = useState(true)

    const genresList = useSelector(state => state.genres.genres)
    const story = useSelector(state => state.stories.story)
    const dispatch = useDispatch()
    const { storyId } = useParams()
    const history = useHistory()

    useEffect(() => {

        dispatch(getAllGenres())
        dispatch(retrieveOneStory(storyId))



        return () => dispatch(refreshSingleStory())
    }, [storyId])

    useEffect(() => {

        if (Object.values(story).length && Object.values(genresList).length) {
            setTitle(story.story.title)
            setContent(story.story.content)
            // setImage(story.story.image)
            const storyGenres = story.genre
            // console.log(storyGenres,'++++')

            let currentGenres = []
            for (let gen of storyGenres) {

                const genreToAdd = Object.values(genresList).find(genre => genre.name === gen)

                currentGenres = [...currentGenres, genreToAdd.id]

            }
            setGenres(currentGenres)
        }

    }, [story])


    const submitChat = async (e) => {
        let message = { role: 'user', content: chatInput }
        const updatedChatDisplay = [...chatDisplay, message]
        setChatDisplay(updatedChatDisplay)
        setChatInput('')
        setInitalDisplay(false)



        fetch('/api/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedChatDisplay),

        }).then(res => res.json())
            .then(chat => {

                // console.log(chat)


                setChatDisplay(prev => [...prev, chat])


            })
    }




    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = {}

        if (title.length < 5) {
            errors.length = 'Title must be five or more characters'
        }

        if (content.split(' ').length < 50) {

            errors.content = 'Story must contain at least fifty words'

        }
        if (genres.length < 1) {

            errors.genres = 'Please select one or more genres'
        }

        setErrors(errors)
        if (Object.values(errors).length) {
            return
        }

        const formData = new FormData()

        formData.append('id', storyId)
        formData.append('title', title)
        formData.append('content', content)
        formData.append('genres', genres)
        
        if(image){
            formData.append('image', image)
        }

        dispatch(editStory(formData, storyId))
            .then(story => {
            history.push(`/stories/${story.id}`)

        })

    }

    const addGenre = (e) => {

        e.preventDefault()
        // console.log('clicked')
        const id = +e.target.id

        if (!genres.includes(id) && genres.length < 3) {
            const updateGenres = [...genres, id]
            setGenres(updateGenres)
            e.target.classList.add('greenDisplay')

        } else if (genres.includes(id)) {
            const currentGenres = [...genres]
            const idx = currentGenres.indexOf(id)
            currentGenres.splice(idx, 1)
            setGenres(currentGenres)
            e.target.classList.remove('greenDisplay')

        }


    }


    if (!Object.values(genresList).length || !Object.values(story).length || !genres.length) return null





    return (


        <div className="form-container">

            <form className="story-form" onSubmit={(e) => handleSubmit(e)}>
                <h1 class='form-title'>Update Story</h1>

                <div className="story-form-upper">

                    <label>Title</label>
                    <input required value={title} placeholder="" onChange={(e) => setTitle(e.target.value)} />

                    <div id="genres-list2">
                        <div className="genre-lists">
                            <div id="genre-label">Genres</div>
                            <div id="genre-list">

                                {Object.values(genresList).map(genre => (
                                    <>
                                        {genres.includes(genre.id) ? <p onClick={(e) => addGenre(e)} className="genre-list-option2 greenDisplay" id={genre.id} value={genre.id}>{genre.name}</p> :
                                            <p onClick={(e) => addGenre(e)} className="genre-list-option2" id={genre.id} value={genre.id}>{genre.name}</p>}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="story-form-upper">
                    {/* <label>Update Image?</label> */}
                    {/* <button type="button" onClick={() => alert('Test') }className="button-56">Update Image</button> */}
                    {/* <OpenModalButton 
                        buttonText="Update Image"
                        modalComponent={<UpdateStoryImage />}
                    /> */}
                    <label>Update Image:</label>
                    <input 
                        type= 'file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <textarea required value={content} onChange={(e) => setContent(e.target.value)} />
                <div className="story-form-bottom">
                    <button className="button-56">Update Story</button>
                    {errors.length && <p className="error">{errors.length}</p>}
                    {errors.content && <p className="error">{errors.content}</p>}

                </div>
            </form>
            {/* <div className="chat-box">

                <div className="chat-display">
                    {initalDisplay && <p id="place-holder">Stuck? Ask me anything! (Write me a short funny story.)</p>}
                    {Object.values(chatDisplay.slice(1)).map(msg => (
                        <p className={msg.role}>{msg.content}</p>
                    ))}
                </div>
                <textarea className="chat-input" value={chatInput} onChange={(e) => setChatInput(e.target.value)}></textarea>
                <button id="chat-button" className="button-56" onClick={(e) => submitChat(e)}>Send</button>

            </div> */}

        </div>





    )


}
