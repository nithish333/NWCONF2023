// import GreenButton from "../../components/Button/button.jsx"
import "./committeelogin.css"
// import { InputField } from "../../components/InputField/inputfield"
// import { Label } from "../../components/Label/label"
import { OrComponent } from "../../components/OrComponent/orcomponent.jsx"
import { UilGoogle, UilFacebook, UilGithub, UilTwitter } from '@iconscout/react-unicons'
// import Header from "../../components/Header/header.jsx"
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { async } from "@firebase/util";
// import { auth } from "../../config/firebaseConfig";

export const CommitteeLogin = () => {
  const navigate = useNavigate()
  var user = [];
  const [email, setEmail] = useState('kondashivaradhan007@gmail.com');
  const [password, setPassword] = useState('shivashiva');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email and password
    if (email === '') {
      setEmailError('Email is required');
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format')
    }
    else {
      setEmailError('');
    }
    if (password === '') {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

    console.log("Email" + emailError + " " + passwordError);
    // Submit form if there are no errors
    var newFormObj = new FormData();
    newFormObj.append('Email', email);
    newFormObj.append('Password', password);
    if (email !== '' && password !== '') {
      // await createUserWithEmailAndPassword(auth,email,password)
      // await axios.get("http://127.0.0.1:5000/",{"Email":email,"Password":password})
      console.log(email + "" + password)
      user = await axios.post("http://127.0.0.1:5000/committeelogin", newFormObj)
      // if(user.data)
      // console.log(user);
      if (user.data == "Wrong data") {
        console.log("HI");
        alert("You have entered wrong details")
      } else {
        // console.log(user.data[0]);
        
        navigate("/committee/home",{ state: { name:user.data[0],login:"authorlogin" }})
          
        

      }
    }
  };

  return (
    <>
      {/* <Header/> */}
      <div className="authorContainer">
        <div className="authorLogin">
          <h3 style={{ color: '#006747', marginBottom: '10px' }}>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Enter your email address"
                value={email}

                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
            <button className="greenButton" title="LOGIN"  >Login</button>
          </form>
          <p style={{ marginTop: '10px', fontSize: '15px' }}>
            Don't have a account? <a href="/committee/register" style={{ color: '#006747' }}>Register here</a>
          </p>
          <p><a href="/login" style={{ color: '#006747' }}>Go back</a></p>
          </div>
      </div>
    </>
  );
};
