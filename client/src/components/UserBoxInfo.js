import React from 'react';
import './stylesFiles/Userbox.css';


const UserBoxInfo= ({firstName, lastName, age, gender, value, style}) =>{
    return(
        <div className="UserContainer" style={style}>
            <div className="UserPhotoContainer">
                <img src="/Unknown_player.jpg" className="UserPhoto" alt="User_photo"/>
            </div>
            <div className="UserInfo">
                <p>
                    {firstName} {lastName}
                    <br/>Age: {age} Gender: {gender}
                    <br/>Value: {value}M $
                </p>
            </div>
        </div>
    );
}


export default UserBoxInfo;