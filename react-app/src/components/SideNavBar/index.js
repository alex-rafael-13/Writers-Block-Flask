import { useHistory } from "react-router-dom"
import './index.css'

function SideNavBar(){




    return (
        <div className='main-side-navbar'>

        <div className="side-bar-div-boxes">

        <i class="fa-sharp fa-solid fa-house"></i>
        <p>Home</p>
        </div>

        <div className="side-bar-div-boxes">

        <i class="fa-solid fa-user"></i>
        <p>User</p>
        </div>

        </div>
    )
}

export default SideNavBar
