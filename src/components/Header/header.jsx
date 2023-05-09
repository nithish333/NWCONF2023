import "../Header/header.css";
import logo from "../../assets/nwconflogo.png"
import { Link } from "react-router-dom";
import { useEffect,useState} from "react";

const Header = (user)=>{
    const [userState, setUserState] = useState(user.user);
    // console.log("User"+typeof(user.user));
    useEffect(()=>{},[user])
    return(
        
        <>
        <div className="header">
            <div className="logoBox">
            <img src={logo} alt="Northwest conference logo" className="nwlogo"/>
            <h3 className="logoName"><a href="#" className="logoLink"></a>NWMSU</h3>
            </div>
            <div>
            <ul className="menu">
                <li className="menuItem"><Link to="/" className="menuLink">HOME</Link></li>
                <li className="menuItem"><Link to="/committee" className="menuLink">PROGRAM COMMITTEE</Link></li>
                <li className="menuItem"><Link to="/accept" className="menuLink">ACCEPT</Link></li>
                <li className="menuItem"><Link to="/evaluation" className="menuLink">EVALUATION</Link></li>
                {userState?
                <li className="menuItem" ><Link to="/login" className="menuLink">LOGOUT</Link></li>
                :
                <li className="menuItem" onClick={()=>setUserState(setUserState(false))}><Link to="/login" className="menuLink">LOGIN</Link></li>}
            </ul>
            </div>
        </div>
        </>
    )
}

export default Header;