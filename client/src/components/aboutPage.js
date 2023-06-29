import React from 'react';


const AboutPage=()=>{
    return(
        <div>
            <div style={{backgroundImage:"url('/soccer_stadium.png')", textAlign:"justify",
                paddingRight:"50%", paddingLeft:"10%",backgroundSize:"100% 100%", paddingTop:"15%",paddingBottom:"10%"}}>
                <h1 style={{paddingBottom:"5%"}}>About</h1>
                <p1 style={{fontSize:"20px"}}>
                    SoccerUnite is the place to find soccer near you, bringing together
                    local players, teams, and fans in a vibrant, unified community. Discover local leagues,
                    tournaments, or even start your own career with SoccerUnite's easy-to-use platform.
                    No matter your skill level or experience,
                    SoccerUnite provides the resources and connections to ignite your passion for soccer.
                </p1>
            </div>
        </div>
    );
}

export default AboutPage;