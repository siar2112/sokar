import React, {useState} from 'react';
import { useUserSession } from './UserSession';
import InputTextField from './inputTextField';
import LinkButton from './linkButton';
import { useNavigate } from 'react-router-dom';
import './stylesFiles/mobileView/mobileLoginForm.css';

const LoginForm = () => {
    const { userSession, setUserSession } = useUserSession();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName:'',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(userSession !== null) {
            alert("You are already logged in.");
            return;
        }

        for (let property in formData) {
            if (formData[property] === '') {
                alert('Please fill all the fields.');
                return;
            }
        }

        const response = await fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('userSession', JSON.stringify(user));
            setUserSession(user);
            alert(`Login successful! Welcome, ${user.username}. You are logged in as a ${user.role}.`);
            navigate("/");
        } else {
            alert('An error occurred while login. Please retry');
        }
    }


    return (
        <div>
            <div className="formContainer" style={{paddingLeft:"25%",paddingRight:"25%",paddingBottom:"5%",}}>
                <form onSubmit={handleSubmit} style={{background: "rgba( 255, 255, 255, 0.1 )", boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 5px )", borderRadius: "10px", border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    marginTop:"10%"}}>
                    <h1 style={{textAlign:"center", color:"white", marginTop:"5%"}}>Login Here</h1>
                    <ul style={{listStyleType:"none", textAlign:"center", paddingBottom:"5%", paddingLeft:"5%", paddingRight:"5%"}}>
                        <li style={{position: "relative", marginTop:"10%"}}>
                            <InputTextField name="userName" onChange={handleChange} type="text" label="Username"></InputTextField>
                        </li>
                        <li style={{position: "relative", marginTop:"10%"}}>
                            <InputTextField name="password" onChange={handleChange} type="password" label="Password"></InputTextField>
                        </li>
                        <li style={{marginTop:"10%"}}>
                            <input className="submit_button" type="submit" value="Login"/>
                        </li>
                    </ul>
                </form>
                <div style={{marginTop:"10%"}}>
                    <p className="loginText" style={{fontSize:"25px", color:"white"}}>Don't have an account? <br/><br/><LinkButton style={{marginTop:"5%"}} link="/createAccount" buttonText="Create account"/></p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;