import React, {useState,useEffect} from 'react';
import UserBoxInfo from './UserBoxInfo.js';
import { useNavigate } from 'react-router-dom';
import { useUserSession } from './UserSession';

const UserProfile= () =>{
    const { userSession } = useUserSession();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUserSession = async () => {
            try {
                const response = await fetch('http://localhost:9000/verify-session', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLoading(false);
                } else if (response.status === 401) {
                    throw new Error('Session verification failed');
                } else {
                    throw new Error('An unexpected error occurred');
                }
            } catch (error) {
                console.error(error);
                if (error.message === 'Session verification failed') {
                    navigate('/login');
                } else {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        };

        verifyUserSession();
    }, [userSession, navigate]);

    if (isLoading) {
        return (
            <div>
                <h1 style={{marginTop:"15%",textAlign:"center",fontSize:"4vw",paddingBottom:"30%"}}>
                    Loading....
                </h1>
            </div>
        );
    } else if (error) {
        return (
            <div>
                <h1 style={{marginTop:"15%",textAlign:"center",fontSize:"4vw",paddingBottom:"30%"}}>
                    Error: {error}
                </h1>
            </div>
        );
    } else {
        return (
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
};

export default UserProfile;
