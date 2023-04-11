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

                <button className='menu-button' onClick={handleClicked}>

               <i class="fa-solid fa-bars"></i>

                </button>
                
               <img onClick={toHome} alt='icon' className='icon-image' src='data:image/png;base64,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'></img>

            </div>

            <input className='search-input'placeholder="search here"></input>
        
            <div>
            </div>
            
            </div>




 



    )

}
