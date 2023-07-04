import React, {useState,useEffect} from 'react';
import UserBoxInfo from './UserBoxInfo.js';
import GameBoxInfo from "./GameBoxInfo";
import { useNavigate } from 'react-router-dom';
import { useUserSession } from './UserSession';


const UserProfile= () =>{
    const { userSession } = useUserSession();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null); // State to store user data
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
                    setData(data); // Store user data
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
                <UserBoxInfo style={{marginTop:"5%", width:"40%", marginLeft:"5%"}} firstName={data.firstName} lastName={data.lastName}
                             age="24" gender={data.gender} value={data.pValue}/>


                <h1 style={{marginTop:"10%"}}>Upcoming Games</h1>
                <ul style={{listStyle:"none", marginTop:"5%",display:"flex"}}>
                    <li style={{width:"25%"}}>
                        <GameBoxInfo team1="Falcon" team2="Tigers" time="12:00:00" location="Montreal"
                                     team1_score="1" team2_score="0" team1_percentage="30" team2_percentage="60" category="M" duration="60"
                                     importance="Points" competitionName="Champions League">
                        </GameBoxInfo>
                    </li>
                    <li style={{width:"25%"}}>
                        <GameBoxInfo team1="Falcon" team2="Tigers" time="12:00:00" location="Montreal"
                                     team1_score="1" team2_score="0" category="M" duration="60"
                                     importance="Points" competitionName="Champions League">
                        </GameBoxInfo>
                    </li>
                    <li style={{width:"25%"}}>
                        <GameBoxInfo team1="Falcon" team2="Tigers" time="12:00:00" location="Montreal"
                                     team1_score="1" team2_score="0" category="M" duration="60"
                                     importance="Points" competitionName="Champions League">
                        </GameBoxInfo>
                    </li>
                    <li style={{width:"25%"}}>
                        <GameBoxInfo team1="Falcon" team2="Tigers" time="12:00:00" location="Montreal"
                                     team1_score="1" team2_score="0" category="M" duration="60"
                                     importance="Points" competitionName="Champions League">
                        </GameBoxInfo>
                    </li>
                </ul>

                <h1 style={{marginTop:"10%"}}>Teams in</h1>

                <table style={{marginTop:"5%", borderCollapse: "collapse", borderSpacing: "0",
                    width: "100%", color: "white",textAlign:"left",fontSize:"24px",lineHeight:"2"}}>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>GOALS</td>
                        <td style={{padding: "10px 0"}}>{data.goals}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Clean sheets</td>
                        <td style={{padding: "10px 0"}}>{data.cleanSheet}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Wins</td>
                        <td style={{padding: "10px 0"}}>{data.win}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Lost</td>
                        <td style={{padding: "10px 0"}}>{data.lose}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Draw</td>
                        <td style={{padding: "10px 0"}}>{data.draw}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Total Game</td>
                        <td style={{padding: "10px 0"}}>{data.totalGame}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Yellow Cards</td>
                        <td style={{padding: "10px 0"}}>{data.yellowCards}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Red Cards</td>
                        <td style={{padding: "10px 0"}}>{data.redCards}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Defensive rating</td>
                        <td style={{padding: "10px 0"}}>{data.defRating}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 0"}}>Offensive rating</td>
                        <td style={{padding: "10px 0"}}>{data.offensiveRating}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default UserProfile;
