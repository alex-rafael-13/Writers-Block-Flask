import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllGenres } from "../../store/genre"
import { createSTory } from "../../store/story"


export default function StoryForm() {

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [image,setImage] = useState(null)
    const [genres,setGenres] = useState({})

    const genresList = useSelector(state => state.genres.genres)
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getAllGenres())



    },[dispatch])

    const addOrRemoveGenre = (e) => {

        e.preventDefault()

        if (!genres[e.target.innerText]) {
            setGenres(prev => ({...prev, [e.target.innerText]: genresList[e.target.innerText].id }))
        } else {
           let keyToRemove =  e.target.innerText
           let newState = {...genres}
           delete newState[keyToRemove]

           setGenres(newState)
        }




    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData();
        form.append('title', title);
        form.append('email', content);
        form.append('message', image);
        form.append('genres',Object.values(genres))

        dispatch(createSTory(form))




    }






    if (!Object.values(genresList)) return null




    return (


        <form onSubmit={(e) => handleSubmit(e)}>

            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />

            <label>Image</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} />

            <button>Create Story</button>

            <div>

                {Object.values(genresList).map(genre => (
                    <button onClick={(e) => addOrRemoveGenre(e)}>{genre.name}</button>
                ))}



            </div>






        </form>

    )


}
