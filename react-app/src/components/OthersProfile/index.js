import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { retrieveProfile } from "../../store/profile"

export default function OthersProfilePage(){
    const userProfile = useSelector(state => state.profiles.user)
    const { userId } = useParams()
    const dispatch = useDispatch()
    console.log(userId)

    useEffect(() => {
        dispatch(retrieveProfile(userId))
    },[dispatch])


    return(<>Hello from users</>)
}