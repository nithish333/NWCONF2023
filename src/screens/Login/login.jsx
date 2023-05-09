import "./login.css"
import clg from "../../assets/clg.jpeg"
import Header from "../../components/Header/header"
// import { OrComponent } from "../../components/OrComponent/orcomponent"
// import { Link } from "react-feather"
const Login = ()=>{
    return(
        <>
        
        <Header user={false}/>
        <div className="login">
            <div className="loginBox">
            <div className="loginLeft">
                <img src={clg} alt="Clg image" class="loginClg" />
            </div>
            <div className="loginRight">
                <div className="loginBtn guest">
                   <a href="/login/guest">Continue as Guest</a>
                </div>
                  <div className="loginBtn author">
                   <a href="/author/login">Continue as Author</a>
                </div>  
                <div className="loginBtn committee">
                   <a href="/committee/login">Continue as Committee member</a> 
                </div>  
                <div className="loginBtn committee">
                   <a href="/committee/login">Continue as Chairperson</a> 
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Login