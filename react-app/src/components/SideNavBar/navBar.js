import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Navigation from "../Navigation"
import './index.css'
import SideNavBar from "."
import ProfileButton from "../Navigation/ProfileButton"


export default function NavBar({handleClicked}) {

    const history = useHistory()
    const toHome = () => {
        history.push('/')
    }



    return (

        <div className="navbar">

            <div className="menu-button-logo">
                
               <img onClick={toHome} alt='icon' className='icon-image' src='https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png'></img>

            </div>

            <input className='search-input'placeholder="Search by Username, Genre, Storyname"></input>
        
            <div>
            </div>
            
            </div>




 



    )

}
