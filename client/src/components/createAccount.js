import React, {useState} from 'react';
import './stylesFiles/createAccount.css';
import InputTextField from './inputTextField';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName:'',
        email: '',
        birthday:'',
        gender:'Male',
        password: '',
        retypePassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);

        // Verify all fields have data
        for (let property in formData) {
            if (formData[property] === '') {
                alert('Please fill all the fields.');
                return;
            }
        }

        if (formData.password !== formData.retypePassword) {
            alert('Passwords do not match!');
            return;
        }

        // Send a POST request to your Express.js server
        const response = await fetch('${process.env.REACT_APP_API_URL}/create_player_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (response.ok) {
            alert('Account created successfully!');
        } else {
            alert('An error occurred while creating the account.');
        }
    }


    return (
        <div style={{backgroundImage:"linear-gradient(to top left,black,darkblue)",paddingTop:"5%"}}>
            <h1 style={{fontSize:"4vw", textAlign:"center",color:"white"}}>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <ul className="createAccountList" style={{listStyleType:"none",textAlign:"center", marginTop:"5%",paddingRight:"20%", paddingLeft: "20%",paddingBottom:"5%"}}>
                    <li style={{position: "relative"}}>
                        <InputTextField name="firstName" onChange={handleChange} type="text" label="First Name"></InputTextField>
                    </li>
                    <li style={{position: "relative"}}>
                        <InputTextField name="lastName" onChange={handleChange} type="text" label="Last Name"></InputTextField>
                    </li>
                    <li style={{position: "relative"}}>
                        <InputTextField name="email" onChange={handleChange} type="email" label="Email Address"></InputTextField>
                    </li>
                    <li style={{position: "relative"}}>
                        <InputTextField name="userName" onChange={handleChange} type="text" label="User Name"></InputTextField>
                    </li>
                    <li style={{position:"relative",colorScheme:"dark"}}>
                        <InputTextField name="birthday" onChange={handleChange} type="date" label="Birthday"></InputTextField>
                    </li>
                    <li style={{position: "relative"}}>
                        <InputTextField name="password" onChange={handleChange} type="password" label="Create strong password (Please do not use a real one for this prototype)"></InputTextField>
                    </li>
                    <li style={{position: "relative"}}>
                        <InputTextField name="retypePassword" onChange={handleChange} type="password" label="Retype password"></InputTextField>
                    </li>
                    <li style={{marginTop:"10%"}}>
                        <label style={{fontSize:"25px", paddingRight:"5%", color:"white"}} htmlFor="position_selector">Which gender do you identify yourself as:</label>
                        <select style={{paddingRight: "10px", paddingLeft:"10px",paddingTop:"5px",paddingBottom:"5px",background:"#edf2ff",border:"none",
                            borderRadius:"20px"}} name="gender" className="form_selector" onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">I prefer to not identify</option>
                        </select>
                    </li>
                    <li style={{marginTop:"10%"}}>
                        <input className="submit_button" type="submit" value="Start your journey"/>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default CreateAccount;


