import React, {useState} from 'react';
import UserBoxInfo from './UserBoxInfo.js';


const UserProfile= () =>{
    return(
        <div>
            <UserBoxInfo style={{marginTop:"5%", width:"40%", marginLeft:"5%"}} firstName="Siar" lastName="Radjabi"
                         age="24" gender="M" value="10" />

            <table style={{marginTop:"5%", borderCollapse: "collapse", borderSpacing: "0",
                width: "100%", color: "white",textAlign:"left",fontSize:"24px",lineHeight:"2"}}>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>GOALS</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Clean sheets</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Wins</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Lost</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Draw</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Total Game</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Yellow Cards</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Red Cards</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Defensive rating</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
                <tr style={{borderBottom: "1px solid silver"}}>
                    <td style={{padding: "10px 0"}}>Offensive rating</td>
                    <td style={{padding: "10px 0"}}>0</td>
                </tr>
            </table>
        </div>
    );
}

export default UserProfile;