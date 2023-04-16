import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllGenres } from "../../store/genre"
import { createSTory } from "../../store/story"
import { retrieveOneStory } from "../../store/story"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { editStory } from "../../store/story"
import { refreshSingleStory } from "../../store/story"
import './UpdateStoryForm.css'

export default function UpdateStoryForm() {

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [image,setImage] = useState('')
    const [genres,setGenres] = useState([])
    const [listTwo,setListTwo] = useState(false)
    const [listThree,setListThree] = useState(false)

    const [optionOne,setOptionOne] = useState('')
    const [optionTwo,setOptionTwo] = useState('')
    const [optionThree,setOptionThree] = useState('')
    const [errors,setErrors] = useState({})
    const [msgCount,setMsgCount] = useState(0)


    const [chatInput,setChatInput] = useState('')
    const [chatDisplay,setChatDisplay] = useState([{role: 'system', content: "Your assistiing others with writing stories"}])

    const submitChat = async (e) => {
        let message = {role: 'user', content: chatInput}
        const updatedChatDisplay = [...chatDisplay,message]
        setChatDisplay(updatedChatDisplay)
        setChatInput('')







        fetch('/api/chat',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedChatDisplay),

        }).then(res => res.json())
        .then(chat => {

            console.log(chat)


            setChatDisplay(prev => [...prev,chat])


        })
    }



    const genresList = useSelector(state => state.genres.genres)

    const dispatch = useDispatch()

    const history = useHistory()







    useEffect(() => {

        dispatch(getAllGenres())


        return () => dispatch(refreshSingleStory())
    },[dispatch])






    const handleSubmit = (e) => {

        e.preventDefault()


        const errors = {}

        if (title.length < 5) {
            errors.length = 'Title must be five or more characters'
        }

        if (content.split(' ').length < 50) {

            errors.content = 'Story must contain at least fifty words'

        }

        console.log(errors)





        setErrors(errors)

        if (Object.values(errors).length) {
            return
        }





        const story = {

            title,
            content,
            image,
            genres: [optionOne,optionTwo,optionThree]

        }

        dispatch(createSTory(story)).then(story => {
            history.push(`/stories/${story.id}`)

        })

    }





    const addOptionOne = (e) => {
        e.preventDefault()
        const id = e.target.value


        if (optionTwo === id || optionThree === id) {
            setOptionOne('')
        } else {

            setOptionOne(id)
            setListTwo(true)
        }
    }

    const addOptionTwo = (e) => {
        e.preventDefault()
        const id = e.target.value

        if (optionOne === id || optionThree === id) {
            setOptionTwo('')
        } else {
            setOptionTwo(id)
            setListThree(true)
        }

    }

    const addOptionThree = (e) => {
        e.preventDefault()
        const id = e.target.value

        if (optionOne === id || optionTwo === id) {
            setOptionThree('')
        } else {
            setOptionThree(id)

        }
    }

    if (!Object.values(genresList).length ) return null


    return (




        <div className="form-container">



        <form className="story-form" onSubmit={(e) => handleSubmit(e)}>

        <h1 class='form-title'>Create a story</h1>

            <div className="story-form-upper">

            <label>Title   </label>
            <input required value={title} placeholder="" onChange={(e) => setTitle(e.target.value)} />

            <div id="genres-list2">
            <div className="genre-lists">
                <div id="genre-label">Genres</div>

<select className="genre-list" value={optionOne} onChange={(e) => addOptionOne(e)}>
<option className="option">none</option>
    {Object.values(genresList).map(genre => (
        <option className="option" value={genre.id}>{genre.name}</option>
    ))}
</select>

{listTwo &&
<select className="genre-list" value={optionTwo} onChange={(e) => addOptionTwo(e)}>
    <option className="option">none</option>
      {Object.values(genresList).map(genre => (
         <option className="option" value={genre.id}>{genre.name}</option>
     ))}
</select>

}
{listThree &&
<select className="genre-list" value={optionThree} onChange={(e) => addOptionThree(e)}>
    <option className="option">none</option>
{Object.values(genresList).map(genre => (
   <option className="option" value={genre.id}>{genre.name}</option>
))}
</select>

}



</div>




            </div>


            </div>

            <div className="story-form-upper">
            <label>Image</label>
            <input  value={image} onChange={(e) => setImage(e.target.value)} />
            </div>


            <textarea required value={content} onChange={(e) => setContent(e.target.value)} />


                <div className="story-form-bottom">
                <button className="button-56">Post Story</button>
                {errors.length && <p className="error">{errors.length}</p>}
                {errors.content && <p className="error">{errors.content}</p>}

                </div>






        </form>

        <div  className="chat-box">

        <div className="chat-display">
            <p id="place-holder">Stuck? Ask me anything! (Write me a short funny story.)</p>
            {Object.values(chatDisplay.slice(1)).map(msg => (
                <p className={msg.role}>{msg.content}</p>
            ))}
        </div>
        <textarea className="chat-input"  value={chatInput} onChange={(e) => setChatInput(e.target.value)}></textarea>
        <button id="chat-button" className="button-56" onClick={(e) => submitChat(e)}>Send</button>

        </div>
    </div>





    )


}
